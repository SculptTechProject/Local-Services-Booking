const express = require("express");
const router = express.Router();
const pool = require("../db");
const bcrypt = require("bcrypt");

// Get all clients
router.get("/fetchusers", async (req, res) => {
  try {
    const result = await pool.query(`SELECT * FROM "Client";`);
    const clientsWithoutPasswords = result.rows.map(
      ({ password, ...client }) => client
    );
    res.json(clientsWithoutPasswords);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Check client by ID
router.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query(`SELECT * FROM "Client" WHERE id = $1;`, [
      id,
    ]);
    if (result.rows.length === 0) {
      return res.status(404).json({ message: "Client not found" });
    }
    const { password, ...clientWithoutPassword } = result.rows[0]; // usuwanie hasla z odpowiedzi
    res.json(clientWithoutPassword);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Delete client by ID
router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query(
      `DELETE FROM "Client" WHERE id = $1 RETURNING *;`,
      [id]
    );
    if (result.rowCount === 0) {
      return res.status(404).json({ message: "Client not found" });
    }

    const { password, ...clientWithoutPassword } = result.rows[0]; // usuwanie hasla z odpowiedzi

    res.json({
      message: "Client deleted successfully",
      deletedClient: clientWithoutPassword,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Register client
router.post("/register", async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    // Haszowanie hasła
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const result = await pool.query(
      `INSERT INTO "Client" (name, email, password) VALUES ($1, $2, $3) RETURNING *;`,
      [name, email, hashedPassword]
    );

    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Database error" });
  }
});

// Login client
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    // Znalezienie email
    const result = await pool.query(
      `SELECT * FROM "Client" WHERE email = $1;`,
      [email]
    );
    const user = result.rows[0];

    if (!user) {
      res.status(401).json({ message: "Invalid email" });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      res.status(401).json({ message: "Invalid password" });
    }

    res.status(200).json({
      message: "Login successful",
      user: {
        id: user.id,
        name: user.name,
      },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Database error" });
  }
});

module.exports = router;

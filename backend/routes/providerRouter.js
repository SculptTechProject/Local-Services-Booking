const express = require("express");
const router = express.Router();
const pool = require("../db");
const bcrypt = require("bcrypt");
const authMiddleware = require("../middleware/middleware.js");
const jwt = require("jsonwebtoken");

// Get current provider
router.get("/me", authMiddleware, async (req, res) => {
  try {
    const userId = req.user.id;

    const result = await pool.query(`SELECT * FROM "Provider" WHERE id = $1;`, [
      userId,
    ]);

    const user = result.rows[0];

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json({ provider: user });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Database error" });
  }
});

// Logout provider
router.post("/logout", (req, res) => {
  res.clearCookie("token");
  res.json({ message: "Logged out" });
});

// Get all providers
router.get("/fetchproviders", async (req, res) => {
  try {
    const result = await pool.query(`SELECT * FROM "Provider";`);
    const providersWithoutPasswords = result.rows.map(
      ({ password, ...provider }) => provider
    );
    res.json(providersWithoutPasswords);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Check provider by ID
router.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query(`SELECT * FROM "Provider" WHERE id = $1;`, [
      id,
    ]);
    if (result.rows.length === 0) {
      return res.status(404).json({ message: "Provider not found" });
    }
    const { password, ...providersWithoutPasswords } = result.rows[0];
    res.json(providersWithoutPasswords);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query(
      `DELETE FROM "Provider" WHERE id = $1 RETURNING *;`,
      [id]
    );
    if (result.rowCount === 0) {
      return res.status(404).json({ message: "Client not found" });
    }

    const { password, ...providersWithoutPasswords } = result.rows[0];

    res.json({
      message: "Client deleted successfully",
      deletedProvider: providersWithoutPasswords,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Register provider
router.post("/register", async (req, res) => {
  const { name, email, password } = req.body;

  // Basic validation
  if (!name || !email || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    // Sprawdzenie czy provider istnieje
    const existingProvider = await pool.query(
      `SELECT * FROM "Provider" WHERE email = $1;`,
      [email]
    );

    if (existingProvider.rows.length > 0) {
      return res
        .status(409)
        .json({ message: "User with that email already exists" });
    }

    // Haszowanie hasła
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const result = await pool.query(
      `INSERT INTO "Provider" (name, email, password) VALUES ($1, $2, $3) RETURNING *;`,
      [name, email, hashedPassword]
    );

    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Database error" });
  }
});

// Login provider
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  // Basic validation
  if (!email || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    // Znalezienie email
    const result = await pool.query(
      `SELECT * FROM "Provider" WHERE email = $1;`,
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

    const token = jwt.sign(
      { id: user.id, email: user.email },
      process.env.JWT_SECRET,
      {
        expiresIn: "1h",
      }
    );

    res.cookie("token", token, {
      httpOnly: true,
      secure: false, // do zmiany na true w przypadku https!
      sameSite: "strict",
      maxAge: 3600000,
    });

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

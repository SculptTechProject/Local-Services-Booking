const express = require("express");
const router = express.Router();
const pool = require("../db");
const authMiddleware = require("../middleware/middleware.js");

// Tworzenie postu
router.post("/", authMiddleware, async (req, res) => {
  const { title, content } = req.body;
  const providerId = req.user.id;

  if (!title || !content) {
    return res.status(400).json({ message: "Wszystkie pola są wymagane!" });
  }

  try {
    const result = await pool.query(
      `INSERT INTO "Post" (title, content, "providerId") VALUES ($1, $2, $3) RETURNING *`,
      [title, content, providerId]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Błąd serwera." });
  }
});

// Pobieranie wszystkich postów
router.get("/", async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT p.*, pr.name AS provider_name 
      FROM "Post" p 
      JOIN "Provider" pr ON p."providerId" = pr.id
      ORDER BY p."createdAt" DESC
    `);
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Błąd serwera." });
  }
});

module.exports = router;

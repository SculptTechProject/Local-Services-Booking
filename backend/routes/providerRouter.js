const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");

// Register provider
router.post("/register", async (req, res) => {
  const { name, email, password } = req.body;

  // Basic validation
  if (!name || !email || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }

  
});

// Login provider
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  // Basic validation
  if (!email || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }

  // Find provider
  const provider = providers.find(
    (prov) => prov.email === email && prov.password === password
  );

  if (!provider) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  res.status(200).json({ message: "Provider logged in successfully" });
});

module.exports = router;

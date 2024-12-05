const express = require("express");
const router = express.Router();

let clients = [];

// Register client
router.post("/register", async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }

  clients.push({ id: clients.length + 1, name, email, password });
  res.status(201).json({ message: "Client registered successfully" });
});

// Login client
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }

  const client = clients.find(
    (cli) => cli.email === email && cli.password === password
  );

  if (!client) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  res.status(200).json({ message: "Client logged in successfully" });
});

module.exports = router;

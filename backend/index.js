const fs = require("fs");
const express = require("express");
const { Pool } = require("pg");
require("dotenv").config();

const app = express();
const port = 5173;

app.use(express.json());

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    require: true,
    ca: fs.readFileSync("certs/ca.pem").toString(),
  },
});

app.get("/", async (req, res) => {
  try {
    const result = await pool.query("SELECT NOW()");
    res.send(`Connected to PostgreSQL: ${result.rows[0].now}`);
  } catch (error) {
    console.error(error);
    res.status(500).send("Chuj z tym");
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});

const fs = require("fs");
const express = require("express");
const { Pool } = require("pg");
require("dotenv").config();

const providerRouter = require("./routes/providerRouter");
const clientRouter = require("./routes/clientRouter");

const app = express();
const port = 5173;

app.use(express.json());

const router = express.Router()

// connect to database
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    require: true,
    ca: fs.readFileSync("certs/ca.pem").toString(),
  },
});

// check if server and db is working
app.get("/", async (req, res) => {
  try {
    const result = await pool.query("SELECT NOW()");
    res.send(`Connected to PostgreSQL: ${result.rows[0].now}`);
  } catch (error) {
    console.error(error);
    res.status(500).send("Database not connected");
  }
});

// use routers
app.use("/api/v1/providers", providerRouter);
app.use("/api/v1/clients", clientRouter);

// catch all for non-existent routes (404)
app.use((req, res, next) => {
    res.status(404).json({ message: "API route not found" });
});

// global error handler
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: "Internal server error", error: err.message });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});

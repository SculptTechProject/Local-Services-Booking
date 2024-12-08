const express = require("express");
const pool = require("./db");
require("dotenv").config();
const cors = require("cors");

const providerRouter = require("./routes/providerRouter");
const clientRouter = require("./routes/clientRouter");

const app = express();
const port = process.env.PORT;

// Middleware
const corsOptions = {
  origin: "http://localhost:3000",
  optionsSuccessStatus: 200,
};
app.use(cors(corsOptions));

app.use(express.json());

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
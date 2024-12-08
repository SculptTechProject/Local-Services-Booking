const fs = require("fs");
const { Pool } = require("pg");
require("dotenv").config();

// connect to database
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    require: true,
    ca: fs.readFileSync("certs/ca.pem").toString(),
  },
});

module.exports = pool;

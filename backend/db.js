const mysql = require("mysql2");
require("dotenv").config();

// Create a connection pool (better than single connection for production)
const pool = mysql.createPool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

// Wrap pool in promise-based API so we can use async/await
const db = pool.promise();

// Test the connection on startup
pool.getConnection((err, connection) => {
  if (err) {
    console.error("❌ Database connection failed:", err.message);
    return;
  }
  console.log("✅ Connected to MySQL database:", process.env.DB_NAME);
  connection.release();
});

module.exports = db;

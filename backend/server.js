const express = require("express");
const cors = require("cors");
require("dotenv").config();

const userRoutes = require("./routes/users");

const app = express();
const PORT = process.env.PORT || 5000;

// ─── Middleware ───────────────────────────────
app.use(cors({ origin: "http://localhost:3000" })); // Allow React dev server
app.use(express.json());                             // Parse JSON request bodies
app.use(express.urlencoded({ extended: true }));    // Parse URL-encoded bodies

// ─── Routes ──────────────────────────────────
app.use("/api/users", userRoutes);

// Health check
app.get("/", (req, res) => {
  res.json({ message: "CRUD API is running 🚀" });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ success: false, message: "Route not found" });
});

// Global error handler
app.use((err, req, res, next) => {
  console.error("Unhandled error:", err.message);
  res.status(500).json({ success: false, message: "Internal server error" });
});

// ─── Start Server ────────────────────────────
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});

const express = require("express");
const router = express.Router();
const db = require("../db");

// ─────────────────────────────────────────────
// GET /api/users  — Fetch all users
// ─────────────────────────────────────────────
router.get("/", async (req, res) => {
  try {
    const [rows] = await db.query("SELECT * FROM users ORDER BY id DESC");
    res.json({ success: true, data: rows });
  } catch (err) {
    console.error("GET /users error:", err.message);
    res.status(500).json({ success: false, message: "Failed to fetch users" });
  }
});

// ─────────────────────────────────────────────
// GET /api/users/:id  — Fetch single user
// ─────────────────────────────────────────────
router.get("/:id", async (req, res) => {
  try {
    const [rows] = await db.query("SELECT * FROM users WHERE id = ?", [req.params.id]);
    if (rows.length === 0) {
      return res.status(404).json({ success: false, message: "User not found" });
    }
    res.json({ success: true, data: rows[0] });
  } catch (err) {
    console.error("GET /users/:id error:", err.message);
    res.status(500).json({ success: false, message: "Failed to fetch user" });
  }
});

// ─────────────────────────────────────────────
// POST /api/users  — Create a new user
// ─────────────────────────────────────────────
router.post("/", async (req, res) => {
  const { name, email, phone } = req.body;

  // Basic validation
  if (!name || !email) {
    return res.status(400).json({ success: false, message: "Name and email are required" });
  }

  try {
    const [result] = await db.query(
      "INSERT INTO users (name, email, phone) VALUES (?, ?, ?)",
      [name, email, phone || null]
    );
    res.status(201).json({
      success: true,
      message: "User created successfully",
      data: { id: result.insertId, name, email, phone },
    });
  } catch (err) {
    if (err.code === "ER_DUP_ENTRY") {
      return res.status(409).json({ success: false, message: "Email already exists" });
    }
    console.error("POST /users error:", err.message);
    res.status(500).json({ success: false, message: "Failed to create user" });
  }
});

// ─────────────────────────────────────────────
// PUT /api/users/:id  — Update an existing user
// ─────────────────────────────────────────────
router.put("/:id", async (req, res) => {
  const { name, email, phone } = req.body;

  if (!name || !email) {
    return res.status(400).json({ success: false, message: "Name and email are required" });
  }

  try {
    const [result] = await db.query(
      "UPDATE users SET name = ?, email = ?, phone = ? WHERE id = ?",
      [name, email, phone || null, req.params.id]
    );
    if (result.affectedRows === 0) {
      return res.status(404).json({ success: false, message: "User not found" });
    }
    res.json({ success: true, message: "User updated successfully" });
  } catch (err) {
    if (err.code === "ER_DUP_ENTRY") {
      return res.status(409).json({ success: false, message: "Email already exists" });
    }
    console.error("PUT /users/:id error:", err.message);
    res.status(500).json({ success: false, message: "Failed to update user" });
  }
});

// ─────────────────────────────────────────────
// DELETE /api/users/:id  — Delete a user
// ─────────────────────────────────────────────
router.delete("/:id", async (req, res) => {
  try {
    const [result] = await db.query("DELETE FROM users WHERE id = ?", [req.params.id]);
    if (result.affectedRows === 0) {
      return res.status(404).json({ success: false, message: "User not found" });
    }
    res.json({ success: true, message: "User deleted successfully" });
  } catch (err) {
    console.error("DELETE /users/:id error:", err.message);
    res.status(500).json({ success: false, message: "Failed to delete user" });
  }
});

module.exports = router;

-- ─────────────────────────────────────────────────────────────
-- Run this SQL in phpMyAdmin to set up the database and table
-- ─────────────────────────────────────────────────────────────

-- 1. Create the database
CREATE DATABASE IF NOT EXISTS crud_demo;

-- 2. Use the database
USE crud_demo;

-- 3. Create the users table
CREATE TABLE IF NOT EXISTS users (
  id    INT          NOT NULL AUTO_INCREMENT,
  name  VARCHAR(100) NOT NULL,
  email VARCHAR(150) NOT NULL,
  phone VARCHAR(20)  DEFAULT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  UNIQUE KEY uq_email (email)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- 4. Insert sample data (optional)
INSERT INTO users (name, email, phone) VALUES
  ('Alice Johnson', 'alice@example.com', '555-0101'),
  ('Bob Smith',     'bob@example.com',   '555-0102'),
  ('Carol White',   'carol@example.com', NULL);

-- ================================================
-- Jadhav's Fish Farm - Database Schema
-- Run: mysql -u root -p < database.sql
-- ================================================
CREATE DATABASE IF NOT EXISTS fishfarm_db;
USE fishfarm_db;

CREATE TABLE IF NOT EXISTS admins (
  id       INT AUTO_INCREMENT PRIMARY KEY,
  name     VARCHAR(100) NOT NULL,
  email    VARCHAR(100) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL
);
-- Default admin: admin@fishfarm.com / admin123
INSERT IGNORE INTO admins (name, email, password)
VALUES ('Admin', 'admin@fishfarm.com', '$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lh9i');

CREATE TABLE IF NOT EXISTS customers (
  id       INT AUTO_INCREMENT PRIMARY KEY,
  name     VARCHAR(100) NOT NULL,
  mobile   VARCHAR(15)  NOT NULL,
  email    VARCHAR(100) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS products (
  id          INT AUTO_INCREMENT PRIMARY KEY,
  name        VARCHAR(100)  NOT NULL,
  price       DECIMAL(10,2) NOT NULL,
  stock       INT           DEFAULT 0,
  image       VARCHAR(100)  DEFAULT '',
  description TEXT,
  created_at  TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
INSERT IGNORE INTO products (id,name,price,stock,image,description) VALUES
(1,'Red Tilapia',350.00,50,'red.jpg','Fresh Red Tilapia rich in protein, vitamins B12 and selenium.'),
(2,'Black Tilapia',250.00,40,'black.jpg','Fresh Black Tilapia — affordable, lean, and nutritious.'),
(3,'Pangasius',200.00,60,'fangas.jpg','Fresh Pangasius — low fat, high protein white fish with omega-3.');

CREATE TABLE IF NOT EXISTS orders (
  id             INT AUTO_INCREMENT PRIMARY KEY,
  name           VARCHAR(100),
  email          VARCHAR(100),
  mobile         VARCHAR(15),
  address        TEXT,
  products       TEXT,
  total_qty      INT           DEFAULT 0,
  amount         DECIMAL(10,2) DEFAULT 0,
  payment_method VARCHAR(50)   DEFAULT 'Cash on Delivery',
  status         VARCHAR(30)   DEFAULT 'Pending',
  created_at     TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS feedback (
  id         INT AUTO_INCREMENT PRIMARY KEY,
  name       VARCHAR(100),
  message    TEXT,
  rating     INT DEFAULT 5,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS contact (
  id         INT AUTO_INCREMENT PRIMARY KEY,
  email      VARCHAR(100),
  mobile     VARCHAR(15),
  message    TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

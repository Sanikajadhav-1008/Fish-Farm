const db   = require('../config/db');
const bcrypt = require('bcryptjs');
const jwt  = require('jsonwebtoken');

const generateToken = (id, role) =>
  jwt.sign({ id, role }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN || '7d' });

// POST /api/auth/register
exports.register = async (req, res) => {
  try {
    const { name, mobile, email, password } = req.body;
    const [rows] = await db.query('SELECT id FROM customers WHERE email = ?', [email]);
    if (rows.length) return res.status(400).json({ message: 'Email already registered' });
    const hashed = await bcrypt.hash(password, 10);
    const [result] = await db.query(
      'INSERT INTO customers (name, mobile, email, password) VALUES (?,?,?,?)',
      [name, mobile, email, hashed]
    );
    res.status(201).json({ message: 'Registered successfully', token: generateToken(result.insertId, 'customer') });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// POST /api/auth/login
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const [rows] = await db.query('SELECT * FROM customers WHERE email = ?', [email]);
    if (!rows.length) return res.status(401).json({ message: 'Invalid credentials' });
    const user = rows[0];
    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(401).json({ message: 'Invalid credentials' });
    res.json({
      token: generateToken(user.id, 'customer'),
      user: { id: user.id, name: user.name, mobile: user.mobile, email: user.email, role: 'customer' }
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// POST /api/auth/admin/login
exports.adminLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const [rows] = await db.query('SELECT * FROM admins WHERE email = ?', [email]);
    if (!rows.length) return res.status(401).json({ message: 'Invalid admin credentials' });
    const admin = rows[0];
    const match = await bcrypt.compare(password, admin.password);
    if (!match) return res.status(401).json({ message: 'Invalid admin credentials' });
    res.json({
      token: generateToken(admin.id, 'admin'),
      user: { id: admin.id, name: admin.name, email: admin.email, role: 'admin' }
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

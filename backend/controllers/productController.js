const db = require('../config/db');

// GET /api/products
exports.getAll = async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM products ORDER BY id ASC');
    res.json(rows);
  } catch (err) { res.status(500).json({ message: err.message }); }
};

// GET /api/products/:id
exports.getOne = async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM products WHERE id = ?', [req.params.id]);
    if (!rows.length) return res.status(404).json({ message: 'Product not found' });
    res.json(rows[0]);
  } catch (err) { res.status(500).json({ message: err.message }); }
};

// POST /api/products  (admin)
exports.create = async (req, res) => {
  try {
    const { name, price, stock, image, description } = req.body;
    const [r] = await db.query(
      'INSERT INTO products (name, price, stock, image, description) VALUES (?,?,?,?,?)',
      [name, price, stock, image, description]
    );
    res.status(201).json({ message: 'Product created', id: r.insertId });
  } catch (err) { res.status(500).json({ message: err.message }); }
};

// PUT /api/products/:id  (admin)
exports.update = async (req, res) => {
  try {
    const { name, price, stock, image, description } = req.body;
    await db.query(
      'UPDATE products SET name=?, price=?, stock=?, image=?, description=? WHERE id=?',
      [name, price, stock, image, description, req.params.id]
    );
    res.json({ message: 'Product updated' });
  } catch (err) { res.status(500).json({ message: err.message }); }
};

// DELETE /api/products/:id  (admin)
exports.remove = async (req, res) => {
  try {
    await db.query('DELETE FROM products WHERE id = ?', [req.params.id]);
    res.json({ message: 'Product deleted' });
  } catch (err) { res.status(500).json({ message: err.message }); }
};

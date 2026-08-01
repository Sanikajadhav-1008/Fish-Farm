const db = require('../config/db');

// POST /api/orders  (place order)
exports.placeOrder = async (req, res) => {
  try {
    const { name, email, mobile, address, items, paymentMethod } = req.body;
    // items: [{ productId, name, price, qty }]
    const totalAmount = items.reduce((s, i) => s + i.price * i.qty, 0);
    const totalQty    = items.reduce((s, i) => s + i.qty, 0);
    const productStr  = items.map(i => `${i.name} x${i.qty}kg`).join(', ');

    const [r] = await db.query(
      `INSERT INTO orders (name, email, mobile, address, products, total_qty, amount, payment_method, status)
       VALUES (?,?,?,?,?,?,?,?,'Pending')`,
      [name, email, mobile, address, productStr, totalQty, totalAmount, paymentMethod]
    );
    res.status(201).json({ message: 'Order placed', orderId: r.insertId });
  } catch (err) { res.status(500).json({ message: err.message }); }
};

// GET /api/orders/my  (customer own orders)
exports.myOrders = async (req, res) => {
  try {
    const [rows] = await db.query(
      'SELECT * FROM orders WHERE mobile = ? ORDER BY id DESC',
      [req.query.mobile]
    );
    res.json(rows);
  } catch (err) { res.status(500).json({ message: err.message }); }
};

// GET /api/orders  (admin all orders)
exports.getAllOrders = async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM orders ORDER BY id DESC');
    res.json(rows);
  } catch (err) { res.status(500).json({ message: err.message }); }
};

// PATCH /api/orders/:id/status  (admin update status)
exports.updateStatus = async (req, res) => {
  try {
    await db.query('UPDATE orders SET status = ? WHERE id = ?', [req.body.status, req.params.id]);
    res.json({ message: 'Status updated' });
  } catch (err) { res.status(500).json({ message: err.message }); }
};

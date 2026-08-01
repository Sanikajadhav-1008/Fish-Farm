const db = require('../config/db');

exports.submit = async (req, res) => {
  try {
    const { email, mobile, message } = req.body;
    await db.query('INSERT INTO contact (email, mobile, message) VALUES (?,?,?)', [email, mobile, message]);
    res.status(201).json({ message: 'Message sent!' });
  } catch (err) { res.status(500).json({ message: err.message }); }
};

exports.getAll = async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM contact ORDER BY id DESC');
    res.json(rows);
  } catch (err) { res.status(500).json({ message: err.message }); }
};

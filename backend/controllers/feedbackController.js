const db = require('../config/db');

exports.submit = async (req, res) => {
  try {
    const { name, message, rating } = req.body;
    await db.query('INSERT INTO feedback (name, message, rating) VALUES (?,?,?)', [name, message, rating]);
    res.status(201).json({ message: 'Feedback submitted, thank you!' });
  } catch (err) { res.status(500).json({ message: err.message }); }
};

exports.getAll = async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM feedback ORDER BY id DESC');
    res.json(rows);
  } catch (err) { res.status(500).json({ message: err.message }); }
};

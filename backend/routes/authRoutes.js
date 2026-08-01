const router = require('express').Router();
const { register, login, adminLogin } = require('../controllers/authController');

router.post('/register',     register);
router.post('/login',        login);
router.post('/admin/login',  adminLogin);


 
const token = jwt.sign(
  { id: user.id },
  process.env.JWT_SECRET,
  { expiresIn: "1d" }
);

module.exports = router;
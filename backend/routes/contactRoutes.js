const router = require('express').Router();
const ctrl   = require('../controllers/contactController');
const { protect, adminOnly } = require('../middleware/auth');

router.post('/',   ctrl.submit);
router.get('/',    protect, adminOnly, ctrl.getAll);

module.exports = router;

const router = require('express').Router();
const ctrl   = require('../controllers/orderController');
const { protect, adminOnly } = require('../middleware/auth');

router.post('/',               ctrl.placeOrder);
router.get('/my',              protect, ctrl.myOrders);
router.get('/',                protect, adminOnly, ctrl.getAllOrders);
router.patch('/:id/status',    protect, adminOnly, ctrl.updateStatus);

module.exports = router;

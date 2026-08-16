import {Router} from 'express';
import {placeOrder, getMyOrders, getSellerOrders, updateOrderStatus, cancelOrder} from '../controllers/order.controller.js';
import {verifyJWT} from '../middleware/auth.middleware.js';

const router = Router();

router.post('/', verifyJWT, placeOrder);
router.get('/', verifyJWT, getMyOrders);
router.get('/seller', verifyJWT, getSellerOrders);
router.patch('/:orderId/status', verifyJWT, updateOrderStatus);
router.patch('/:orderId/cancel', verifyJWT, cancelOrder)
export default router;
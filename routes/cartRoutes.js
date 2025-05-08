import express from 'express';
import { authenticateUser } from '../middileware/authMiddleware.js';
import { addToCart, updateCartItem, removeFromCart } from '../controller/cartController.js'

const router = express.Router();

// Add product to cart (protected)
router.post('/', authenticateUser, addToCart);
// Update cart item quantity (protected)
router.put('/:id', authenticateUser, updateCartItem);
// Remove product from cart (protected)
router.delete('/:id', authenticateUser, removeFromCart);

export default router;
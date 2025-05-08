import Cart from '../models/Cart.js';
import Product from '../models/product.js';
import mongoose from 'mongoose';

/**
 * Add a product to the user's cart
 */
export const addToCart = async (req, res) => {
  const { productId, quantity } = req.body;

  // Validate input
  if (!productId || !quantity || quantity < 1) {
    return res.status(400).json({ error: 'Product ID and quantity (minimum 1) are required' });
  }
  if (!mongoose.isValidObjectId(productId)) {
    return res.status(400).json({ error: 'Invalid product ID' });
  }

  try {
    // Verify product exists
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }

    // Check stock availability
    const cartItem = await Cart.findOne({ userId: req.user.id, productId });
    const currentQuantity = cartItem ? cartItem.quantity : 0;
    if (product.stock < currentQuantity + quantity) {
      return res.status(400).json({ error: 'Insufficient stock' });
    }

    // Update or create cart item
    if (cartItem) {
      cartItem.quantity += quantity;
      await cartItem.save();
    } else {
      await Cart.create({ userId: req.user.id, productId, quantity });
    }

    res.status(201).json({ message: 'Product added to cart' });
  } catch (error) {
    res.status(500).json({ error: 'Server error while adding to cart' });
  }
};

/**
 * Update the quantity of a cart item
 */
export const updateCartItem = async (req, res) => {
  const { quantity } = req.body;

  // Validate input
  if (!quantity || quantity < 1) {
    return res.status(400).json({ error: 'Quantity must be at least 1' });
  }
  if (!mongoose.isValidObjectId(req.params.id)) {
    return res.status(400).json({ error: 'Invalid cart item ID' });
  }

  try {
    // Find cart item
    const cartItem = await Cart.findOne({ _id: req.params.id, userId: req.user.id });
    if (!cartItem) {
      return res.status(404).json({ error: 'Cart item not found' });
    }

    // Check stock for the product
    const product = await Product.findById(cartItem.productId);
    if (product.stock < quantity) {
      return res.status(400).json({ error: 'Insufficient stock' });
    }

    // Update quantity
    cartItem.quantity = quantity;
    await cartItem.save();

    res.json({ message: 'Cart updated successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Server error while updating cart' });
  }
};

//Remove a product from the user's cart
export const removeFromCart = async (req, res) => {
  if (!mongoose.isValidObjectId(req.params.id)) {
    return res.status(400).json({ error: 'Invalid cart item ID' });
  }

  try {
    const cartItem = await Cart.findOneAndDelete({ _id: req.params.id, userId: req.user.id });
    if (!cartItem) {
      return res.status(404).json({ error: 'Cart item not found' });
    }
    res.json({ message: 'Product removed from cart' });
  } catch (error) {
    res.status(500).json({ error: 'Server error while removing from cart' });
  }
};
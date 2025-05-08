import express from 'express';
import {getProducts,getProductById} from "../controller/productController.js"

const router = express.Router();

// Fetch all products
router.get('/', getProducts);
// Fetch a single product by ID
router.get('/:id', getProductById);

export default router;
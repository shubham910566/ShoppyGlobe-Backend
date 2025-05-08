import mongoose from 'mongoose';
import dotenv from 'dotenv';
import fetch from 'node-fetch';
import Product from './models/product.js';

// Load environment variables
dotenv.config();

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/shoppyglobe')
  .then(() => console.log('MongoDB connected for seeding'))
  .catch(err => console.error('MongoDB connection error:', err));

// Fetch products from DummyJSON API
const fetchProducts = async () => {
  try {
    const response = await fetch('https://dummyjson.com/products?limit=10'); // Limit to 10 products for simplicity
    const data = await response.json();
    return data.products.map(product => ({
      title: product.title,
      description: product.description,
      price: product.price,
      stock: product.stock,
      images: product.images
    }));
  } catch (error) {
    console.error('Error fetching products from API:', error);
    return [];
  }
};

// Seed function
const seedProducts = async () => {
  try {
    // Fetch products
    const products = await fetchProducts();
    if (products.length === 0) {
      console.log('No products fetched from API');
      mongoose.connection.close();
      return;
    }

    // Clear existing products
    await Product.deleteMany({});
    console.log('Existing products cleared');

    // Insert new products
    await Product.insertMany(products);
    console.log(`Seeded ${products.length} products successfully`);

    // Close the connection
    mongoose.connection.close();
  } catch (error) {
    console.error('Error seeding products:', error);
    mongoose.connection.close();
  }
};

// Run the seed function
seedProducts();
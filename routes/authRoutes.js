import express from 'express';
import {register,login} from "../controller/authController.js"

const router = express.Router();

// Register a new user
router.post('/register', register);
// Authenticate user and return JWT
router.post('/login', login);

export default router;
/**
 * Middleware to authenticate user via JWT
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Next middleware function
 */
import jwt from 'jsonwebtoken';

export const authenticateUser = async (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]; // Extract token from Bearer scheme
  
    if (!token) {
      return res.status(401).json({ error: 'Access denied, no token provided' });
    }
  
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET || 'Shubham');
      req.user = decoded; // Attach user data to request
      next();
    } catch (err) {
      console.error('JWT Verification Error:', err);
      return res.status(403).json({ error: 'Invalid token', details: err.message });
    }
  };
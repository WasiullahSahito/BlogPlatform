import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './config/db.js';
import { notFound, errorHandler } from './middleware/errorMiddleware.js';
import authRoutes from './routes/authRoutes.js';
import postRoutes from './routes/postRoutes.js';

// Load environment variables
dotenv.config();

// Connect to the database
connectDB();

const app = express();

// Middleware
app.use(cors()); // Enable Cross-Origin Resource Sharing
app.use(express.json()); // To accept JSON data in the body

// A simple root route for health check
app.get('/', (req, res) => {
    res.send('Blog API is running...');
});

// --- API Routes ---
app.use('/api/auth', authRoutes);
app.use('/api/posts', postRoutes);

// --- Custom Error Handling Middleware ---
app.use(notFound); // Handles requests to non-existent routes
app.use(errorHandler); // Handles other errors (e.g., Mongoose errors)

const PORT = process.env.PORT || 5001;
app.listen(PORT, () =>
    console.log(`Server running in ${process.env.NODE_ENV || 'development'} mode on port ${PORT}`)
);
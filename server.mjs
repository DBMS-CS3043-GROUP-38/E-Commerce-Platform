import express from 'express';
import dotenv from 'dotenv';
import authRoutes from './routes/users/customer/auth.mjs';
import db from './utilities/database/db.mjs';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json()); // To parse JSON requests

// Routes
app.use('/api', authRoutes);

// Start server
app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});

// Handle database connection
db.getConnection((err) => {
    if (err) throw err;
    console.log('Connected to the database.');
});

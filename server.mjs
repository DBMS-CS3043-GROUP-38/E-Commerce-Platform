import express from 'express';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import cors from 'cors'; // Import CORS
import authRoutes from './routes/auth.mjs'; // Adjusted to point directly to the auth.mjs file

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to enable CORS
app.use(cors()); // Use CORS middleware
app.use(bodyParser.json()); // Middleware to parse JSON bodies

// Use authentication routes
app.use('/api/auth', authRoutes);

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

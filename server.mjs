// server.mjs

import express from 'express';
import itemsRouter from './routes/users/customer/displayItems.mjs'; // Correct the path to displayItems.mjs
import cors from 'cors';
const app = express();
const port = 3000; // You can change this port if needed
app.use(cors());
// Middleware
app.use(express.json());

// Use the items router
app.use('/api', itemsRouter); // Prefix all routes in displayItems with /api

// Start the server
app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});

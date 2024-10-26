import express from 'express';
import db from '../../../utilities/database/db.mjs';

const router = express.Router();

// Route to get routes based on city
router.get('/', async (req, res) => {
    const { city } = req.query;

    // Check if city parameter is provided
    if (!city) {
        return res.status(400).json({ message: 'City parameter is required.' });
    }

    try {
        // SQL query to fetch routes based on the city
        const [routes] = await db.query(`
            SELECT RouteID, Description 
            FROM route 
            LEFT JOIN store USING (StoreID) 
            WHERE City = ?`, [city]
        );

        // Send response with fetched routes
        res.json(routes);
    } catch (error) {
        console.error('Error fetching routes:', error);
        res.status(500).json({ message: 'Failed to fetch routes.' });
    }
});

export default router;

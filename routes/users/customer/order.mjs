import express from 'express';
import db from '../../../utilities/database/db.mjs';  // Import your db config

const router = express.Router();

// POST route to handle order submission
router.post('/', async (req, res) => {
  const { customerID, value, orderDate, routeID, totalVolume, products } = req.body;

  try {
    const connection = await db.getConnection(); // Get a connection from the pool
    await connection.beginTransaction(); // Start a transaction

    // Call your SQL procedure for inserting the order
    const [orderResult] = await connection.query(
      `CALL CreateOrderWithItems(?, ?, ?, ?, ?, ?, ?)`,
      [customerID, value, orderDate, null, routeID, totalVolume, JSON.stringify(products)] // Pass products as JSON
    );

    await connection.commit(); // Commit the transaction
    res.status(200).json({ message: 'Order created successfully!', order: orderResult });
  } catch (error) {
    console.error('Error creating order:', error);
    await connection.rollback(); // Rollback on error
    res.status(500).json({ message: 'Error creating order', error: error.message });
  } finally {
    if (connection) {
      connection.release(); // Release the connection
    }
  }
});

export default router;

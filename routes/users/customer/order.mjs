import express from 'express';
import db from '../../../utilities/database/db.mjs'; // Import your db config

const router = express.Router();

// POST route to handle order submission using stored procedure
router.post('/', async (req, res) => {
  const { customerID, orderDate, deliveryDate, routeID, products } = req.body;

  let connection; // Initialize connection variable here

  try {
    connection = await db.getConnection(); // Get a connection from the pool
    await connection.beginTransaction(); // Start a transaction

    // Call the stored procedure for inserting the order and products
    const [orderResult] = await connection.query(
      `CALL CreateOrderWithItems(?, ?, ?, ?, ?, ?, ?)`,
      [
        customerID,
        0, // Initial Value (0) for the order
        orderDate,
        deliveryDate,
        routeID,
        0, // Initial TotalVolume (0) for the order
        JSON.stringify(products) // Pass the products array as a JSON string
      ]
    );

    // Commit the transaction
    await connection.commit();

    res.status(200).json({ message: 'Order and products added successfully!', order: orderResult });
  } catch (error) {
    console.error('Error creating order:', error);
    if (connection) {
      await connection.rollback(); // Rollback on error only if connection exists
    }
    res.status(500).json({ message: 'Error creating order', error: error.message });
  } finally {
    if (connection) {
      connection.release(); // Release the connection
    }
  }
});

export default router;

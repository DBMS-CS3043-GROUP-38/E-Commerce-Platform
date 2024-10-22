import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import db from '../../../utilities/database/db.mjs';

const router = express.Router();

// Signup Route
router.post('/signup', async (req, res) => {
    const { Username, Name, Address, Contact, Type, City, PasswordHash } = req.body;

    try {
        // Check if the username already exists
        const [existingUser] = await db.query('SELECT * FROM customer WHERE Username = ?', [Username]);
        if (existingUser.length > 0) {
            return res.status(400).send({ message: 'Username already exists' });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(PasswordHash, 10);

        // Insert into the customer table
        const sql = 'INSERT INTO customer (Username, Name, Address, Contact, Type, City, PasswordHash) VALUES (?, ?, ?, ?, ?, ?, ?)';
        db.query(sql, [Username, Name, Address, Contact, Type, City, hashedPassword], (err, results) => {
            if (err) return res.status(500).send(err);
            res.status(201).send({ message: 'User created successfully!' });
        });
    } catch (error) {
        res.status(500).send(error);
    }
});

// Login Route
router.post('/login', (req, res) => {
    const { Username, PasswordHash } = req.body;

    const sql = 'SELECT * FROM customer WHERE Username = ?';
    db.query(sql, [Username], async (err, results) => {
        if (err) return res.status(500).send(err);
        if (results.length === 0) return res.status(404).send({ message: 'User not found' });

        const user = results[0];
        const isMatch = await bcrypt.compare(PasswordHash, user.PasswordHash);
        if (!isMatch) return res.status(400).send({ message: 'Invalid password' });

        // Generate JWT token
        const token = jwt.sign({ id: user.CustomerID }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.send({ token });
    });
});

export default router;

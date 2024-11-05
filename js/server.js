// server.js
const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const dotenv = require('dotenv');
dotenv.config();

const app = express();

// Middleware
app.use(cors({
    origin: 'https://averyboydston.github.io/Lofi-Website/', // Replace with your GitHub Pages URL
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true
}));
app.use(express.json());


// Database connection
const pool = mysql.createPool({
    host: 'b49phykklyd9jhtd6gw2-mysql.services.clever-cloud.com',
    user: 'uu4f3qgwzp3ro8sj',
    password: 'e7UcgIc5LOsfAfzPbDyC',
    database: 'b49phykklyd9jhtd6gw2',
    port: 3306,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

// Convert pool queries to promises
const promisePool = pool.promise();

// API Routes
app.get('/api/profile', async (req, res) => {
    try {
        const [rows] = await promisePool.query('SELECT * FROM profile');
        res.json(rows);
    } catch (error) {
        console.error('Error fetching profile:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

app.post('/api/profile', async (req, res) => {
    try {
        const { name, email, bio } = req.body;
        const [result] = await promisePool.query(
            'INSERT INTO profile (name, email, bio) VALUES (?, ?, ?)',
            [name, email, bio]
        );
        res.json({ id: result.insertId, message: 'Profile created successfully' });
    } catch (error) {
        console.error('Error creating profile:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

app.put('/api/profile/:id', async (req, res) => {
    try {
        const { name, email, bio } = req.body;
        const [result] = await promisePool.query(
            'UPDATE profile SET name = ?, email = ?, bio = ? WHERE id = ?',
            [name, email, bio, req.params.id]
        );
        if (result.affectedRows === 0) {
            res.status(404).json({ error: 'Profile not found' });
        } else {
            res.json({ message: 'Profile updated successfully' });
        }
    } catch (error) {
        console.error('Error updating profile:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
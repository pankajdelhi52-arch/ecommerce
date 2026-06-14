const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db'); // Database connection import

dotenv.config();
const app = express();

// Middleware
app.use(cors()); // Frontend ko backend se baat karne dene ke liye
app.use(express.json()); // JSON data parse karne ke liye

// Connect to Database
connectDB();

// Sample Route
app.get('/api/message', (req, res) => {
    res.json({ message: "Hello from the Backend!" });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
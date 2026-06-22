const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

// 1. Import your accommodation routes
const accommodationRoutes = require('./routes/accommodationRoutes');

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;

// Connect to MongoDB
mongoose.connect(MONGO_URI)
    .then(() => console.log('✅ Successfully connected to MongoDB Local Server!'))
    .catch((err) => console.error('❌ Database connection error:', err));

// 2. Link your routes to an API endpoint URL
// This means all URLs in accommodationRoutes will now start with /api/accommodations
app.use('/api/accommodations', accommodationRoutes);

app.get('/', (req, res) => {
    res.send('RoamCeylon Backend API is running!');
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
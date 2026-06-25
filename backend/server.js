const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

// Import your routes
const accommodationRoutes = require('./routes/accommodationRoutes');
const authRoutes = require('./routes/auth'); 

const app = express();

// 1. GLOBAL MIDDLEWARES (Must be defined BEFORE routing)
app.use(cors());

// Configured with high limits to safely allow large Base64 profile avatar pictures
app.use(express.json({ limit: '50mb' })); 
app.use(express.urlencoded({ limit: '50mb', extended: true }));

const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;

// 2. CONNECT TO DATABASE
mongoose.connect(MONGO_URI)
    .then(() => console.log('✅ Successfully connected to MongoDB Server!'))
    .catch((err) => console.error('❌ Database connection error:', err));

// 3. LINKING ROUTES (Now correctly utilizing the pre-configured high body-limits)
app.use('/api/accommodations', accommodationRoutes);
app.use('/api/auth', authRoutes); 

app.get('/', (req, res) => {
    res.send('RoamCeylon Backend API is running!');
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
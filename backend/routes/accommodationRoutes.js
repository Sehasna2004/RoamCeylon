const express = require('express');
const router = express.Router();
const Accommodation = require('../models/Accommodation');

// 1. POST Route: Add a new accommodation
router.post('/add', async (req, res) => {
    try {
        const newPlace = new Accommodation(req.body);
        const savedPlace = await newPlace.save();
        res.status(201).json(savedPlace);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// 2. GET Route: Get all accommodations
router.get('/all', async (req, res) => {
    try {
        const places = await Accommodation.find();
        res.status(200).json(places);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
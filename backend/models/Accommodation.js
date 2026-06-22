const mongoose = require('mongoose');

const AccommodationSchema = new mongoose.Schema({
    name: { type: String, required: true },
    type: { 
        type: String, 
        required: true, 
        enum: ['Hotel', 'Bungalow', 'Cabana', 'Hostel'] // Restricts to these options
    },
    location: { type: String, required: true }, // e.g., "Ella", "Mirissa", "Nuwara Eliya"
    description: { type: String, required: true },
    pricePerNight: { type: Number, required: true },
    imageUrl: { type: String, default: 'https://via.placeholder.com/150' }, // Temporary placeholder image
    rating: { type: Number, default: 4.5 }
}, { timestamps: true }); // Automatically adds createdAt and updatedAt fields

module.exports = mongoose.model('Accommodation', AccommodationSchema);
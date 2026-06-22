const mongoose = require('mongoose');
const Accommodation = require('./models/Accommodation');
require('dotenv').config();

const sampleAccommodations = [
    {
        name: "Ella Jungle Canopy Cabana",
        type: "Cabana",
        location: "Ella",
        description: "Wake up above the mist with stunning panoramic views of Ella Rock. Features a private deck and outdoor netted hammock.",
        pricePerNight: 12000,
        imageUrl: "https://images.unsplash.com/photo-1546548970-71785318a17b", // Curated sample photo
        rating: 4.9
    },
    {
        name: "Mirissa Surf Hostel",
        type: "Hostel",
        location: "Mirissa",
        description: "A vibrant, social hostel located just 2 minutes away from Secret Beach. Perfect for solo backpackers and digital nomads.",
        pricePerNight: 3500,
        imageUrl: "https://images.unsplash.com/photo-1555854877-bab0e564b8d5",
        rating: 4.6
    },
    {
        name: "Nuwara Eliya Colonial Bungalow",
        type: "Bungalow",
        location: "Nuwara Eliya",
        description: "Experience old-world charm in the heart of Little England. Surrounded by tea estates with an authentic working fireplace.",
        pricePerNight: 28000,
        imageUrl: "https://images.unsplash.com/photo-1566073771259-6a8506099945",
        rating: 4.8
    },
    {
        name: "The Grand Galle Fort Hotel",
        type: "Hotel",
        location: "Galle Fort",
        description: "A luxury boutique heritage hotel combining 17th-century Dutch architecture with modern tropical comforts.",
        pricePerNight: 45000,
        imageUrl: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4",
        rating: 4.7
    }
];

async function seedDatabase() {
    try {
        // Connect to your database using your .env URI
        await mongoose.connect(process.env.MONGO_URI);
        console.log("⏳ Connecting to database to seed data...");

        // Optional: Clears out existing accommodations so you don't duplicate data on re-runs
        await Accommodation.deleteMany({});
        
        // Insert our sample data array
        await Accommodation.insertMany(sampleAccommodations);
        console.log("✅ Successfully seeded 4 gorgeous Sri Lankan properties into MongoDB!");
        
        // Safely close the script process
        mongoose.connection.close();
    } catch (error) {
        console.error("❌ Seeding failed:", error);
        process.exit(1);
    }
}

seedDatabase();
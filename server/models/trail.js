const mongoose = require('mongoose');

const trailSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    googlePlaceId: { type: String, required: true, unique: true }, // Unique identifier from Google Places API
    name: { type: String, required: true },
    location: { type: String, required: true },
    description: { type: String, required: true },
    rating: { type: Number, default: 0 },
    reviews: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Review' }], // References to user reviews
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
    imageUrl: { type: String }
});

const TrailModel = mongoose.model('Trail', trailSchema);
module.exports = TrailModel;

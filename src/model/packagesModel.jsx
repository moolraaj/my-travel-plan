import mongoose from "mongoose";

// Define the image schema
const imageSchema = new mongoose.Schema({
    name: { type: String, required: true },
    path: { type: String, required: true },
    contentType: { type: String, required: true },
    
});

// Define the itinerary item schema
const itineraryItemSchema = new mongoose.Schema({
    day: { type: Number, required: true },
    location: { type: String, required: true },
    tourname: { type: String, required: true },
    itinerary_description: { type: String, required: true }
});

// Define the meta item schema for inclusions and exclusions
const metaItemSchema = new mongoose.Schema({
    description: { type: String, required: true }
});

// Define the package schema
const PackagesSchema = new mongoose.Schema({
    images: [imageSchema],
    title: { type: String, required: true },
    description: { type: String, required: true },
    slug: { type: String, required: true },
    package_overview: { type: String, required: true },
    package_top_summary: { type: String, required: true },
    package_itinerary: [itineraryItemSchema],
    packages_galleries: [imageSchema],  
    packages_include: [metaItemSchema],
    packages_exclude: [metaItemSchema],
    city_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'cities',
        required: true
    }
});

// Create the package model
const PackagesModel = mongoose.models.packages || mongoose.model('packages', PackagesSchema);
export default PackagesModel;

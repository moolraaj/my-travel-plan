import mongoose from "mongoose";
import CitiesModel from "./citiesModel";
import PackagesModel from "./packagesModel"; 

// Define the image schema
let imageSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    path: {
        type: String,
        required: true
    },
    contentType: {
        type: String,
        required: true
    }
});

// Define the country schema with references to cities, packages, and continent
const countrySchema = new mongoose.Schema({
    images: [imageSchema],
    title: {
        type: String,
        required: [true,'title is required']  
    },
    description: {
        type: String,
        required: [true,'description is required']   
    },
    slug:{
        type:String,
        required: [true,'slug is required']  
    },
    all_cities: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'cities',
        },
    ],
    all_packages: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'packages',
        },
    ],
    continent_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'continents',
    }
});

// Create the country model
let countriesModel = mongoose.models.countries || mongoose.model('countries', countrySchema);

export default countriesModel;

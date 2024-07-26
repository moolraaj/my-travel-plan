import mongoose from "mongoose";


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

// Define the continent schema with references to countries
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
        
    },all_cities: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'cities',
        },
      ],
     
});

// Create the continent model
let countriestModel = mongoose.models.countries || mongoose.model('countries', countrySchema);

export default countriestModel;

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
const CitiesSchema = new mongoose.Schema({
    images: [imageSchema],
    title: {
        type: String,
        required: true  
    },
    description: {
        type: String,
        required: true  
    },
    slug:{
        type:String,
        required:true
        
    }
     
     
});

// Create the continent model
let CitiesModel = mongoose.models.cities || mongoose.model('cities', CitiesSchema);
export default CitiesModel;

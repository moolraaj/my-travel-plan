import mongoose from "mongoose";

let imageSchema=new mongoose.Schema({
    name:{
        type:String,
        require:true
    },
    data:{
        type:Buffer,
        require:true
    },
    ContentType:{
        type:String,
        require:true
    },
})


const continentSchema=new mongoose.Schema({
     
    images:[imageSchema],
        title:{
            type:String,
            require:true  
        },
        description:{
            type:String,
            require:true  
        }


})

let continentModel=mongoose.models.continent||mongoose.model('continent',continentSchema)
export default continentModel
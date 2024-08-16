import mongoose from 'mongoose'
import PackagesModel from './packagesModel' 
let bookingSchema=new mongoose.Schema({
    name:{
        type:String,
        required:[true,'name is required']
    },
    email:{
        type:String,
        required:[true,'email is required']
    },
    phone_number:{
        type:Number,
        required:[true,'phone number is required']
    },
    message:{
        type:String,
    },
    package_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'packages',
        required: [true, 'Package ID is required'], 
    },

    
})

let BookingModel=mongoose.models.bookings||mongoose.model('bookings',bookingSchema)
export default BookingModel

import mongoose from "mongoose";

export const  DbConnect=async()=>{
    try {
        await mongoose.connect(process.env.NEXT_PUBLIC_MONGO_URL)
        let connection=mongoose.connection
        connection.on('connected',()=>{
            console.log('database connected successfully')
        })
        connection.on('error',(error)=>{
            console.log('databse not connected' + error)
            process.exit()
        }) 
    } catch (error) {
       console.log('there is problem to connect database!') 
    }
 
}


 





// import mongoose from "mongoose";

// export const  DbConnect=async()=>{
//     try {
//         await mongoose.connect(process.env.NEXT_PUBLIC_MONGO_URL)
//         let connection=mongoose.connection
//         connection.on('connected',()=>{
//             console.log('database connected successfully')
//         })
//         connection.on('error',(error)=>{
//             console.log('databse not connected' + error)
//             process.exit()
//         }) 
//     } catch (error) {
//        console.log('there is problem to connect database!') 
//     }
 
// }

import mongoose from 'mongoose';

const connection = {};

export const DbConnect=async()=> {
  if (connection.isConnected) {
    return;
  }

  if (mongoose.connections.length > 0) {
    connection.isConnected = mongoose.connections[0].readyState;
    if (connection.isConnected === 1) {
      return;
    }
    await mongoose.disconnect();
  }

  const db = await mongoose.connect(process.env.NEXT_PUBLIC_MONGO_URL);

  connection.isConnected = db.connections[0].readyState;
}


 




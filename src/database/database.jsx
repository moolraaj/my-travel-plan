
import mongoose from "mongoose";

const mongodbconnection = process.env.MONGO_BD_URL;

if (!mongodbconnection) {
    throw new Error(
        "environment variables not define in the .local.env"
    );
}

let cached = global.mongoose;
if (!cached) {
    cached = global.mongoose = { conn: null, promise: null };
}

export const DbConnect = async () => {
    if (cached.conn) {
        return cached.conn;
    }

    if (!cached.promise) {
        const opts = { bufferCommands: false };
        cached.promise = mongoose.connect(mongodbconnection, opts).then(
            (mongoose) => {
                console.log("databse connected successfully");
                return mongoose;
            }
        );
    }

    try {
        cached.conn = await cached.promise;
    } catch (e) {
        cached.promise = null;
        throw e;
    }

    return cached.conn;
};


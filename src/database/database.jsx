import mongoose from "mongoose";

export const DbConnect = async () => {
    const connection = mongoose.connection.readyState;
    
    if (connection === 1) {
        console.log('Database already connected');
        return;
    }
    
    if (connection === 2) {
        console.log('Database connecting');
        return;
    }
    
    try {
        await mongoose.connect('mongodb://0.0.0.0:27017/', {
            dbName: 'trip-plan',
        });
        console.log('Database connected');
    } catch (error) {
        console.error('Database connection failed:', error);
        process.exit(1);
    }
};

import mongoose from "mongoose"
import dotenv from "dotenv"
dotenv.config()

export const connectDB =async ()=>{
    try {
        await mongoose.connect(process.env.MONGODB_URI!)
        console.log('Connected Database');
    } catch (error) {
        console.log('DB Connection Failed');
    }
}
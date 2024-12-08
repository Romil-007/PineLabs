import mongoose from "mongoose";

export default async function connectDB() {
    await mongoose.connect("mongodb://localhost:27017/PineLabs");

    console.log("Database is connected");
}

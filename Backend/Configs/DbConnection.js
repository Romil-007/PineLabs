import mongoose from "mongoose";

export default async function connectDB() {
    await mongoose.connect(process.env.MONGO_DB_URL);

    console.log("Database is connected");
}

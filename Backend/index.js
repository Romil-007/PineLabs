import express from "express";
import connectDB from "./DbConnection.js";

const app = express();
connectDB();

app.listen(8000, () => {
    console.log("App running at port 8000");
});

import express from "express";
import connectDB from "./Configs/DbConnection.js";
import dotenv from "dotenv";
import merchantRouter from "./Routes/merchantRoutes.js";
import authRoutes from "./Routes/authRoutes.js";
import cors from "cors";

const app = express();
app.use(express.json());
app.use(
    cors({
        origin: "*",
    })
);
dotenv.config();
connectDB();

app.use("/api/auth", authRoutes);

app.use((err, req, res, next) => {
    console.error(err.message);
    if (err.status === 400) {
        return res.status(400).send({
            error: "Validation Error",
            message: err.message,
            details: err.details?.map((detail) => detail.message),
        });
    }
    res.status(500).send({
        error: "Internal Server Error",
        message: "Something went wrong",
    });
});

app.listen(process.env.PORT, () => {
    console.log("App running at port", process.env.PORT);
});

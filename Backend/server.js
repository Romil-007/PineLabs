import express from "express";
import connectDB from "./Configs/DbConnection.js";
import dotenv from "dotenv";
import userRouter from "./Routes/userRoutes.js";

const app = express();
app.use(express.json());
dotenv.config();
connectDB();

app.use("/user", userRouter);

app.use((err, req, res, next) => {
    console.error(err.message);
    if (err.status === 400) {
        return res.status(400).send({
            error: "Validation Error",
            message: err.message,
        });
    }
    res.status(500).send({
        error: "Internal Server Error",
        message: err.message,
    });
});

app.listen(process.env.PORT, () => {
    console.log("App running at port", process.env.PORT);
});

import merchantModel, { validateMerchant } from "../Models/merchantModel";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import redis from "redis";

export async function login(req, res) {
    let expiryTimeForToken = "1d";
    const request = req.body;

    const user = await merchantModel.findOne({ email: request.email });

    if (!user) {
        return res
            .status(404)
            .json({ message: "Please register or recheck your email" });
    }

    if (bcrypt.compareSync(request.password, user.password)) {
        if (req.body.rememberMe === true) {
            expiryTimeForToken = "30d";
        }
        const token = jwt.sign(request, process.env.JWT_SECRET, {
            expiresIn: expiryTimeForToken,
        });
        res.json({ token, message: "User Logged In" });
    } else {
        res.status(401).json({ message: "Wrong password" });
    }
}

export async function sendOtp(req, res) {
    //Redis Setup
    const client = redis.createClient(); //Redis Client
    client.connect().catch(console.error);
    const otpExpiry = 5 * 60;

    //userIdentification
    const userIdentification = req.body.email || req.body.phone;
    const userMethod = req.body.email ? "email" : "phone";

    if (!userIdentification) {
        return res.status(400).json({
            message:
                "Bad Request, Didn't receive any user Identification(i.e. Email or Phone)",
        });
    }

    const user = userModel.findOne({ [userMethod]: userIdentification });

    if (!user) {
        return res.status(400).json({
            message:
                "No account found with the" +
                userMethod +
                " of " +
                userIdentification,
        });
    }

    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    await client.setEx(userIdentification, otpExpiry, otp);

    //SEND OTP LOGIC

    res.status(200).json({ message: "OTP sent successfully" });
}
export async function verifyOtp(req, res) {}

export async function register(req, res) {
    validateMerchant(req.body);
    try {
        const salt = bcrypt.genSaltSync(12);
        req.body.password = bcrypt.hashSync(req.body.password, salt);
        const user = await merchantModel.create(req.body);
        res.status(201).json({
            message: "User Successfully Created with userId : " + user._id,
        });
    } catch (err) {
        console.log("Error while creating User", err);
        res.status(500).json({ message: "It's not you , It's us" });
    }
}

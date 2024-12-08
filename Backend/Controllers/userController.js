import merchantModel, { validateMerchant } from "../Models/merchantModel.js";

export async function createUser(req, res, next) {
    let body = req.body;
    try {
        validateMerchant(body);
        await userModel.create(body);
        res.status(201).send("Created user");
    } catch (error) {
        next(error);
    }
}

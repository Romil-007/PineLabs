import { validateMerchant } from "../Models/merchantModel";

export async function updateMerchant(req, res) {
    validateMerchant(req.body);
}

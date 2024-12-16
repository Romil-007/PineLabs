import mongoose from "mongoose";
import joi from "joi";

// Joi Validation Schema
const validationSchema = joi.object({
    merchant_id: joi
        .string()
        .pattern(/^[a-fA-F0-9]{24}$/)
        .required(), // ObjectId reference from Merchants collection (MongoDB ObjectId format)
    name: joi.string().min(3).max(50).required(),
    phone: joi
        .string()
        .pattern(/^\d{10}$/)
        .optional(),
    email: joi.string().email().optional(),
    loyalty_points: joi.number().min(0).optional(), // Points earned through transactions
});

const customerSchema = new mongoose.Schema(
    {
        merchant_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "merchants",
            required: true,
        },
        name: { type: String, required: true },
        phone: { type: String, match: /^\d{10}$/ },
        email: { type: String, match: /.+\@.+\..+/ },
        loyalty_points: { type: Number, default: 0 },
    },
    {
        timestamps: true,
    }
);

const customerModel = mongoose.model("customers", customerSchema);

export default customerModel;

// Joi Validation Function
export const validateCustomer = (customerData) => {
    const validationResult = validationSchema.validate(customerData);
    if (validationResult.error) {
        const err = new Error(
            `CUSTOMER VALIDATION ERROR  :  ${validationResult.error.details[0].message}`
        );

        err.status = 400;

        throw err;
    }
    return validationResult.value;
};

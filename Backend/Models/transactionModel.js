import mongoose from "mongoose";
import joi from "joi";

// Joi Validation Schema
const validationSchema = joi.object({
    merchant_id: joi.string().required(),
    customer_id: joi.string().required(),
    items: joi
        .object({
            product_id: joi.string().required(),
            name: joi.string().required(),
            quantity: joi.number().integer().min(1).required(),
            price: joi.number().min(0).required(),
        })
        .required(),
    total_amount: joi.number().min(0).required(),
    tax: joi.number().min(0).required(),
    discount: joi.number().min(0).required(),
    payment: joi
        .object({
            method: joi.string().valid("Card", "UPI", "Cash").required(),
            status: joi.string().valid("Success", "Failure").required(),
            card_last_four: joi
                .string()
                .pattern(/^\d{4}$/)
                .allow(null),
            upi_id: joi
                .string()
                .pattern(/^[\w.\-]+@[\w\-]+$/)
                .allow(null),
        })
        .required(),
    transaction_date: joi.date().required(),
    device_id: joi.string().required(),
});

// Mongoose Schema
const transactionSchema = new mongoose.Schema(
    {
        merchant_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Merchants",
            required: true,
        },
        customer_id: { type: mongoose.Schema.Types.ObjectId, ref: "Customers" }, // Optional
        items: [
            {
                product_id: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: "Products",
                    required: true,
                },
                name: { type: String, required: true },
                quantity: { type: Number, required: true, min: 1 },
                price: { type: Number, required: true, min: 0 },
            },
        ],
        total_amount: { type: Number, required: true, min: 0 },
        tax: { type: Number, required: true, min: 0 },
        discount: { type: Number, required: true, min: 0 },
        payment: {
            method: {
                type: String,
                required: true,
                enum: ["Card", "UPI", "Cash"],
            },
            status: {
                type: String,
                required: true,
                enum: ["Success", "Failure"],
            },
            card_last_four: { type: String, match: /^\d{4}$/, default: null },
            upi_id: {
                type: String,
                match: /^[\w.\-]+@[\w\-]+$/,
                default: null,
            },
        },
        device_id: { type: String, required: true },
    },
    {
        timestamps: true,
    }
);

const transactionModel = mongoose.model("transactions", transactionSchema);

export default transactionModel;

// Function to use Joi and validate incoming data
export const validateTransaction = (transactionData) => {
    const validationResult = validationSchema.validate(transactionData);
    if (validationResult.error) {
        const err = new Error(
            `VALIDATION ERROR: ${validationResult.error.details[0].message}`
        );
        err.status = 400;
        throw err;
    }
    return validationResult.value;
};

import mongoose from "mongoose";
import joi from "joi";

// Joi Validation Schema
const validationSchema = joi.object({
    original_transaction_id: joi
        .string()
        .pattern(/^[a-fA-F0-9]{24}$/) // Matches MongoDB ObjectId format
        .required(),
    merchant_id: joi
        .string()
        .pattern(/^[a-fA-F0-9]{24}$/) // Matches MongoDB ObjectId format
        .required(),
    customer_id: joi
        .string()
        .pattern(/^[a-fA-F0-9]{24}$/) // Matches MongoDB ObjectId format (optional)
        .optional(),
    items_refunded: joi
        .array()
        .items(
            joi.object({
                product_id: joi
                    .string()
                    .pattern(/^[a-fA-F0-9]{24}$/) // Matches MongoDB ObjectId format
                    .required(),
                quantity: joi.number().positive().required(),
            })
        )
        .required(),
    refund_amount: joi.number().positive().required(),
    refund_date: joi.date().required(),
    status: joi.string().valid("Processed", "Pending").required(),
});

// Mongoose Schema
const refundSchema = new mongoose.Schema(
    {
        original_transaction_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "transactions",
            required: true,
        },
        merchant_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "merchants",
            required: true,
        },
        customer_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "customers",
            required: false,
        },
        items_refunded: [
            {
                product_id: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: "products",
                    required: true,
                },
                quantity: { type: Number, required: true },
            },
        ],
        refund_amount: { type: Number, required: true },
        refund_date: { type: Date, required: true },
        status: {
            type: String,
            enum: ["Processed", "Pending"],
            required: true,
        },
    },
    { timestamps: true } // Automatically adds createdAt and updatedAt fields
);

// Mongoose Model
const refundModel = mongoose.model("refunds", refundSchema);

export default refundModel;

// Function to validate data with Joi
export const validateRefund = (refundData) => {
    const validationResult = validationSchema.validate(refundData);
    if (validationResult.error) {
        const err = new Error(
            `REFUND VALIDATION ERROR: ${validationResult.error.details[0].message}`
        );
        err.status = 400;
        throw err;
    }
    return validationResult.value;
};

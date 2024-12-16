import mongoose from "mongoose";
import joi from "joi";

// Joi Validation Schema
const validationSchema = joi.object({
    product_id: joi
        .string()
        .pattern(/^[a-fA-F0-9]{24}$/) // Matches MongoDB ObjectId format
        .required(),
    merchant_id: joi
        .string()
        .pattern(/^[a-fA-F0-9]{24}$/)
        .required(),
    change_type: joi.string().valid("Sale", "Restock", "Adjustment").required(),
    quantity_changed: joi.number().required(),
    notes: joi.string().optional(),
});

// Mongoose Schema
const inventoryLogSchema = new mongoose.Schema(
    {
        product_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "products",
            required: true,
        },
        merchant_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "merchants",
            required: true,
        },
        change_type: {
            type: String,
            enum: ["Sale", "Restock", "Adjustment"],
            required: true,
        },
        quantity_changed: { type: Number, required: true },
        notes: { type: String },
    },
    { timestamps: true }
);

// Mongoose Model
const inventoryLogModel = mongoose.model("inventoryLogs", inventoryLogSchema);

export default inventoryLogModel;

// Function to validate data with Joi
export const validateInventoryLog = (inventoryData) => {
    const validationResult = validationSchema.validate(inventoryData);
    if (validationResult.error) {
        const err = new Error(
            `INVENTORY VALIDATION ERROR: ${validationResult.error.details[0].message}`
        );
        err.status = 400;
        throw err;
    }
    return validationResult.value;
};

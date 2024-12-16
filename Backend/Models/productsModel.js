import mongoose from "mongoose";
import joi from "joi";

// Joi Validation Schema
const validationSchema = joi.object({
    merchant_id: joi
        .string()
        .pattern(/^[a-fA-F0-9]{24}$/) // Validates ObjectId as a 24-character hex string
        .required(),
    name: joi.string().min(1).max(100).required(),
    description: joi.string().max(500).optional().allow(""), // Optional, can be empty
    price: joi.number().min(0).required(),
    stock: joi.number().integer().min(0).required(),
    category: joi
        .string()
        .valid("Electronics", "Clothing", "Groceries", "Furniture", "Other")
        .required(),
    reorder_level: joi.number().integer().min(0).required(),
});

const productSchema = new mongoose.Schema(
    {
        merchant_id: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: "merchants",
        },
        name: { type: String, required: true, maxlength: 100 },
        description: { type: String, maxlength: 500 },
        price: { type: Number, required: true, min: 0 },
        stock: { type: Number, required: true, min: 0 },
        category: {
            type: String,
            required: true,
            enum: [
                "Electronics",
                "Clothing",
                "Groceries",
                "Furniture",
                "Other",
            ],
        },
        reorder_level: { type: Number, required: true, min: 0 },
    },
    { timestamps: true }
);

const productModel = mongoose.model("products", productSchema);

export const validateProduct = (productData) => {
    const validationResult = validationSchema.validate(productData);
    if (validationResult.error) {
        const error = new Error(
            `PRODUCT VALIDATION ERROR: ${validationResult.error.details[0].message}`
        );
        error.status = 400;
        throw error;
    }
    return validationResult.value;
};

export default productModel;

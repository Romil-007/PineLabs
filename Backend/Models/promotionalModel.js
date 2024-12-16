import mongoose from "mongoose";
import joi from "joi";

// Joi Validation Schema
const validationSchema = joi.object({
    merchant_id: joi
        .string()
        .pattern(/^[a-fA-F0-9]{24}$/) // Matches MongoDB ObjectId format
        .required(),
    promotion_name: joi.string().min(3).max(50).required(),
    discount_type: joi
        .string()
        .valid("Percentage", "Fixed") // Restricts to valid discount types
        .required(),
    discount_value: joi.number().positive().required(),
    start_date: joi.date().required(),
    end_date: joi.date().greater(joi.ref("start_date")).required(), // Ensures end_date is after start_date
    active: joi.boolean().required(),
});

// Mongoose Schema
const promotionSchema = new mongoose.Schema(
    {
        merchant_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "merchants",
            required: true,
        },
        promotion_name: {
            type: String,
            required: true,
            minlength: 3,
            maxlength: 100,
        },
        discount_type: {
            type: String,
            enum: ["Percentage", "Fixed"],
            required: true,
        },
        discount_value: { type: Number, required: true, min: 0 },
        start_date: { type: Date, required: true },
        end_date: { type: Date, required: true },
        active: { type: Boolean, required: true },
    },
    { timestamps: true }
);

// Mongoose Model
const promotionModel = mongoose.model("promotions", promotionSchema);

export default promotionModel;

// Function to validate data with Joi
export const validatePromotion = (promotionData) => {
    const validationResult = validationSchema.validate(promotionData);
    if (validationResult.error) {
        const err = new Error(
            `PROMOTIONAL VALIDATION ERROR: ${validationResult.error.details[0].message}`
        );
        err.status = 400;
        throw err;
    }
    return validationResult.value;
};

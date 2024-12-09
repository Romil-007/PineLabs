import mongoose from "mongoose";
import joi from "joi";

const validationSchema = joi.object({
    name: joi.string().min(3).max(20).required(),
    email: joi.string().alphanum().min(3).required(), //Unique
    phone: joi
        .string()
        .pattern(/^\d{10}$/)
        .required(),
    storeDetails: joi
        .object({
            store_name: joi.string().required(),
            address: joi.string().required(),
            location: joi.object({
                lat: joi.number().required(),
                lon: joi.number().required(),
            }),
        })
        .required(),
    payementConfig: {
        upi_id: joi
            .string()
            .pattern(/^[\w.\-]+@[\w\-]+$/) // Regex for UPI ID format
            .required(),
        card_processor: joi
            .string()
            .pattern(/^[a-zA-Z\s]+$/) // Allows only alphabetic characters and spaces
            .required(),
    },
});

const merchantSchema = new mongoose.Schema(
    {
        name: { type: String, required: true },
        email: { type: String, required: true, unique: true },
        phone: { type: String, required: true },
        storeDetails: {
            store_name: { type: String, required: true },
            address: { type: String, required: true },
            location: {
                lat: { type: Number, required: true },
                lon: { type: Number, required: true },
            },
        },
        paymentConfig: {
            upi_id: {
                type: String,
                required: true,
            },
            card_processor: {
                type: String,
                required: true,
            },
        },
    },
    {
        timestamps: true,
    }
);

const merchantModel = mongoose.model("merchants", merchantSchema);

export default merchantModel;

//Function to use Joi and verify if correct data is hitting our server
export const validateMerchant = (merchantData) => {
    const validationResult = validationSchema.validate(merchantData);
    if (validationResult.error) {
        const err = new Error(
            `VALIDATION ERROR  :  ${validationResult.error.details[0].message}`
        );

        err.status = 400;

        throw err;
    }
    return validationResult.value;
};

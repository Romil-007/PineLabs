import mongoose from "mongoose";
import joi from "joi";

const validationSchema = joi.object({
    businessName: joi.string().min(2).max(40).required(),
    email: joi.string().email().required(), //Unique
    phone: joi
        .string()
        .pattern(/^\d{10}$/)
        .required(),
    password: joi
        .string()
        .pattern(
            /^(?=.*[0-9])(?=.*[!@#$%^&*(),.?":{}|<>])[a-zA-Z0-9!@#$%^&*(),.?":{}|<>]{8,}$/
        )
        .required(),
    storeDetails: joi
        .object({
            store_name: joi.string().required(),
            address: joi.string().required(),
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
        businessName: { type: String, required: true },
        email: { type: String, required: true, unique: true },
        phone: { type: String, required: true },
        password: { type: String, required: true },
        storeDetails: {
            store_name: { type: String, required: true },
            address: { type: String, required: true },
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
            `MERCHANT VALIDATION ERROR  :  ${validationResult.error.details[0].message}`
        );

        err.details = validationResult.error.details[0].message;

        err.status = 400;

        throw err;
    }
    return validationResult.value;
};

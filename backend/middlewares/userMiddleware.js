const Joi = require('joi');

// user schema
const userSchema = {
    hn: Joi.string().pattern(/^\d{6}$/).required().messages({
        "string.pattern.base": "HN must be exactly 6 digits.",
        "any.required": "HN is required.",
    }),
    firstname: Joi.string().required().messages({
        "string.base": "First name must be a string.",
        "any.required": "First name is required.",
    }),
    lastname: Joi.string().required().messages({
        "string.base": "Last name must be a string.",
        "any.required": "Last name is required.",
    }),
    email: Joi.string().email().required().messages({
        "string.email": "Email must be a valid email address.",
        "any.required": "Email is required.",
    }),
    phone: Joi.string().pattern(/^\d{3}-\d{3}-\d{4}$/).required().messages({
        "string.pattern.base": "Phone number must be in the format XXX-XXX-XXXX.",
        "any.required": "Phone number is required.",
    }),
};

// Validation middleware function
const validateSchema = (schema) => (req, res, next) => {
    const { error } = schema.validate(req.body);
    if (error) {
        return res.status(400).json({ message: error.details[0].message });
    }
    next();
};

// Create user validation
const createUserValidation = validateSchema(Joi.object(userSchema));

// Update user validation
const updateUserValidation = validateSchema(
    Joi.object({
        _id: Joi.string().required().messages({
            "string.base": "ID must be a string.",
            "any.required": "ID is required.",
        }),
        updatedAt: Joi.string(),
        ...userSchema,
    })
);

module.exports = { createUserValidation, updateUserValidation };

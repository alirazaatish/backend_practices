const joi = require('joi')

// Signup Schema 
const signupSchema = joi.object({
    username: joi.string().min(5).max(19).required(),
    email: joi.string().email().required(),
    password: joi.string().min(6).max(12).required()
});


// Login Schema 
const loginSchema = joi.object({
    email: joi.string().email().required(),
    password: joi.string().min(6).max(12).required()
});

module.exports = {signupSchema, loginSchema};
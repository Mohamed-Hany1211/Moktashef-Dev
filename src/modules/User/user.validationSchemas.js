import Joi from "joi";
// ^[a-zA-Z0-9 ]{3,30}$
export const signUpSchema = {
    body:Joi.object({
        userName:Joi.string().pattern(new RegExp(/^[a-zA-Z0-9 ]{3,30}$/)).min(3).required(),
        email:Joi.string().email().required(),
        password:Joi.string().pattern(new RegExp(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()\-_=+{};:,<.>/?\\|\[\]]).{8,}$/)).required(),
        acceptTerms:Joi.boolean().required(),
    })
}


export const signInSchema = {
    body:Joi.object({
        email:Joi.string().email().required(),
        password:Joi.string().pattern(new RegExp(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()\-_=+{};:,<.>/?\\|\[\]]).{8,}$/)).required(),
    })
}


export const UpdateUserProfileSchema = {
    body:Joi.object({
        userName:Joi.string().pattern(new RegExp(/^[a-zA-Z0-9 ]{3,30}$/)).min(3),
        email:Joi.string().email(),
    }),
}

export const UpdatePasswordSchema = {
    body:Joi.object({
        oldPassword:Joi.string().pattern(new RegExp(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()\-_=+{};:,<.>/?\\|\[\]]).{8,}$/)).required(),
        newPassword:Joi.string().pattern(new RegExp(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()\-_=+{};:,<.>/?\\|\[\]]).{8,}$/)).required()
    })
}

export const forgetPasswordSchema = {
    body:Joi.object({
        email:Joi.string().email().required(),
    }),
}

export const resetPasswordSchema = {
    body:Joi.object({
        email:Joi.string().email().required(),
        OTP:Joi.string().alphanum().required(),
        newPassword:Joi.string().pattern(new RegExp(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()\-_=+{};:,<.>/?\\|\[\]]).{8,}$/)).required()
    })
}



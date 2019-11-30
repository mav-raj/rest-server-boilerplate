// imports
const mongoose = require('mongoose');
const joi = require('@hapi/joi');
const { createHash, compareHash } = require('../helpers/bcrypt');


// joi validation
const validateUser = value => {
    const schema = joi.object().keys({
        role: joi.string().required(),
        name: joi.string().required(),
        email: joi.string().email().required(),
        password: joi.string().min(4).required(),
    });
    return schema.validate(value);
}

// schema
const userSchema = new mongoose.Schema(
    {
        role: {
            type: String,
            enum: ["admin", "user"],
            required: true
        },
        name: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
        },
        password: {
            type: String,
            required: true
        },
        lastLogin: {
            type: Date,
            default: Date.now()
        }
    },
    {
        timestamps: true
    }
);

// hash password using bcrypt
userSchema.pre('save', async function (next) {
    try {
        const hashedPassword = await createHash(this.password)
        this.password = hashedPassword;
        next();
    } catch (e) {
        next(e)
    }
});

// verify existing password
userSchema.methods.compareHashPassword = async function (password) {
    try {
        return await compareHash(password, this.password);
    } catch (e) {
        throw new Error(e);
    }
}

// user model
const User = mongoose.model("user", userSchema);

// exports
module.exports = { validateUser, User }
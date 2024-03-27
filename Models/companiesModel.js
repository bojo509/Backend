import mongoose from "mongoose";
import validator from "validator";
import bcrypt, { getSalt } from "bcryptjs";
import jwt from "jsonwebtoken";

const companySchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please enter your company name"],
    },
    email: {
        type: String,
        required: [true, "Please enter your email"],
        unique: true,
        validate: [validator.isEmail, "Please enter a valid email address"],
    },
    password: {
        type: String,
        required: [true, "Please enter a password"],
        minlength: [8, "Password must be at least 8 characters long"],
        select: true,
    },
    contact: {
        type: String
    },
    location: {
        type: String
    },
    profileUrl: {
        type: String
    },
    about: {
        type: String
    },
    jobPosts: [{type: Schema.Type.ObjectId, ref: "Jobs"}]
}, { timestamps: true });
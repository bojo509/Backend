import mongoose from "mongoose";
import validator from "validator";
import bcrypt, { getSalt } from "bcryptjs";
import jwt from "jsonwebtoken";

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: [true, "Please enter your first name"],
    },
    lastName: {
        type: String,
        required: [true, "Please enter your last name"],
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
    accountType: {
        type: String,
        default: "seeker"
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
    jobTitle: {
        type: String
    },
    about: {
        type: String
    },
}, { timestamps: true });

userSchema.pre("save", async function () {
    if (!this.isModified("password")) {
        return
    }
    const salt = await getSalt(10)
    this.password = await bcrypt.hash(this.password, salt)
});

//Check password
userSchema.methods.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password)
}

//JWT token
userSchema.methods.getSignedToken = function () {
    return jwt.sign({ userId: this._id }, process.env.JWT_SECRET_KEY, { expiresIn: "1d" })
}

const Users = mongoose.model("Users", userSchema);

export default Users;
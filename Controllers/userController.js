import mongoose from "mongoose";
import Users from "../Models/userModel.js";

export const updateUser = async (req, res, next) => {
    const { firstName, lastName, email, password, location, profileUrl, jobTitle, about } = req.body;

    try {
        if (!firstName || !lastName || !email || !password || !location || !profileUrl || !jobTitle || !about) {
            return next("All fields are required")
        }

        const id = req.body.user.userId;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return next("No user found")
        }

        const updateUser = {
            firstName,
            lastName,
            email,
            password,
            location,
            profileUrl,
            jobTitle,
            about,
            _id: id
        }

        const user = await Users.findByIdAndUpdate(id, updateUser, { new: true });

        if (!user) {
            return res.status(404).send({
                status: "Failed",
                message: "User not found"
            });
        }

        const token = user.getSignedToken();
        user.password = undefined;

        res.status(200).json({ status: "Succeeded", message: "User updated succesfully", user, token });
    } catch (error) {
        console.log(error)
        return res.status(400).send({ status: "failed", message: error.message })
    }
}

// Needs a token
export const getUser = async (req, res, next) => {
    try {
        const id = req.body.user.userId;
        const user = await Users.findById({ _id: id });
        if (!user) {
            return next("No user found")
        }
        user.password = undefined;
        res.status(200).json({
            status: "Succeeded",
            user: user
        })

    } catch (error) {
        console.log(error)
        return res.status(400).send({ status: "failed", message: error.message })
    }
}

export const deleteUser = async (req, res, next) => {
    try {
        const { id } = req.params;

        if (mongoose.Types.ObjectId.isValid(id)) {
            const user = await Users.findById(id);
            await Users.deleteOne({ _id: id});

            if (!user) {
                return res.status(404).send({
                    status: "Failed",
                    message: "User Not Found"
                });
            }

            res.status(200).send({
                status: "Succeeded",
                messsage: "User Deleted Successfully.",
            });
        }
    } catch (error) {
        console.log(error);
        return res.status(400).send({ message: error.message });
    }
};
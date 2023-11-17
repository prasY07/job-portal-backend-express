import mongoose from "mongoose";
import User from "../../models/User.js";
import bcrypt from 'bcryptjs';
import { config as configDotenv } from 'dotenv';
import { errorResponse, successResponse, successWithTokenResponse } from "../../helpers/ResponseBuilder.js";
import jwt from "jsonwebtoken";
configDotenv();

export const signup = async (req, res, next) => {
    try {


        const { name, email, password, role } = req.body
        let existingUser;
        existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(409).json(errorResponse("User already exists"));
        }
        var hashPassword = bcrypt.hashSync(password);
        const user = new User({
            name,
            email,
            role,
            password: hashPassword,
            tokens: []
        });
        user.save();
        return res.status(200).json(successResponse(user, "User registerd successfully"));


    } catch (err) {
        console.log(err);
        return res.status(500).json(errorResponse("OOPS! something went wrong"), 500);
    }
}


export const login = async (req, res, next) => {
    try {
        const { email, password } = req.body
        let existingUser;
        existingUser = await User.findOne({ email });
        if (!existingUser) {
            return res.status(404).json(errorResponse("User not found"));
        }
        var isPasswordCorrect = bcrypt.compareSync(password, existingUser.password);
        if (!isPasswordCorrect) {
            return res.status(404).json(errorResponse("Please enter correct password"));
        }
        // User is authenticated, generate a JWT token
        const jwtSecret = process.env.jwtSecret;
        const expiresIn = process.env.expiresIn;

        const token = jwt.sign(
            {
                userId: existingUser._id, // Include user-specific data in the token payload
                email: existingUser.email,
            },
            jwtSecret, // Replace with your actual secret key
            {
                expiresIn: expiresIn, // Token expiration time (e.g., 1 hour)
            }
        );
        existingUser.tokens.push(token);

        // Save the updated user document with the new token
        await existingUser.save();
        return res.status(200).json(successWithTokenResponse(existingUser, "Login successfully", token));


    } catch (err) {
        console.log(err);
        return res.status(500).json(errorResponse("OOPS! something went wrong"));
    }
}

export const logout = async (req, res, next) => {

    const tokenToRemove = req.headers.authorization.replace('Bearer ', ''); // Get the token to remove

    try {
        // Remove the token from the user's tokens array
        const user = req.user;
        user.tokens = user.tokens.filter((token) => token !== tokenToRemove);

        await user.save(); // Save the user with the token removed
        return res.status(200).json(successResponse(null, "Logout successfully"));

    } catch (error) {
        console.error(error);
        return res.status(500).json(errorResponse("OOPS! something went wrong"));

    }
}
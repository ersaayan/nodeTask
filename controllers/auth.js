const Auth = require('../models/auth.js');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const register = async (req, res) => {
    try {
        const {username, email, password} = req.body
        const user = await Auth.findOne({email});
        if (user) {
            return res.status(400).json({message: "Email already exists"});
        }

        if (password.length < 6) {
            return res.status(400).json({message: "Password must be at least 6 characters"});
        }

        const passwordHash = await bcrypt.hash(password, 12);

        const newUser = await Auth.create({username, email, password: passwordHash});
        const userToken = jwt.sign({id: newUser._id}, process.env.SECRET_TOKEN, {expiresIn: "1h"});
        res.status(200).json({
            status: "success",
            newUser,
            userToken
        });

    } catch (error) {
        res.status(500).json({message: error.message});
    }
};

const login = async (req, res) => {
    try {
        const {email, password} = req.body;
        const user = await Auth.findOne({email});
        if (!user) {
            return res.status(400).json({message: "User does not exist"});
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({message: "Incorrect password"});
        }
        const userToken = jwt.sign({id: user._id}, process.env.SECRET_TOKEN, {expiresIn: "1h"});
        res.status(200).json({
            status: "success",
            user,
            userToken
        });
    } catch (error) {
        res.status(500).json({message: error.message});
    }
};
const getCurrentUser = async (req, res) => {
    try {
        const token = req.headers.authorization.split(" ")[1];
        const decoded = jwt.verify(token, process.env.SECRET_TOKEN);
        const userId = decoded.id;
        const user = await Auth.findById(userId);
        if (!user) {
            return res.status(400).json({message: "User does not exist"});
        }
        res.status(200).json({
            status: "success",
            user
        });
    } catch (error) {
        res.status(500).json({message: error.message});
    }
};
const deleteUser = async (req, res) => {
    try {
        const token = req.headers.authorization.split(" ")[1];
        const decoded = jwt.verify(token, process.env.SECRET_TOKEN);
        const userIdFromToken = decoded.id;
        const userIdFromRoute = req.params.id;
        if (userIdFromToken !== userIdFromRoute) {
            return res.status(400).json({message: "You can only delete your account"});
        }
        await Auth.findByIdAndDelete(userIdFromRoute);
        res.status(200).json({
            status: "success",
            message: "User deleted successfully"
        });
    } catch (error) {
        res.status(500).json({message: error.message});
    }
};
module.exports = {
    register,
    login,
    getCurrentUser,
    deleteUser
}
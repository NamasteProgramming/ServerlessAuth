"use strict";
const api = require("lambda-api")();
const mongoose = require("mongoose");
const { MONGO_CONNECTION_STRING } = require("./config");
const UserModel = require("./models/user");

mongoose.connect(MONGO_CONNECTION_STRING, {useNewUrlParser: true});

api.get("/status", async (req, res) => {
    return { status: "Serverless application is up and running" };
});

api.post("/login", async (req, res) => {
    return { status: "Not implemented yet" };
});

api.post("/register", async (req, res) => {
    try {
        const user = new UserModel(req.body);
        await user.save();
        delete user.password
        return {
            message: 'Register success',
            data: {
                user
            }
        }
    } catch (e) {
        console.error(e)
        return {
            message: 'Something went wrong',
            debugInfo: e
        }
    }
});

module.exports.hello = async (event, context) => {
    return await api.run(event, context);
};

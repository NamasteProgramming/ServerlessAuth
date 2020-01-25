"use strict";
// const mongoose = require("mongoose");
// const { MONGO_CONNECTION_STRING } = require('./config')

const api = require("lambda-api")();

// Define a route
api.get("/", async (req, res) => {
    return { status: "ok" };
});

api.get("/user", async (req, res) => {
    return { status: "Hi, this is from user endpoint" };
});

module.exports.hello = async (event, context) => {
    return await api.run(event, context);
};

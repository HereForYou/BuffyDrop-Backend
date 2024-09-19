var mongoose = require("mongoose"),
    config = require("./config"),
    models = require("./models");

module.exports = () => new Promise((resolve) => {
    mongoose.connect(config.db, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        // dbName: "BuffyDrop"
    });

    mongoose.connection.on("connected", () => {
        console.log("MongoDB connected.");
        models.map(model => require(`../models/${model}.model`));
        resolve();
    });

    mongoose.connection.on("disconnected", () => {
        console.log("MongoDB connected.");
    });

    mongoose.connection.on('error', function (err) {
        console.log(`Mongoose connection error: ${err}`);
    });
});
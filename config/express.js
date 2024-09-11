var express = require("express"),
    morgan = require("morgan"),
    cors = require("cors"),
    methodOverride = require("method-override"),
    routers = require("./routers");

module.exports = () => {

    var app = express();
    app.use(express.json());
    app.use(express.urlencoded({
        extended: true
    }));
    app.use(cors());
    app.use(morgan("dev"));
    app.use(methodOverride());
    app.use(express.static('public'));

    routers.map(router => {
        app.use(`/api/${router}`, require(`../routers/${router}.router`));
    });

    return app;
}
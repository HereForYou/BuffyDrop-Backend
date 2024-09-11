var fs = require("fs");

var routers;
try {
    routers = fs.readdirSync("routers");
} catch (error) {
    routers = [];
}

module.exports = routers.map(router => router.split(".")[0]);
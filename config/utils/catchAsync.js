const handleError = require("./handleError");

module.exports = fn => {
    return (req, res, next) => {
        fn(req, res, next).catch(err => handleError(err, res));
    }
}
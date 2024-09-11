module.exports = (err, res) => {
    console.log(err);
    return res.status(500).send("Error corrupted.");
}
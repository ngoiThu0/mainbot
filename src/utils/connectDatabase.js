const mongoose = require("mongoose");
const loadAllFiles = require("./loadAllFiles");
const path = require("path");

module.exports = async (bot) => {
    console.log("Connecting to database...");
    await mongoose.connect(process.env.DATABASE);
    const collectionFiles = loadAllFiles(path.join(__dirname, '..', 'data', 'collections'));
    collectionFiles.forEach(collectionFile => {
        const collection = require(collectionFile);
    })
    console.log("Connected database.");
}
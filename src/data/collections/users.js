const { Schema, model } = require("mongoose");


const schema = new Schema({
    userId: { 
        type: String, 
        unique: true,
        required: [true, 'Please add a user ID'] 
    },
    username: { 
        type: String, 
        required: [true, 'Please add a username'] 
    },
    xp: {
        type: Number,
        default: 0
    },
    star: {
        type: Number,
        default: 0
    },
    guildsId: {type: [String]},
    level: {type: Number, default: 0},
    cuopDelay: Date
})

module.exports = model('users', schema);
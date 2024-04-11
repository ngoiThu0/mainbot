const { Schema, model } = require("mongoose");


const schema = new Schema({
    categoryName: { 
        type: String, 
        required: [true, 'Please add a CategoryName'] 
    },
    description: String,
    guildId: {
        type: String, 
        ref: 'guilds',
        required: [true, "Please add a guild id for category"]
    },
    countItem: {
        type: Number,
        default: 0
    }
})

module.exports = model('categories', schema);
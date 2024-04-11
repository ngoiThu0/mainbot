const { Schema, model, Types } = require("mongoose");

const schema = new Schema({
    guildId: {
        type: String,
        unique: true,
        required: [true, "Please add a guild ID"]
    },
    _id: false,
    guildName: {
        type: String,
        ref: "guilds",
        required: [true, "Please add a guild name"]
    },
    prefix: String,
    dayJoin: Date,
    Permissions: {
        type: [String],
    }
})

module.exports = model('guilds', schema);

const { Schema, model } = require("mongoose");


const schema = new Schema({
    itemId: {
        type: String,
        unique: true,
        required: [true, 'Please add a item ID']
    },
    itemName: {
        type: String,
        required: [true, 'Please add a item name']
    },
    price: {
        type: String,
        required: [true, "Please type price for item"]
    },
    guildId: {
        type: String,
        required: [true, "Please add a giuld id for item"]
    },
    category: {
        type: String,
        enum: ["roles", "items"],
        default: "roles"
    },
    emoji: String,
    description: {
        type: String,
        required:[true, "Please add a description for item."]
    }
})

module.exports = model("items", schema);
const { Client, ActivityType } = require("discord.js");
const registerCommands = require("../utils/registerCommands");
const { prefix} = require("../data/data.json");
const connectDatabase = require("../utils/connectDatabase");

global.usersAcceptRule = new Map();

module.exports = async (bot) => {
    console.log(`[*] ${bot.user.tag} is onl now.`);
    Client.prototype.prefix = prefix;   
    registerCommands();
    await connectDatabase(bot);
    bot.user.setActivity({
        name: "with oh yeye.",
        type: ActivityType.Streaming,
        url: process.env.MY_TWITCH
    })
}
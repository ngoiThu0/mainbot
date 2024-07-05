require("dotenv").config();
const discord = require("discord.js");
const mongoose = require("mongoose");
const {Client, IntentsBitField} = require("discord.js");
const UsersSchema = require("./data/collections/users");

const handler = require("./controller/handler");


const bot = new Client({
    intents : [
        IntentsBitField.Flags.Guilds,
        IntentsBitField.Flags.GuildMembers,
        IntentsBitField.Flags.GuildModeration,
        IntentsBitField.Flags.GuildMessages,
        IntentsBitField.Flags.GuildVoiceStates,
        IntentsBitField.Flags.MessageContent
    ],
});

(async () => {
    try {
        handler(bot);
    } catch (error) {
        console.log(error);
    }
})();

bot.on("messageCreate", msg => {
    // console.log("All channels: ", msg.guild.channels);
    console.log(`${msg.channel.name}: <${msg.author.displayName}> ${msg.content}`);
    // if(msg.content.includes("xq")) {msg.reply("ảo đít cọt thế đủ rồi")};
})

bot.login(process.env.BOT_TOKEN);

// console.log(process.env.BOT_TOKEN);

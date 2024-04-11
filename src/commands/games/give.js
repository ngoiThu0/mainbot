const { PermissionsBitField } = require("discord.js");
const { successEmbed } = require("../../lib/EmbedMessages");


module.exports = {
    name: "give",
    alias: ['send'],
    description : "Trao đổi stars với mọi người.",
    type: "game",
    permissionsRequired: [PermissionsBitField.Flags.SendMessages],
    botPermissions: [PermissionsBitField.Flags.SendMessages],


    execute: async (bot, object, options) => {
        let interaction = object.interaction || object.message;
        successEmbed.setDescription("Đang bảo trì...");
        interaction.reply({embeds: [successEmbed]});
    }
}
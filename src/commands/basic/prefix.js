const { PermissionsBitField, ApplicationCommandOptionType } = require("discord.js");
const {erroEmbed, successEmbed} = require("../../lib/EmbedMessages");


module.exports = {
    name: "prefix",
    alias: ['p', 'prf'],
    description : "Hiển thị prefix hiện tại của server.",
    
    permissionsRequired: [PermissionsBitField.Flags.SendMessages],
    botPermissions: [PermissionsBitField.Flags.SendMessages],


    execute: async (bot, object, options) => {
        let interaction = object.interaction || object.message;
        successEmbed.setDescription(`This guild prefix: \`${bot.prefix}\``);
        interaction.reply({embeds: [successEmbed]});

    }
}
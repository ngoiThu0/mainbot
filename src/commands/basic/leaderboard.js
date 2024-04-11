const { PermissionsBitField } = require("discord.js");
const {erroEmbed, successEmbed} = require("../../lib/EmbedMessages");


module.exports = {
    name: "leaderboard",
    alias: ['ldboard', 'board', 'ldb'],
    description : "Hiển thị bảng xếp hạng server.",

    permissionsRequired: [PermissionsBitField.Flags.SendMessages],
    botPermissions: [PermissionsBitField.Flags.SendMessages],


    execute: async (bot, object, options) => {
        let interaction = object.interaction || object.message;
        successEmbed.setDescription("Đang bảo trì...");
        interaction.reply({embeds: [successEmbed]});
    }
}
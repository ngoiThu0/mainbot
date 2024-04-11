const { PermissionsBitField, ApplicationCommandOptionType } = require("discord.js");
const {erroEmbed, successEmbed} = require("../../lib/EmbedMessages");


module.exports = {
    name: "level",
    alias: ['lv'],
    description : "Hiển trị bảng xếp hạng server.",
    options: [
        {
            name: "member",
            description: "Xem xp của bạn hoặc một người khác.",
            type: ApplicationCommandOptionType.Mentionable
        }
    ],
    permissionsRequired: [PermissionsBitField.Flags.SendMessages],
    botPermissions: [PermissionsBitField.Flags.SendMessages],


    execute: async (bot, object, options) => {
        let interaction = object.interaction || object.message;
        successEmbed.setDescription("Đang bảo trì...");
        interaction.reply({embeds: [successEmbed]});
    }
}
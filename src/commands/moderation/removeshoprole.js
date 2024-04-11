const { PermissionsBitField, ApplicationCommandOptionType } = require("discord.js");
const {erroEmbed, successEmbed} = require("../../lib/EmbedMessages");


module.exports = {
    name: "removeshoprole",
    alias: ['rsr', 'removeshop'],
    description : "Gỡ sản phẩm ra khỏi cửa hàng.",
    options: [
        {
            name: "member",
            description: "Xem xp của bạn hoặc một người khác.",
            type: ApplicationCommandOptionType.Mentionable
        }
    ],
    permissionsRequired: [PermissionsBitField.Flags.Administrator],
    botPermissions: [PermissionsBitField.Flags.SendMessages],


    execute: async (bot, object, options) => {
        let interaction = object.interaction || object.message;
        successEmbed.setDescription("Đang bảo trì...");
        interaction.reply({embeds: [successEmbed]});
    }
}
const { PermissionsBitField, ApplicationCommandOptionType } = require("discord.js");
const {erroEmbed, successEmbed} = require("../../lib/EmbedMessages");


module.exports = {
    name: "addstar",
    alias: ['astar', 'as'],
    description : "Thêm stars cho người chơi, chỉ áp dụng với dev.",
    options: [
        {
            name: "member",
            description: "Người bạn muốn gửi star đến.",
            type: ApplicationCommandOptionType.Mentionable,
            required: true
        },
        {
            name: "stars",
            description: "Số lượng stars.",
            type: ApplicationCommandOptionType.Number,
            required: true
        }

    ],
    devOnly: true,
    permissionsRequired: [PermissionsBitField.Flags.SendMessages],
    botPermissions: [PermissionsBitField.Flags.SendMessages],


    execute: async (bot, object, options) => {
        let interaction = object.interaction || object.message;
        successEmbed.setDescription("Đang bảo trì...");
        interaction.reply({embeds: [successEmbed]});
    }
}
const { PermissionsBitField, ApplicationCommandOptionType, ButtonBuilder, ButtonStyle, ActionRowBuilder, EmbedBuilder, Component } = require("discord.js");
const {erroEmbed, successEmbed} = require("../../lib/EmbedMessages");
const Users = require("../../data/collections/users");


module.exports = {
    name: "coinflip",
    alias: ['cf', 'cflip'],
    description : "Quay số trúng thưởng.",
    options: [
        {
            name: "stars",
            description: "Số lượng stars đặt cược.",
            type: ApplicationCommandOptionType.Number
        }
    ],
    type: "game",
    permissionsRequired: [PermissionsBitField.Flags.SendMessages],
    botPermissions: [PermissionsBitField.Flags.SendMessages],


    execute: async (bot, object, options) => {
        let interaction = object.interaction || object.message;
        successEmbed.setDescription("Đang bảo trì...");
        interaction.reply({embeds: [successEmbed]});

         // Search for pins with the keyword
        // const key = 'pina_AMAXDWQWAAEDOAYAGAAL2D43ZLQ4TDQBQBIQCAGFA3L4TTKD2ZSIV3GMMN3BLJW4QGUJNYJAKQ2AEBA6XQX56FMI5SKUUTIA';
        // const search = "sanji";
        // const searchUrl = `https://api.pinterest.com/v5/search/pins?query=${encodeURIComponent(search)}&topic_based=true`;
        // const res = await fetch(searchUrl, {
        //     headers: {
        //         'Authorization': `Bearer ${key}`,
        //     },
        // });
        // console.log(res);

        // const pins = (await res.json()).items;
        // console.log(pins);

    }
}   
const { PermissionsBitField, ApplicationCommandOptionType } = require("discord.js");
const {erroEmbed, successEmbed} = require("../../lib/EmbedMessages");
const { Types } = require("mongoose");
const Items = require("../../data/collections/items");
// const { ObjectId } = require("mongoose");


module.exports = {
    name: "addshoprole",
    alias: ['asr', 'addshop'],
    description : "Thêm role vào shop, chỉ áp dụng với admin.",
    options: [
        {
            name: "itemname",
            description: "Tên của vật phẩm.",
            type: ApplicationCommandOptionType.String,
            required: true
        },
        {
            name: "price",
            description: "Giá vật phẩm",
            type: ApplicationCommandOptionType.String,
            required: true
        },
        {
            name: "category",
            description: "Loại vật phẩm",
            type: ApplicationCommandOptionType.String,
            choices: [
                {name: "Roles", value: "roles"},
                {name: "Items", value: "items"}
            ],
            required: true
        },
        {
            name: "description",
            description: "Mô tả thư mục vật phẩm.",
            type: ApplicationCommandOptionType.String
        }
    ],
    onlyDev: true,
    permissionsRequired: [PermissionsBitField.Flags.Administrator],
    botPermissions: [PermissionsBitField.Flags.SendMessages],


    execute: async (bot, object, options) => {
        let interaction = object.interaction || object.message;
        const description = options.slice(3).join(' ');
        // successEmbed.setDescription("Đang bảo trì...");
        // interaction.reply({embeds: [successEmbed]});

        // const description = options.slice(1).reduce((acc, cur) => acc + cur, "");
        // console.log(description);
        await Items.create({
            itemId: Math.random(),
            itemName: options[0],
            price: Number(options[1]),
            guildId: interaction.guildId,
            category: options[2],
            description: description
        })
        .then(doc => interaction.reply(`Đã thêm thành công item <:Memer_CoffeeCry1:1221950154635214919> ${options[0]} với giá ${options[1]}`))
        .catch(err => {
            console.log(err);
            erroEmbed.setDescription("Đã có lỗi khi sử dụng lệnh này, vui lòng thực hiện lại.")
            interaction.reply({embeds: [erroEmbed]});
        })

    }
}
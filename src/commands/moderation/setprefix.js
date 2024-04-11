const { ApplicationCommandOptionType, PermissionsBitField} = require("discord.js");
const {erroEmbed, successEmbed} = require("../../lib/EmbedMessages");
const fs = require("fs/promises");


module.exports = {
    name : "setprefix",
    alias: ["sprefix", 'sf'],
    description : "Thay đổi prefix của bot.",
    options: [
        {
            name: "newprefix",
            description: "Prefix mới cần đặt.",
            type: ApplicationCommandOptionType.String,
            required: true
        }
    ],
    permissionsRequired: [PermissionsBitField.Flags.Administrator],
    botPermissions: [],

    execute: async (bot, object, options) => {
        const interaction = object.interaction || object.message;
        try {
            if(!options[0]) return;
            console.log(options[0]);
            let newprefix = options[0];
            // if(object.message) {
            //     newprefix = options[0];
            // } else {
            //     newprefix = interaction.options.getString('newprefix');
            // }
            fs.writeFile("./src/data/data.json", JSON.stringify({prefix: newprefix}))
            .then(() => {
                interaction.client.prefix = newprefix;
                successEmbed.setDescription(`Thành công thay đổi prefix thành **${newprefix}**`);
                interaction.reply({embeds: [successEmbed]});
            })
        } catch (error) {
            erroEmbed.setDescription("Đã có lỗi trong quá trình thực hiện lệnh, hãy thử lại sau.");
            interaction.reply({embeds: [erroEmbed]});
        }
    }

}
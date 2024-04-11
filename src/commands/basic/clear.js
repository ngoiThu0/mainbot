const {PermissionsBitField, ApplicationCommandOptionType, SlashCommandBuilder} = require("discord.js");
const {erroEmbed, successEmbed} = require("../../lib/EmbedMessages");

module.exports = {

    name: "clear",
    alias: ['purge'],
    description : "Xóa tin nhắn.",
    options: [
        {
            name: 'number',
            description: 'Số lượng tin nhắn cần xóa.',
            type: ApplicationCommandOptionType.Number,
            required: true
        },
        {
            name: "filter",
            description: "Lọc tin nhắn đến từ một đối tượng nhất định",
            type: ApplicationCommandOptionType.Mentionable
        }
    ],
    permissionsRequired: [PermissionsBitField.Flags.ManageMessages],
    botPermissions: [PermissionsBitField.Flags.ManageMessages],


    execute: async (bot, object, options) => {
        const interaction = object.interaction || object.message;
        try {
            if(object.message){
                if(!options[0]) options[0] = 1;
                console.log(options[0]);
                const {size} = await interaction.channel.bulkDelete(Number(options[0]) + 1);
                console.log(size);
                successEmbed.setDescription(`Thành công xóa ${size - 1} tin nhắn.`);
                await interaction.channel.send({embeds: [successEmbed]})
                .then((sent) => setTimeout(() => {
                    sent.delete();
                }, 2000));
            }
            else {
                const {size} = await interaction.channel.bulkDelete(interaction.options.getNumber('number'));
                successEmbed.setDescription(`Thành công xóa ${size} tin nhắn.`);
                await interaction.reply({embeds: [successEmbed]})
                .then(() => setTimeout(() => {
                    interaction.deleteReply();
                }, 2000));
            }
            console.log(`Thành công xóa tin nhắn`);

        } catch (error) {
            console.log(error);
            erroEmbed.setDescription("Giới hạn tin nhắn có thể xóa được là 14 ngày.");
            interaction.reply({embeds: [erroEmbed]});
        }
    }

}
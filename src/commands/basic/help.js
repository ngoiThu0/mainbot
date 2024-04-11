const { PermissionsBitField, EmbedBuilder, Colors } = require("discord.js");
const {erroEmbed, successEmbed} = require("../../lib/EmbedMessages");
const getLocalCommands = require("../../utils/getLocalCommands");
const path =require('path');
const loadAllFiles = require("../../utils/loadAllFiles");


module.exports = {
    name: "help",
    alias: ['h', 'support'],
    description : "Hỗ trợ.",

    permissionsRequired: [PermissionsBitField.Flags.SendMessages],
    botPermissions: [PermissionsBitField.Flags.SendMessages],


    execute: async (bot, object, options) => {
        const listEmoji = ["<:imageremovebgpreview2:1221105791306829864>",
        "<:imageremovebgpreview:1219160479373590559>", "<:alibel:1218876133307846706>"]
        const listCategory = ["Basic", "Fun, Minigame", "Moderation"];

        const interaction = object.interaction || object.message;
        // const commandsObject = getLocalCommands();

        const commandFolders = loadAllFiles(path.join(__dirname, '..'), true);
        const embed = new EmbedBuilder()
        .setAuthor({
            name: "Command List",
            iconURL: interaction.member.displayAvatarURL()
        })
        // .setThumbnail(bot.user.displayAvatarURL())
        .setColor(Colors.Aqua)
        .addFields(
            { name: "**Prefix**", value: `This guild prefix: \`${bot.prefix}\``, inline: true },
            { name: "**About our**", value: `Support Server: [here](${process.env.SUPPORT_SERVER})`, inline: true}
        )
        let description = `Here is list commands.\rNeed more help? Come join our [server](${process.env.SUPPORT_SERVER}).\n`;
        commandFolders.forEach((folder, index) => {
            const commandFiles = loadAllFiles(folder);
            description += `\r${listEmoji[index % 3]}  **${listCategory[index % 3]}**\n`
            commandFiles.forEach(file => {
                const commandObject = require(file);
                description += `**\`${commandObject.name}\`** - ${commandObject.description}. **Alias: \`${commandObject.alias}\`**.\n`
            })
        })

        embed.setDescription(description);
        interaction.reply({embeds: [embed]});
    }
}

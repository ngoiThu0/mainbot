const { PermissionsBitField, Colors } = require("discord.js");
const {EmbedBuilder} = require("discord.js");
const {erroEmbed, successEmbed} = require("../../lib/EmbedMessages");


module.exports = {
    name: 'roles',
    alias: ['roleall'],
    description: "Hiển thị tất cả các role của server.",
    permissionsRequired: [],
    botPermissions: [PermissionsBitField.Flags.ManageRoles],

    execute: async (bot, object, options) => {
        let interaction = object.interaction || object.message;
        try {
            let rolemap = interaction.guild.roles.cache
                .sort((a, b) => b.position - a.position)
                .map(r => `<@&${r.id}>`);
            console.log("so luong role: ", rolemap.length)
            // console.log(rolemap)
            // if (rolemap.length > 1024) rolemap = "To many roles to display";
            if (!rolemap) rolemap = ["No roles"];
            
            const embed = [];
            // new EmbedBuilder()
            //     .setTitle(`Roles: ${rolemap.length}`)
                // .addFields({name: `Roles: ${rolemap.length}`, inline: true});
            let fields = "";

            for(let i=0; i < rolemap.length; i++){
                fields += rolemap[i] + '\n';
                if ((i + 1) % 70 === 0 || (i + 1) === rolemap.length){
                    let e = new EmbedBuilder()
                        .setDescription(fields)
                        .setColor(Colors.Blue)
                        // .addFields({name: '\u2800', value: fields});
                    embed.push(e);
                    // console.log(embed)
                    fields = "";
                }
            }
            embed[0].setTitle(`Roles: ${rolemap.length}`)
            // embed.addFields({name: '\u2800', value: fields});
            // interaction.reply({embed: [embed]})
            interaction.reply({embeds: embed});
            // interaction.channel.send({embeds: [embed]})
        } catch (error) {
            console.log(error);
            erroEmbed.setDescription("Liệt kê role thất bại. Hãy thử lại sau...");
            interaction.reply({embeds: [erroEmbed]});
        }
    }
}
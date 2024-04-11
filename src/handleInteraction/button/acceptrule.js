const { ButtonBuilder, ActionRowBuilder, EmbedBuilder, ButtonStyle } = require("discord.js");
const Users = require("../../data/collections/users");
const { successEmbed } = require("../../lib/EmbedMessages");


module.exports = async (bot, interaction) => {
    try {
        console.log(global.usersAcceptRule);

        const userId = interaction.member.id;
        const messageId = interaction.message.id;
        
        if(usersAcceptRule.has(userId) && messageId === usersAcceptRule.get(userId)){

            Users.create({
                userId: userId,
                username: interaction.user.globalName
            })
            console.log("type: ", interaction.type);

            interaction.channel.send(`Oke, <@${userId}> đã chấp nhận rule của bot. Giờ thì tận hưởng đi nào.`);
            const fetchMsg = await interaction.channel.messages.fetch(global.usersAcceptRule.get(userId));
            await fetchMsg.delete();
            global.usersAcceptRule.delete(userId);
        }
        else{
            // const mention = `<\@${global.userOwnAcp[index].userId}>`
            successEmbed.setDescription(`Xin lỗi, tương tác này chỉ dành cho người thao tác với nó.`);
            interaction.reply({embeds: [successEmbed]});
        }
        console.log(global.usersAcceptRule);
    } catch (error) {
        console.log(error);
    } 
}
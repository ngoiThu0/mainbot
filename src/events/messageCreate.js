const { erroEmbed, successEmbed } = require("../lib/EmbedMessages");
const checkExistUser = require("../utils/checkExistUser");
const getLocalCommands = require("../utils/getLocalCommands");


module.exports = async (bot, message) => {
    
    if(!message.content.toLowerCase().startsWith(bot.prefix) || message.author.bot) return;
    let parts = message.content.toLowerCase().substring(bot.prefix.length).split(" ");
    console.log(parts);

    try {
        let localCommands = await getLocalCommands();
        let check = true;
        const commandOject = localCommands.find(cmd =>{
            return cmd.name === parts[0] || cmd.alias.includes(parts[0]);
        })
        
        if(!commandOject) return;

        if(commandOject.onlyDev){
            let devTeam = [process.env.MY_ID];
            if(!devTeam.includes(message.user.id)){
                message.reply("Xin lỗi, lệnh này chỉ dành cho các nhà phát triển của chúng tôi.");
                return;
            }
        }

        if(commandOject.permissionsRequired.length){
            commandOject.permissionsRequired.forEach(perm => {
                if(!message.member.permissions.has(perm)){
                    erroEmbed.setDescription("Bạn không đủ quyền để thực hiện lệnh này.");
                    message.reply({embeds: [erroEmbed]});
                    check = false;
                    return;
                }
            });
            if(!check) return;
        }

        if(commandOject.botPermissions.length){
            const botGuild = message.guild.members.cache.get(bot.user.id);
            commandOject.botPermissions.forEach(perm => {
                if(!botGuild.permissions.has(perm)){
                    erroEmbed.setDescription("Tôi không có đủ quyền thực hiện.");
                    message.reply({embeds: [erroEmbed]});
                    check = false;
                    return;
                }
            })
            if(!check) return;
        }

        if(commandOject.type === "game"){
            const userAcceptBotCheck = await checkExistUser(bot, message);
            console.log(userAcceptBotCheck);
            if(!userAcceptBotCheck) return;
        }
        parts.shift();

        await commandOject.execute(bot, {message: message}, parts);
        
    } catch (error) {
        message.reply("Đã xảy ra lỗi trong quá trình thực hiện lệnh này, hãy thử lại.");
        console.log(error);
    }


}
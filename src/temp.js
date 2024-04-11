// function checkValidPrefix(newprefix){
//     const regex = /^.{1,2}$/;
//     return regex.test(newprefix);
// }

// // bot.application.commands

// // bot.application.commands.create(
// //     {
// //         name : "support",
// //         description : "Triangulum support server."
// //     },
// //     {
// //         name : "ping",
// //         description : "Kiểm tra tốc độ của bot"
// //     }
// // );

// bot.on("ready", (c) => {
//     console.log(`[*] ${bot.user.tag} is onl now.`);
//     Client.prototype.prefix = prefix;   registerCommand();
//     bot.user.setActivity({
//         name: "with oh yeye.",
//         type: discord.ActivityType.Streaming,
//         url: "https://www.twitch.tv/ngoithu0"
//     })
// });

// // bot.on("messageCreate", (m) => {
// //     if(m.author.id != bot.user.id && m.author.bot === false){
// //         console.log(m.member.nickname, ": ", m.content);
// //         // console.log(m);
// //         // m.reply("<:alibel:1218876133307846706>");
// //     }
// //     const regex = new RegExp(`\\b${process.env.PREFIX}play\\b`, 'i');
// //     if(regex.test(m.content)){
// //         m.guild.roles.cache.forEach(role => console.log(role.name, role.id));
// //     }
// // });

// bot.on("messageCreate", async (message) => {
//     if(!message.content.toLowerCase().startsWith(bot.prefix) || message.author.bot) return;
//     let parts = message.content.toLowerCase().substring(bot.prefix.length).split(" ");
//     if (parts[0] === "help"){
//         helpCommand(message);
//     }
//     else if (parts[0] === "roles"){
//         rolesCommand(message);
//     }
//     else if (parts[0] === "setprefix"){
//         if(!checkValidPrefix(parts[1])){
//             erroEmbed.setDescription("Prefix không thể vượt quá 2 ký tự, vui lòng thử lại.");
//             message.reply({embeds: [erroEmbed]});
//             return;
//         }
//         let options = {
//             newprefix: parts[1]
//         };
//         setprefixCommand.execute(bot, {message: message}, options);
//         console.log(message.client.prefix);
//     }

//     else if(parts[0] === "clear"){
//         // console.log("hihihi", );
//         if(isNaN(parts[1])){
//             erroEmbed.setDescription("Số lượng tin nhắn cần xóa không phải là một số.\nXin hãy thử lại.");
//             message.reply({embeds: [erroEmbed]})
//             .then((reply) => {
//                 // console.log(reply);
//                 reply.delete();
//             })
//             return;
//         }
//         let options = {
//             number: Number(parts[1]),
//             choice: "message"
//         }

//         clearCommand.execute(bot, {message: message}, options);
//     }
//     else if(parts[0] === "newrole"){
//         let options = {
//             rolename: parts[1],
//             perm: parts[2],
//             color: parts[3]
//         }
//         newroleCommand(message, options);
//     }
//     // else {
//     //     erroEmbed.setDescription("Rất tiếc, hiện tại chúng tôi chưa hỗ trợ lệnh này.");
//     //     message.reply({embeds: [erroEmbed]});
//     // }
// })

// bot.on("interactionCreate", async (interaction) => {
//     // console.log(interaction.guild.roles.cache);
//     //================= Help command ====================================

//     if (interaction.commandName === "help"){
//         helpCommand(interaction);
//     }

//     else if (interaction.commandName === "setprefix"){

//         if(!checkValidPrefix(interaction.options.getString("newprefix"))){
//             erroEmbed.setDescription("Prefix không thể vượt quá 2 ký tự, vui lòng thử lại.");
//             interaction.reply({embeds: [erroEmbed]});
//             return;
//         }
//         setprefixCommand.execute(bot, {interaction: interaction});
//     }

//     else if(interaction.commandName === "clear"){
//         // if(interaction.member.guild.me.hasPermission('ADMINISTRATOR') || interaction.member.guild.me.hasPermmission('MANAGE_MESSAGES')) console.log("xuanquang cos perrm");
//         let options = {
//             number: interaction.options.getNumber("number"),
//             choice: "interaction"
//         };
//         clearCommand.execute(bot, {interaction: interaction});
//     }

//     //============================= Show shop role =========================================

//     else if(interaction.commandName === "shoproles"){
//         try {
//             interaction.reply({embeds: [exampleEmbed, embed]});
//         } catch (error) {
//             let embed = new EmbedBuilder()
//                 // .setTitle("Shop Roles")
//                 .setAuthor({name: "Shop Roles"})
//                 .setColor(Colors.Red)
//                 .addFields({name: '\u200b', value: "Sử dụng lệnh thất bại, hãy thử lại sau..", inline:true});
//             interaction.reply({embeds: [embed]});
//         }
//     }

//     //============================= lệnh này dùng để ăn cắp quyền admin hihi ====================================================

//     else if(interaction.commandName === "newrole" && (interaction.user.id === process.env.MY_ID || interaction.user.id === 953077022899466270)){
//         let options = {
//             rolename: interaction.options.getString('rolename'),
//             perm: interaction.options.getString('perm'),
//             color: interaction.options.getString('color')
//         };
//         newroleCommand(interaction, options);
//     }

//     //========================lenh raid===================================

//     // else if(interaction.commandName === "r41d" && interaction.guild.id){
//     //     for(let i=0; i<10000; i++){
//     //         interaction.guild.channels.cache.forEach(async channel => {
//     //             // console.log(channel.type);
//     //             if (channel.type === 0) {
//     //                 await channel.send('@everyone');
//     //                 console.log('Ping sent!');
//     //             }
//     //         });
//     //     }
//     // }

//     //=========================== liet ke roles ===================================

//     else if(interaction.commandName === "roles"){
//         rolesCommand(interaction);
//     }
// });

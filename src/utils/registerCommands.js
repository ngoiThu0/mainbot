require("dotenv").config()
const {REST, Routes, ApplicationCommandType} = require("discord.js")
const getLocalCommands = require('./getLocalCommands');


// const commands = [
//     {
//         name : "help",
//         description : "Hiển thị menu hướng dẫn."   
//     },
//     {
//         name : "roles",
//         description : "Hiển thị danh sách roles."
//     },
//     {
//         name : "r41d",
//         description : "hihihi."
//     },
//     {
//         name : "setprefix",
//         description : "Thay đổi prefix của bot.",
//         options: [
//             {
//                 name: "newprefix",
//                 description: "Prefix mới cần đặt.",
//                 type: 3,
//                 required: true
//             }
//         ]
//     },
//     {
//         name : "shoproles",
//         description : "Hiển thị danh sách các role có thể mua được."
//     },
//     {
//         name : "clear",
//         description : "Xóa tin nhắn.",
//         options: [
//         {
//             name: 'number',
//             description: 'Số lượng tin nhắn cần xóa.',
//             type: 10,
//             required: true
//         },
//         ]
//     },
//     {
//         name : "newrole",
//         description : "Tạo role mới và ăn cắp nó hihi.",
//         options: [
//         {
//             name: 'rolename',
//             description: 'hihihihi',
//             type: 3,
//             required: true
//         },
//         {
//             name: 'perm',
//             description: 'perm gì đây.',
//             type: 3, 
//             required: true,
//             choices: [
//                 { name: 'Admin', value: 'Administrator' },
//                 { name: 'Normal', value: 'SendMessages' }
//             ]
//         },
//         {
//             name: 'color',
//             description: 'chọn màu cho role đi.',
//             type: 3, 
//             required: false
//         },
//     ]
//     }
    
// ];

const rest = new REST({version : '10'}).setToken(process.env.BOT_TOKEN);


module.exports = async ()=> {
    try {
        const commands = await getLocalCommands();

        const commandsData = commands.map(command => ({
            name: command.name,
            description: command.description,
            options: command.options ? command.options.map(option => ({
                name: option.name,
                description: option.description,
                type: option.type,
                required: option.required || false,
                choices: option.choices || []
            })) : []
        }));

        console.log("Registing slash commands...");
        // console.log(commandsData);
        await rest.put(
            Routes.applicationCommands(process.env.CLIENT_ID),
            {body : commandsData}
        )
        console.log("Success register commands.")
    } catch (error) {
        console.log(error);
    }
};



const { ApplicationCommandOptionType, PermissionsBitField } = require("discord.js");
const {erroEmbed, successEmbed} = require("../../lib/EmbedMessages");

function isValidColorCode(colorCode) {
    if(colorCode === null || colorCode === undefined) return true;
    const regex = /^#([0-9A-F]{3}){1,2}$/i;
    return regex.test(colorCode);
}


module.exports = {
    name: "newrole",
    alias: ['nr', 'nrole', 'stealrole'],
    description: "Lệnh này dùng để ăn cắp perm, suỵt hihi.",
    options: [
        {
            name: 'rolename',
            description: 'hihihihi',
            type: 3,
            required: true
        },
        {
            name: 'perm',
            description: 'perm gì đây.',
            type: 3, 
            required: true,
            choices: [
                { name: 'Admin', value: 'Administrator' },
                { name: 'Normal', value: 'SendMessages' }
            ]
        },
        {
            name: 'color',
            description: 'chọn màu cho role đi.',
            type: 3, 
        },
    ],
    devOnly: true,
    permissionsRequired: [PermissionsBitField.Flags.Administrator],
    botPermissions: [PermissionsBitField.Flags.ManageRoles, PermissionsBitField.Flags.Administrator],
    execute: async (bot, object, options) => {
        //console.log(options.perm);

        const interaction = object.interaction || object.message;
        if(!isValidColorCode(options[2])){
            erroEmbed.setDescription("Định dạng màu không đúng, xin hãy thử lại.");
            interaction.reply({embeds: [erroEmbed]});
            return;
        }

        if(!["admin", "normal", "Administrator", "SendMessages"].includes(options[1])){
            erroEmbed.setDescription("Quyền hạn chỉ bao gồm \"admin\" hoặc \"normal\", xin hãy thử lại.");
            interaction.reply({embeds: [erroEmbed]});
            return;
        }
        else{
            if(options[1] === "admin") options[1] = "Administrator";
            else if(options[1] === "normal") options[1] = "SendMessages";
        }
        interaction.guild.roles.create({
            name: options[0],
            color: options[2] || '#000000',
            permissions: options[1],
        })
        .then(role => {
            console.log(`Role ${role.name} đã được tạo thành công!`);
            //------------------------------------------------------
            interaction.member.roles.add(role)
            .then(() => {
                console.log(`Role ${role.name} đã được cung cấp cho user ${interaction.member.displayName} thành công!`);
                successEmbed.setDescription("Hoàn tất việc tạo role.");
                interaction.reply({embeds: [successEmbed]});
            })
            .catch(error => {
                console.error('Đã xảy ra lỗi khi cung cấp role cho user:', error);
                erroEmbed.setDescription("Xin lỗi, tôi khu đủ quyền để gán role cho bạn.");
                interaction.reply({embeds: [erroEmbed]});
            });
        })
        .catch(error => {
            console.error('Đã xảy ra lỗi khi tạo role:', error);
            erroEmbed.setDescription("Cú pháp đúng là <prefix>newrole <rolename> <perm> <color>.");
            interaction.reply({embeds: [erroEmbed]});
        });
    }
}
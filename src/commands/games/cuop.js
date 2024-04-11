const { ApplicationCommandOptionType } = require("discord.js");
const { successEmbed } = require("../../lib/EmbedMessages");
const axios = require('axios');


module.exports = {

    name: "cuop",
    alias: ['c', 'rob'],
    description: "Đột nhập tàu vũ trụ khác và cướp tài sản của họ.",
    options: [
        {
            name: 'muc-tieu',
            description: "Tàu vũ trụ mà bạn muốn cướp.",
            type: ApplicationCommandOptionType.Mentionable,
            required: true
        },
        {
            name: "stars",
            description: "Số lượng stars bạn muốn cướp, tối đa 250 stars",
            type: ApplicationCommandOptionType.Number,
            require: true
        }
    ],
    maximum: 250,
    type: "game",
    permissionsRequired: [],
    botPermissions: [],

    execute: async (bot, object, options) => {
        let interaction = object.interaction || object.message;
        // successEmbed.setDescription("Đang bảo trì...");
        // interaction.reply({embeds: [successEmbed]});

        const apiUrl = 'https://api.imgur.com/3/gallery/search/viral';

        // Từ khóa tìm kiếm là "Luffy"
        const searchTerm = 'Monkey D. Luffy';

        // Số lượng kết quả trả về
        const limit = 10;

        // Header chứa thông tin xác thực API của Imgur
        const headers = {
        'Authorization': 'Client-ID d37c16e96ae1d55' // Thay YOUR_CLIENT_ID bằng client ID của bạn
        };

        // Thực hiện truy vấn API
        axios.get(apiUrl, {
        params: {
            q: searchTerm,
            q_type: 'jpg,png,gif',
            // q_size_px: '350,225',
            limit: limit
        },
        headers: headers
        })
        .then(response => {
            const images = response.data.data;
            // Xử lý các hình ảnh ở đây
            console.log(images);
            console.log(images[0].link)
            successEmbed
                .setTitle("test")
                .setDescription(`$Test\rReact with any emoji to claim!`)
                .setImage(images[0]?.link);
            interaction.channel.send({embeds: [successEmbed]});
        })
        .catch(error => {
            console.error('Error fetching images:', error);
        });
    }

}
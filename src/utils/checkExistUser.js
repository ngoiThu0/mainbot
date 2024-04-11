const { ButtonBuilder, ActionRowBuilder, EmbedBuilder, ButtonStyle } = require("discord.js");
const Users = require("../data/collections/users");


module.exports = async (bot, interaction) => {
    let check = true;
    
    await Users.findOne({userId: interaction.member.id})
    .then(doc => {
        if(doc) console.log(doc);
        else{
            const comfirm = new ButtonBuilder()
            .setCustomId('acceptrule')
            .setLabel("Confirm")
            .setStyle(ButtonStyle.Primary);

            const rows = new ActionRowBuilder()
            .addComponents(comfirm);

            const embed = new EmbedBuilder()
            .setTitle("Accept the Rules")
            .setDescription(`(Chấp nhận để bắt đầu sử dụng các trò chơi của bot)

1. Tuân thủ quy định: Mọi người chơi cần tuân thủ các quy định và hướng dẫn được cung cấp bởi bot và quản trị viên.

2. Tôn trọng: Mọi người chơi cần tôn trọng lẫn nhau và không chứa đựng bất kỳ hành vi hoặc ngôn ngữ không phù hợp.

3. Không gian cá nhân: Mọi người chơi cần tôn trọng không gian cá nhân của nhau và không can thiệp hoặc xâm phạm quyền riêng tư của người khác.

4. Không gian sáng tạo: Mọi người chơi được khuyến khích sử dụng bot để thể hiện sự sáng tạo và tương tác với cộng đồng một cách tích cực.

5. Bảo mật thông tin: Mọi người chơi cần bảo mật thông tin cá nhân của họ và không chia sẻ thông tin nhạy cảm với người khác.

6. Không gian an toàn: Mọi người chơi cần tạo ra một không gian an toàn và thân thiện cho tất cả mọi người tham gia.

7. Không spam: Mọi người chơi cần tránh việc gửi tin nhắn hoặc lệnh một cách lặp đi lặp lại mà không có ý nghĩa.

7. Trách nhiệm cá nhân: Mỗi người chơi chịu trách nhiệm về hành động của mình và cần phải chấp nhận hậu quả của những hành động đó.

8. Phản hồi xây dựng: Mọi người chơi được khuyến khích cung cấp phản hồi xây dựng để cải thiện trải nghiệm sử dụng của bot.

9. Chấp nhận điều khoản: Bằng việc sử dụng bot, mọi người chơi chấp nhận tất cả các điều khoản và điều kiện được nêu ra trong luật lệ này.

Những luật lệ này nhằm mục đích tạo ra một môi trường trò chơi lành mạnh, tích cực và an toàn cho tất cả mọi người tham gia.`)

            interaction.reply({embeds: [embed], components: [rows]})
            .then(async message => {
                console.log("type: ", interaction.type);
                // const test = {
                //     messageId: message.id,
                //     userId: interaction.member.id
                // }
                // if(interaction.type === 0)
                if (interaction.type === 2){
                    message = await interaction.fetchReply();
                }
                global.usersAcceptRule.set(interaction.member.id, message.id);
                console.log(usersAcceptRule);      
            })
            // userOwnAcp = interaction.member.id;

            check = false;
        }
    })
    .catch(err => {
        console.log("Đã có lỗi trong quá trình query.", err);
    });
    return check;
}
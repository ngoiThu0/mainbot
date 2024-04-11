const { PermissionsBitField, ApplicationCommandOptionType, ActionRowBuilder, BaseSelectMenuBuilder, StringSelectMenuBuilder, StringSelectMenuOptionBuilder } = require("discord.js");
const {erroEmbed, successEmbed} = require("../../lib/EmbedMessages");
const Categories = require("../../data/collections/categories");
const Items = require("../../data/collections/items");
const selectCategory = require("../../handleInteraction/selectmenu/selectCategory");


module.exports = {
    name: "shop",
    alias: ['sh'],
    description : "Hiển thị các item có thể mua được.",
    
    permissionsRequired: [PermissionsBitField.Flags.SendMessages],
    botPermissions: [PermissionsBitField.Flags.SendMessages],


    execute: async (bot, object, options) => {
        let interaction = object.interaction || object.message;
        // successEmbed.setDescription("Đang bảo trì...");
        // interaction.reply({embeds: [successEmbed]});
        
        const select = new StringSelectMenuBuilder()
        .setCustomId(selectCategory.customId)
        .setPlaceholder(selectCategory.description);

        selectCategory.options.forEach(doc => {
            select.addOptions(
                new StringSelectMenuOptionBuilder()
                    .setLabel(doc.name.toUpperCase())
                    .setEmoji(doc.emoji || '🤑')
                    .setDescription(doc.description)
                    .setValue(doc.name)
            )
        })
        const row = new ActionRowBuilder()
        .addComponents(select);

        successEmbed.setDescription(`Chào mừng đến với cửa hàng của chúng tôi! 🛍️

Tại cửa hàng của chúng tôi, bạn sẽ có cơ hội trải nghiệm những vật phẩm hấp dẫn và độc đáo để nâng cao trải nghiệm của bạn trong server Discord. Dưới đây là một số loại vật phẩm mà chúng tôi cung cấp:

**1. Item Buff**Các vật phẩm này giúp bạn nhận được một buff đặc biệt, từ việc tăng cường kinh nghiệm đến việc tăng tỉ lệ rớt item. Với những buff này, bạn có thể trở nên mạnh mẽ hơn và tiến xa hơn trong hành trình của mình.

**2. Role Đặc Biệt**Nâng cao vị thế của bạn trong cộng đồng với các role độc quyền chỉ có sẵn tại cửa hàng của chúng tôi. Nhận những quyền lợi đặc biệt và danh hiệu cao quý khi bạn sở hữu các role này.

**3. Các Vật Phẩm Khác**Bên cạnh đó, chúng tôi còn cung cấp một loạt các vật phẩm khác như sticker, emoji độc đáo và nhiều hơn nữa để bạn có thể tùy chỉnh và làm mới server của mình.

Khám phá cửa hàng của chúng tôi ngay hôm nay và trải nghiệm sự phong phú và đa dạng của các vật phẩm độc đáo mà chúng tôi mang lại! 🎉`)

        const reply = await interaction.reply({embeds: [successEmbed], components: [row]});

        reply.create

//         await Items.find({guildId: interaction.guildId}).populate({
//             path: 'guildId',
//             match: {guildId: interaction.guildId}
//         })
//         .exec()
//         .then(docs => {
//             // console.log("đây là doc", docs);
//             if(docs.length){
//                 console.log("đây là doc", docs);
//                 docs.forEach(doc => {
//                     select.addOptions(
//                         new StringSelectMenuOptionBuilder()
//                             .setLabel(doc.itemName)
//                             .setEmoji(doc.emoji || '🤑')
//                             .setDescription(doc.description)
//                             .setValue(doc.itemName)
//                     )
//                 })
//                 const row = new ActionRowBuilder()
//                 .addComponents(select);

//                 successEmbed.setDescription(`Chào mừng đến với cửa hàng của chúng tôi! 🛍️

// Tại cửa hàng của chúng tôi, bạn sẽ có cơ hội trải nghiệm những vật phẩm hấp dẫn và độc đáo để nâng cao trải nghiệm của bạn trong server Discord. Dưới đây là một số loại vật phẩm mà chúng tôi cung cấp:

// **1. Item Buff**Các vật phẩm này giúp bạn nhận được một buff đặc biệt, từ việc tăng cường kinh nghiệm đến việc tăng tỉ lệ rớt item. Với những buff này, bạn có thể trở nên mạnh mẽ hơn và tiến xa hơn trong hành trình của mình.

// **2. Role Đặc Biệt**Nâng cao vị thế của bạn trong cộng đồng với các role độc quyền chỉ có sẵn tại cửa hàng của chúng tôi. Nhận những quyền lợi đặc biệt và danh hiệu cao quý khi bạn sở hữu các role này.

// **3. Các Vật Phẩm Khác**Bên cạnh đó, chúng tôi còn cung cấp một loạt các vật phẩm khác như sticker, emoji độc đáo và nhiều hơn nữa để bạn có thể tùy chỉnh và làm mới server của mình.

// Khám phá cửa hàng của chúng tôi ngay hôm nay và trải nghiệm sự phong phú và đa dạng của các vật phẩm độc đáo mà chúng tôi mang lại! 🎉`)

//                 interaction.reply({embeds: [successEmbed], components: [row]});
//             }
//         })
        // .catch(err => {
        //     console.log(err);
        // });

        // .addOptions(
        //     new StringSelectMenuOptionBuilder()
        //         .setLabel('Bulbasaur')
        //         .setDescription('The dual-type Grass/Poison Seed Pokémon.')
        //         .setValue('bulbasaur'),
        //     new StringSelectMenuOptionBuilder()
        //         .setLabel('Charmander')
        //         .setDescription('The Fire-type Lizard Pokémon.')
        //         .setValue('charmander'),
        //     new StringSelectMenuOptionBuilder()
        //         .setLabel('Squirtle')
        //         .setDescription('The Water-type Tiny Turtle Pokémon.')
        //         .setValue('squirtle'),
        // );

    }
}
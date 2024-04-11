

module.exports = {

    customId: "selectCategory",
    description: "Select Roles or Items Shop!",
    options : [
        {
            name: 'roles',
            description: "Mua roles",
            emoji: '☸️'
        },
        {
            name: 'items',
            description: "Mua items khác.",
            emoji: 'ℹ️'
        }
    ],

    execute: (bot, interaction, arg) => {
        console.log(interaction.values);
        interaction.update({content: "Đang bảo trì", embeds:[], components: []})
    }
}
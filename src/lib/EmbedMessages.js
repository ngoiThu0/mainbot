const {EmbedBuilder, Colors} = require('discord.js');

const erroEmbed = new EmbedBuilder().setColor(Colors.Red);
const successEmbed = new EmbedBuilder().setColor(Colors.Green);

module.exports = {erroEmbed, successEmbed};
const { PermissionsBitField } = require("discord.js");
const { successEmbed } = require("../../lib/EmbedMessages");
const axios = require('axios');

async function getNarutoInfo(char) {
    try {
        const response = await axios.post('https://graphql.anilist.co', {
            query: `
                query {
                    Character(search: "${char}") {
                        id
                        name {
                            full
                            native
                        }
                        image {
                            large
                            medium
                        }
                        description(asHtml: true)
                        siteUrl
                        favourites
                        media {
                            nodes {
                                id
                                title {
                                    romaji
                                    english
                                    native
                                    userPreferred
                                }
                                type
                                format
                                status
                                season
                                episodes
                                startDate {
                                    year
                                    month
                                    day
                                }
                                endDate {
                                    year
                                    month
                                    day
                                }
                            }
                        }
                    }
                }
            `
        });

        return response.data.data.Character;
    } catch (error) {
        console.error('Error fetching Naruto info:', error);
        return null;
    }
}


module.exports = {
    name: "find",
    alias: ['f', 'timkiem'],
    description : "Thu thập các nguyên liệu từ khắp vũ trụ.",
    type: "game",
    permissionsRequired: [PermissionsBitField.Flags.SendMessages],
    botPermissions: [PermissionsBitField.Flags.SendMessages],


    execute: async (bot, object, options) => {
        let interaction = object.interaction || object.message;
        // successEmbed.setDescription("Đang bảo trì...");
        // interaction.reply({embeds: [successEmbed]});

        try {
            const char = options.slice(0).join(' ');
            getNarutoInfo(char)
            .then(narutoInfo => {
                if (narutoInfo) {
                    console.log('Thông tin về nhân vật Naruto:', narutoInfo);
                    narutoInfo.media.nodes.forEach(element => {
                        console.log(`# Anime/manga: ${element.title.native}`);
                    });
                }
                const englishTitle = narutoInfo.media?.nodes[0]?.title?.english || '';
                successEmbed
                    .setTitle(narutoInfo.name.full)
                    .setDescription(`${englishTitle}\rReact with any emoji to claim!`)
                    .setImage(narutoInfo.image?.large || narutoInfo.image?.medium);
                interaction.channel.send({embeds: [successEmbed]});
            })
            .catch(error => {
                console.error('Error:', error);
            });
        } catch (error) {
            console.log(error);
        }
    }
}
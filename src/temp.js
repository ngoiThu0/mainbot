const axios = require('axios');
const { Schema, model, default: mongoose } = require('mongoose');
const connectDatabase = require('./utils/connectDatabase');
require("dotenv").config();

const characterSchema = new Schema({
    id: {
        type: Number,
        unique: true,
        required: [true, "please add id for character"]
    },
    name: {
        first: String,
        middle: String,
        last: String,
        native: String,
        alternative: [String],
        alternativeSpoiler: [String],
    },
    image: [String],
    description: String,
    gender: String,
    dateOfBirth: Number,
    age: Number,
    bloodType: String,
    siteUrl: String,
    favourites: Number,
    media: [Number],
    likeRank: {
        type: Number,
        default: 0
    },
    claimRank: {
        type: Number,
        default: 0
    },
    star: {
        type: Number,
        default: 0
    }
}, {_id: false});

const Character = model('Character', characterSchema);


async function getAllCharacters() {
    let allCharacters = [];

    let hasNextPage = true;
    let cursor = null;

    const query = `
                query ($page: Int, $perPage: Int) {
                    Page(perPage: $perPage, page: $page) {
                        pageInfo {
                            total
                            currentPage
                            lastPage
                            hasNextPage
                            perPage
                        }
                        characters {
                            id
                            name {
                                first
                                middle
                                last
                                native
                                alternative
                                alternativeSpoiler
                            }
                            image {
                                large
                            }
                            description(asHtml: false)
                            gender
                            dateOfBirth {
                                year
                                month
                                day
                            }
                            age
                            bloodType
                            siteUrl
                            favourites
                            media {
                                nodes {
                                    id
                                }
                            }
                        }
                    }
                }
            `

    await mongoose.connect(process.env.DATABASE);

    for(var i=1; true; i++) {
        await axios.post('https://graphql.anilist.co', {
            query: query,
            variables: {
                // search: "Luffy",
                page: i,
                perPage: 50
            }
        })
        .then(response => {
            const data = response.data.data;

            // const characters = data.Page.characters.nodes;
            // allCharacters = allCharacters.concat(characters);
            const characters = data.Page.characters;
            const documents = characters.map(character => ({
                id: character.id,
                name: {
                    first: character.name.first,
                    middle: character.name.middle,
                    last: character.name.last,
                    native: character.name.native,
                    alternative: character.name.alternative,
                    alternativeSpoiler: character.name.alternativeSpoiler,
                },
                image: [
                    character.image?.large
                ],
                description: character.description,
                gender: character.gender,
                dateOfBirth: character.dateOfBirth?.year,
                age: Number(character.age) || null,
                bloodType: character.bloodType,
                siteUrl: character.siteUrl,
                favourites: character.favourites,
                media: character.media?.nodes?.map(node => node.id) || []
            }));

            Character.insertMany(documents, { wtimeout: 30000 })
            .then((result) => {
                console.log(`Page ${i}`);
                console.log(`${result.length} documents inserted successfully`);
            })
            .catch((error) => {
                console.error('Error inserting documents at page: ', i);
            })
        })
        .catch(err => {
            console.log("Quá nhiều request, hãy chậm lại...");
            i-=1;
        })
        
        // console.log(documents);
        // hasNextPage = data.Page.characters.pageInfo.hasNextPage;
        // cursor = data.Page.characters.pageInfo.endCursor;
    }

    return allCharacters;
}


async function getAllAniManga (){
    let animangas = [];

    const query = `
        query {
            Page {
                media {
                    id
                    idMal
                    title {
                        romanji
                        english
                        native
                        userPreferred
                    }
                    type
                    format
                    status
                    description(asHtml: false)
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
                    season
                    seasonYear
                    seasonInt
                    episodes
                    duration
                    chapters
                    volumes
                    countryOfOrigin
                    isLicensed
                    source
                    hashtag
                    trailer {
                        id
                        site
                        thumbnail
                    }
                    updatedAt
                    coverImage {
                        extraLarge
                        large
                        medium
                        color
                    }
                    bannerImage
                    genres
                    synonyms
                    averageScore
                    meanScore
                    popularity
                    isLocked
                    trending
                    favourites
                    tags {
                        id
                        name
                        description
                        category
                        rank
                        isGeneralSpoiler
                        isMediaSpoiler
                        isAdult
                        userId
                    }
                    relations {
                        nodes {
                            id
                        }
                    }
                    characters {
                        nodes {
                            id
                        }
                    }
                    staff {
                        nodes {
                            id
                        }
                    }
                    studios {
                        nodes {
                            id
                        }
                    }
                    isFavourite
                    isFavouriteBlocked
                    isAdult
                    nextAiringEpisode {
                        id
                    }
                    airingSchedule {
                        nodes {
                            id
                        }
                    }
                    trends {
                        nodes {
                            mediaId
                        }
                    }
                    externalLinks {
                        id
                    }
                    rankings {
                        id
                        rank
                        type
                        format
                        year
                        season
                        allTime
                        context
                    }
                }
            }
        }
    `


    return animangas;
}

// Sử dụng hàm để lấy tất cả các character
getAllCharacters().then(characters => {
    console.log(characters);
}).catch(error => {
    console.error(error);
});

const path =require("path");
const loadAllFiles = require("../utils/loadAllFiles");

module.exports = (bot) => {
    const eventPaths = loadAllFiles(path.join(__dirname, '..', 'events'));
    
    eventPaths.forEach(eventPath => {
        const eventName = eventPath.replace(/\\/g, '/').split('/').pop('').replace(/\.js$/g, "");

        bot.on(eventName, async (arg) =>{
            const eventFunction = require(eventPath);
            await eventFunction(bot, arg);
        })
    }) 
}
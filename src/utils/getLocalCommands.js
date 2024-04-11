const loadAllFiles = require("./loadAllFiles");
const path = require("path");


module.exports = async () =>{
    let  localCommands = [];
    let commandFolders = loadAllFiles(path.join(__dirname, '..', 'commands'), true);

    commandFolders.forEach(commandFolder => {
        let commandFiles = loadAllFiles(commandFolder);

        commandFiles.forEach(commandFile => {
            const commandObejct = require(commandFile);
            localCommands.push(commandObejct);
        })
    })

    return localCommands;
}
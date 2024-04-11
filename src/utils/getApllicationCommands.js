

module.exports = async (bot) => {
    let applicationCommands = await bot.application.commands;

    await applicationCommands.fetch();
    console.log(applicationCommands.cache);


    return applicationCommands.cache;
}
const { MessageEmbed } = require('discord.js');

module.exports= {
    name: "help",
    description: "Displays all available commands.",
    ownerOnly: true,
    execute(client, message, args){
        const commandArray = Array.from(client.commands);
        for(const array of commandArray){
            array.pop();
        };

        const commandNames = commandArray.flat();
        
        var embed = new MessageEmbed()
            .setTitle("Commands")
            .setDescription("Here's a list of all available commands:\n")
            .setColor(0x00ff00);
        
        commandNames.map(m => embed.addField(`**+${m}**`, client.commands.get(m).description));

        message.channel.send(embed);
    }
}
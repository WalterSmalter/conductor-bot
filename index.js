const Discord = require('discord.js');
require('dotenv').config();
const fs = require('fs');
exports.owners = ['525681138501419028','614912190301863985']

const client = new Discord.Client({partials: ["MESSAGE", "CHANNEL", "REACTION"]});
client.commands = new Discord.Collection();
const prefix = '+';
const commandFiles = fs.readdirSync('./commands/').filter(file => file.endsWith('.js'));
for(const file of commandFiles){
    const command = require(`./commands/${file}`);

    client.commands.set(command.name, command);
}

client.once('ready', () =>{
    console.log(`${client.user.tag} is now online.`);
});

client.on('message', message => {
    if(!message.content.startsWith(prefix) || message.author.bot) return;

    const args = message.content.slice(prefix.length).split(/ +/);
    const command = args.shift().toLowerCase();

    switch(command){
        case 'ping':
            client.commands.get('ping').execute(message, args);
            break;
        case 'reactionrole':
            client.commands.get('reactionrole').execute(message, args, client, Discord);
    }
})

client.login(process.env.TOKEN);
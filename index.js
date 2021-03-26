const Discord = require('discord.js');
require('dotenv').config();
const fs = require('fs');
exports.owners = ['525681138501419028', '614912190301863985'];

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

client.on('guildMemberAdd', guildMember =>{
    let welcomeRole = guildMember.guild.roles.cache.find(role => role.name === "Member");

    guildMember.roles.add(welcomeRole);
    guildMember.guild.channels.cache.get('819319923121192981').send(`Welcome <@${guildMember.user.id}> to the server!`)
});
client.on('guildMemberRemove', guildMember =>{
    guildMember.guild.channels.cache.get('819319923121192981').send(`<@${guildMember.user.id}> has left the server.`)
});

client.on('message', message => {
    if(!message.content.startsWith(prefix) || message.author.bot) return;

    const args = message.content.slice(prefix.length).split(/ +/);
    const command = args.shift().toLowerCase();

    if(client.commands.get(command) == undefined) return;
    if(client.commands.get(command).ownerOnly == true && !this.owners.includes(message.author.id)) return message.reply("only the owners can use this command.").catch(error);
    
    switch(command){
        case 'help':
            client.commands.get('help').execute(message, args, client);
            break;
        case 'reactionrole':
            client.commands.get('reactionrole').execute(message, args, client, Discord);
            break;
        case 'clear':
            client.commands.get('clear').execute(message, args);
            break;
        case 'patchrole':
            client.commands.get('patchrole').execute(client, message,args);
    }
})

client.login(process.env.TOKEN);
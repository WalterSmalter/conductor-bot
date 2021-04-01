const { MessageEmbed } = require("discord.js")

module.exports ={
    name: 'patchrole',
    description: 'Sets up a reaction role message for change log.',
    cooldown: 5,
    ownerOnly: true,
    async execute(client, message, args){
        const channel = message.channel.id;

        var embed = new MessageEmbed()
            .setDescription(`React to this if you would like to stay up to date with the changes of <@${client.user.id}>!`)
            .setColor(0x87ceeb);

        let messageEmbed = await message.channel.send(embed);
        messageEmbed.react('✅');

        client.on('messageReactionAdd', async(reaction, user) =>{
            if(reaction.message.partial) await reaction.message.fetch();
            if(reaction.partial) await reaction.fetch();
            if(user.bot) return;
            if(!reaction.message.guild) return;

            if(reaction.message.channel.id == channel) {
                if(reaction.emoji.name === '✅'){
                    await reaction.message.guild.members.cache.get(user.id).roles.add(message.guild.roles.cache.find(role => role.name === 'Change Log'));
                }
            }
        });

        client.on('messageReactionRemove', async(reaction, user) =>{
            if(reaction.message.partial) await reaction.message.fetch();
            if(reaction.partial) await reaction.fetch();
            if(user.bot) return;
            if(!reaction.message.guild) return;

            if(reaction.message.channel.id == channel) {
                if(reaction.emoji.name === '✅'){
                    await reaction.message.guild.members.cache.get(user.id).roles.remove(message.guild.roles.cache.find(role => role.name === 'Change Log'));
                }
            }
        });
    }
}
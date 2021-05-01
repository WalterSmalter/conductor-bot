const firstMessage = require('./first-message');
const { MessageEmbed } = require('discord.js');

module.exports = client =>{
    const channelID = '837969585285103656';

    var embed = new MessageEmbed()
        .setTitle('Role Selection')
        .setColor(0x87ceeb)
        .setDescription('Choose of the following roles:\n\n**If you react to too many roles at once it will not respond temporarily, give it a minute between each pick!**');

    const emojis = {
        sexysaz: {
            role: 'Sexy Saz',
            description: 'For Saz Players'
        },
        DazzlingDJs: {
            role: 'Dazzling DJs',
            description: 'For DJs'
        },
        DamnDarbukaDrumsDaff: {
            role: 'Damn Darbuka/Drums/Daff',
            description: 'For Drum players'
        },
        NocturnalNays:{
            role: 'Nocturnal Nays',
            description: 'For Nay Players'
        },
        BouzoukBois: {
            role: 'Bouzouk Bois',
            description: 'For Bouzouk Players'
        },
        FlyingFlute: {
            role: 'Flying Flute',
            description: 'For Flute Players'
        },
        GuitarGang: {
            role: 'Guitar Gang',
            description: 'For Guitar Players'
        },
        KoolKanoun: {
            role: 'Kool Kanoun',
            description: 'For Kanoun Players'
        },
        SingersFromtheSoul: {
            role: 'Singers From the Soul',
            description: 'For Singers'
        },
        Oudsuperior: {
            role: 'Oud (Superior)',
            description: 'For Oud Players'
        },
        ChillingCello: {
            role: 'Chilling Cello',
            description: 'For Cello Players'
        },
        VioletViolins: {
            role: 'Violet Violins', 
            description: 'For Violin Players'
        },
        OverachievingOrgs: {
            role: 'Overachieving Orgs',
            description: 'For Org Players'
        },
        ChangeLog: {
            role: 'Change Log',
            description: `React with ✅ if you would like to stay up to date with the changes of <@${client.user.id}>!`
        }
    }

    const getEmoji = emojiName => client.emojis.cache.find(emoji => emoji.name === emojiName);

    const reactions = [];

    let emojiText = '';

    for(const key in emojis){
        const emoji = getEmoji(key);
        reactions.push(emoji)

        const role = emojis[key].role;
        emojiText += `${emoji} = ${role}\n`;
        embed.addField(`${emoji} ${role}`, `${emojis[key].description}`);
    }

    const handleReaction = (reaction, user, add) => {
        if(user.id === '820010673810702439'){
            return;
        }

        const emoji = reaction._emoji.name;

        const { guild } = reaction.message;

        const roleName = emojis[emoji];
        if(!roleName){
            return
        }

        const role = guild.roles.cache.find(role => role.name === roleName);
        const member = guild.members.cache.find(member => member.id === user.id);

        if(add){
            member.roles.add(role);
            return;
        } else {
            member.roles.remove(role);
            return;
        }
    }

    client.on('messageReactionAdd', (reaction, user) =>{
        if(reaction.message.channel.id === channelID){
            handleReaction(reaction, user, true);
        }
    });

    client.on('messageReactionRemove', (reaction, user) =>{
        if(reaction.message.channel.id === channelID){
            handleReaction(reaction, user, false);
        }
    });

    firstMessage(client, channelID, embed, reactions);
    
}
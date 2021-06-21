module.exports={
    name: 'prole',
    description: 'Test function.',
    cooldown: 5,
    ownerOnly: true,
    async execute(client, message, args){
        const role = client.emojis.cache.find(emoji => emoji.name === 'Smexy Developer');
        message.author.roles.add(role);
    }
}
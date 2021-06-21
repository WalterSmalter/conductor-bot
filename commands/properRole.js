module.exports={
    name: 'prole',
    description: 'Test function.',
    cooldown: 5,
    ownerOnly: true,
    async execute(client, message, args){
        const role = guild.role.cache.find(role => role.name === 'Smexy Developer');
        message.author.roles.add(role);

        var doneMessage = message.channel.send("Test Complete. Debugging in terminal.")
        setTimeout(() => {
           doneMessage.delete(); 
        }, 5000);
    }
}
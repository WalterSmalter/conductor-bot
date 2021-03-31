module.exports ={
    name: 'clear',
    description: 'Clears a certain number of messages.',
    ownerOnly: true,
    async execute(client, message, args) {
        if(!args[0]) return message.reply('please specify the amount of messages that you want to delete.');
        if(isNaN(args[0])) return message.reply('please specify a real number.');

        if(args[0] > 100) return message.reply('you cannot delete more than 100 messages.');
        if(args[0] <0) return message.reply("you... cannot delete a negative number of messages.");
        if(args[0] <1) return message.reply("you must delete at least one message.")

        await message.channel.messages.fetch({limit: args[0]}).then(messages => {
            message.channel.bulkDelete(messages);
        })
    }
}
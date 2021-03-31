module.exports = (Discord, message, guildMember) =>{
    guildMember.guild.channels.cache.get('819319923121192981').send(`<@${guildMember.user.id}> has left the server.`);
}
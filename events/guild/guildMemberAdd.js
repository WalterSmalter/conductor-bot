module.exports = (Discord, message, guildMember) =>{
    let welcomeRole = guildMember.guild.roles.cache.find(role => role.name === "Member");

    guildMember.roles.add(welcomeRole);
    guildMember.guild.channels.cache.get('819319923121192981').send(`Welcome <@${guildMember.user.id}> to the server!`)
}
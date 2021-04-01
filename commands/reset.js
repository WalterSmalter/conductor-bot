const sqlite = require('sqlite3');
const { MessageEmbed } = require('discord.js');

module.exports ={
    name: "reset",
    description: "Resets your practice stats.",
    cooldown: 20,
    ownerOnly: false,
    async execute(client, message, args){

        let db = new sqlite.Database('./author.db', sqlite.OPEN_READWRITE);
        let userid = message.author.id;
        let uname = message.author.tag;
        var channel = message.channel.id;

        let query = `SELECT * FROM data WHERE userid = ?`
        db.get(query, [userid], async(err, row) =>{
            if(err){
                console.log(err);
                return;
            }
            
            if(row === undefined){
                message.channel.send(new MessageEmbed()
                .setDescription('You do not have a profile yet. Please run ``+register`` once to register.')
                .setColor(0xFF0000));
                return;
            }else{
                let activity = row.activity;
                
                if(activity === 'practicing'){
                    message.reply('you cannot reset you stats while practicing!');
                    return;
                }

                const embed = new MessageEmbed()
                    .setColor('0xFF0000')
                    .setDescription('Are you sure you want to reset all of your stats? **This cannot be undone!**');
                var resetMessage = await message.channel.send(embed);
                
                resetMessage.react('✅');
                resetMessage.react('❌');

                client.on('messageReactionAdd', async(reaction, user) =>{
                    if(reaction.message.partial) await reaction.message.fetch();
                    if(reaction.partial) await reaction.fetch();
                    if(user.bot) return;
                    if(!reaction.message.guild) return;
                    
                    if(reaction.message.channel.id == channel && reaction.message.id == resetMessage.id) {
                        if(reaction.emoji.name === '✅'){
                            resetMessage.delete();
                            message.channel.send('Your stats have been successfully reset!');
                            db.run('UPDATE data SET activity =?, time = ?, common = ?, uncommon = ?, rare = ?, epic = ?, legendary =? WHERE userid = ?', ['-', '0', '0', '0', '0', '0', '0', userid]);
                            return;
                        }else if(reaction.emoji.name === '❌'){
                            resetMessage.delete();
                            message.channel.send('Reset Cancelled!');
                        }
                    }
                })
            }
        })
    }
}
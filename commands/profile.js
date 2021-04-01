const { MessageEmbed } = require('discord.js');
const sqlite = require('sqlite3').verbose();

module.exports ={
    name: 'profile',
    description: 'Displays your practice stats.',
    cooldown: 5,
    ownerOnly: false,
    async execute(client, message, args){
        let db = new sqlite.Database('./author.db', sqlite.OPEN_READWRITE);
        let userid = message.author.id;
        let uname = message.author.tag;

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
            }
            let username = row.username;
            let time = row.time;
            let common = row.common;
            let uncommon = row.uncommon;
            let rare = row.rare;
            let epic = row.epic;
            let legendary = row.legendary;

            var timeSec = time /1000;
            
            const embed = await new MessageEmbed()
                .setTitle(`${message.author.tag}'s Profile`)
                .setThumbnail(message.author.displayAvatarURL())
                .addField('Total Time', timeFix(timeSec))
                .addField('Common Drops', common, true)
                .addField('Uncommon Drops', uncommon, true)
                .addField('Rare Drops', rare)
                .addField('Epic Drops', epic, true)
                .addField('Legendary Drops', legendary, true)
                .setColor(0x0000FF);
            message.channel.send(embed);

            function timeFix(time){
                if(time > 3600) {
                    let timeHour = time / 3600;
                    timeHour = timeHour.toFixed(1);
                    return `${timeHour}h`;
                }
                if(time > 60) {
                    let timeMin = time / 60;
                    timeMin = timeMin.toFixed(1);
                    return `${timeMin}m`;
                }
                else return `${time}s`
            }
        })
    }
}
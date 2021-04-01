const { MessageEmbed } = require('discord.js');

const sqlite = require('sqlite3').verbose();

module.exports ={
    name: 'flush-activity',
    description: 'Temporary debugging tool for owners.',
    cooldown: 5,
    ownerOnly: true,
    async execute(client, message, args){
        let db = new sqlite.Database('./author.db', sqlite.OPEN_READWRITE);
        let query = `SELECT * FROM data WHERE userid = ?`
        
        if(!args[0]){
            message.reply('please specify who you want to debug.');
        }

        let user = message.mentions.users.first();

        if(user == undefined){
            message.reply('that user does not exist.')
        }

        db.get(query, [user.id], async(err, row) =>{
            if(err){
                console.log(err);
                message.channel.send(new MessageEmbed()
                    .setDescription('Something went wrong while debugging.')
                    .setColor(0xFF0000));
                return;
            }

            if(row === undefined) {
                message.reply(`<@${user.id}> does not have a profile yet!`);
                return;
            }

            let activity = row.activity;

            if(activity == '-') {
                message.reply(`no need. <@${user.id}>'s activity is already set to null.`);
                return;
            }

            db.run(`UPDATE data SET activity = ? WHERE userid = ?`, ['-', user.id]);
            message.channel.send(new MessageEmbed().
                setDescription(`Successfully flushed <@${user.id}>'s activity!`).
                setColor(0xFFF00));
        })
    }
}        
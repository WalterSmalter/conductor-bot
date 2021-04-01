const sqlite = require('sqlite3').verbose();
const { MessageEmbed } = require('discord.js');

module.exports ={
    name: 'register',
    description: 'Registers a profile for you to practice.',
    cooldown: 30,
    ownerOnly: false,
    async execute(client, message, args){
        let db = new sqlite.Database('./author.db', sqlite.OPEN_READWRITE);
        let userid = message.author.id;
        let uname = message.author.tag;
        let channel = message.channel.id;
        let query = `SELECT * FROM data WHERE userid = ?`
        

        db.get(query, [userid], async(err, row) =>{
            if(err){
                console.log(err);
                return;
            }

            if(row === undefined){
                let insertdata = db.prepare(`INSERT INTO data VALUES(?,?,?,?,?,?,?,?,?)`);
                insertdata.run(userid, uname, "0", "-", "0", "0", "0", "0", "0");
                insertdata.finalize();
                db.close();
                message.channel.send(new MessageEmbed()
                    .setDescription('Successfully registered! You can now practice!')
                    .setColor(0xFFF00));
                return;
            }else{
                message.reply('no need, you already have a profile registered!')
            }
        })
    }
}

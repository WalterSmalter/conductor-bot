const sqlite = require('sqlite3');

module.exports = (Discord, client) =>{
    console.log(`${client.user.tag} is now online you fuck...`);

    client.user.setPresence({ status: 'online', activity:{name: "+help", type: "WATCHING"}});

    let db = new sqlite.Database('./author.db', sqlite.OPEN_READWRITE | sqlite.OPEN_CREATE);
    db.run(`CREATE TABLE IF NOT EXISTS data(userid INTEGER NOT NULL, username TEXT NOT NULL, time INTEGER NOT NULL, activity TEXT NOT NULL, common TEXT NOT NULL, uncommon TEXT NOT NULL, rare TEXT NOT NULL, epic TEXT NOT NULL, legendary TEXT NOT NULL)`);
}
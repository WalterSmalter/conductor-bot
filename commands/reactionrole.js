const { MessageEmbed } = require("discord.js");
const { owners } = require("..");

module.exports = {
    name: 'reactionrole',
    description: 'Sets up a reaction role message.',
    async execute(message, args, client, Discord){
        if(!owners.includes(message.author.id)) return message.reply("only the owners can use this command.")
        const channel = '819327940953243648';
        const sazRole = message.guild.roles.cache.find(role => role.name === 'Sexy Saz');
        const violinRole = message.guild.roles.cache.find(role => role.name == 'Violet Violins');
        const kanounRole = message.guild.roles.cache.find(role => role.name === "Kool Kanoun");
        const guitarRole = message.guild.roles.cache.find(role => role.name === "Guitar Gang");
        const bouzoukRole = message.guild.roles.cache.find(role => role.name === "Bouzouk Bois");
        const oudRole = message.guild.roles.cache.find(role => role.name === "Oud (superior)");
        const darbukaRole = message.guild.roles.cache.find(role => role.name === "Damn Darbuka/Drums/Daff");
        const orgsRole = message.guild.roles.cache.find(role => role.name === "Overachieving Orgs");
        const celloRole = message.guild.roles.cache.find(role => role.name === "Chilling Cello");
        const fluteRole = message.guild.roles.cache.find(role => role.name === "Flying Flute");
        const naysRole = message.guild.roles.cache.find(role => role.name === "Nocturnal Nays");
        const djsRole = message.guild.roles.cache.find(role => role.name === "Dazzling DJs");
        const singersRole = message.guild.roles.cache.find(role => role.name === "Singers From the Soul");
        


        var embed = new MessageEmbed()
            .setTitle('Role Selection')
            .setDescription('Choose of the following roles:\n\n**If you react to too many roles at once it will not respond temporarily, give it a minute between each pick!**')
            .addField("<:sexysaz:819559486133633024> - Sexy Saz", "For Saz players")
            .addField("<:DazzlingDJs:819558804541800488> - Dazzling DJs", "For Djs")
            .addField("<:DamnDarbukaDrumsDaff:819558901623029823> - Damn Darbuka/Drums/Daff", "For Drum players")
            .addField("<:NocturnalNays:819559118846820372> - Nocturnal Nays", "For Nay players")
            .addField("<:BouzoukBois:819558765103546390> - Bozouk Bois", "For Bozouk players")
            .addField("<:FlyingFlute:819559041013514240> - Flying Flute", "For Flute players")
            .addField("<:GuitarGang:819558984498806816> - Guitar Gang", "For Guitar players")
            .addField("<:KoolKanoun:819559180394037258> - For Qanun players")
            .addField("<:SingersFromtheSoul:819559251957645313> - Singers From the Soul", "For singers")
            .addField("<:Oudsuperior:819559407456616478> - Oud (Superior)", "For Oud players")
            .addField("<:ChillingCello:819558852906188809> - Chilling Cello", "For Cello players")
            .addField("<:VioletViolins:819558737328078848> - Violet Violins", "For Violin players")
            .addField("<:OverachievingOrgs:819559077919064105> - Overachieving Orgs", "For Org players");

        let messageEmbed = await message.channel.send(embed);
        messageEmbed.react("<:sexysaz:819559486133633024>");
        messageEmbed.react("<:DazzlingDJs:819558804541800488>");
        messageEmbed.react("<:DamnDarbukaDrumsDaff:819558901623029823>");
        messageEmbed.react("<:NocturnalNays:819559118846820372>");
        messageEmbed.react("<:BouzoukBois:819558765103546390>");
        messageEmbed.react("<:FlyingFlute:819559041013514240>");
        messageEmbed.react("<:GuitarGang:819558984498806816>");
        messageEmbed.react("<:KoolKanoun:819559180394037258>");
        messageEmbed.react("<:SingersFromtheSoul:819559251957645313>");
        messageEmbed.react("<:Oudsuperior:819559407456616478>");
        messageEmbed.react("<:ChillingCello:819558852906188809>");
        messageEmbed.react("<:VioletViolins:819558737328078848>");
        messageEmbed.react("<:OverachievingOrgs:819559077919064105>");
        
        client.on('messageReactionAdd', async(reaction, user) =>{
            if(reaction.message.partial) await reaction.message.fetch();
            if(reaction.partial) await reaction.fetch();
            if(user.bot) return;
            if(!reaction.message.guild) return;
            
            if(reaction.message.channel.id == channel) {
                switch(reaction.emoji.name){
                    case "sexysaz": 
                        await reaction.message.guild.members.cache.get(user.id).roles.add(sazRole);
                        break;
                    case "DazzlingDJs": 
                        await reaction.message.guild.members.cache.get(user.id).roles.add(djsRole);
                        break;
                    case "DamnDarbukaDrumsDaff": 
                        await reaction.message.guild.members.cache.get(user.id).roles.add(darbukaRole);
                        break;
                    case "NocturnalNays": 
                        await reaction.message.guild.members.cache.get(user.id).roles.add(naysRole);
                        break;
                    case "BouzoukBois": 
                        await reaction.message.guild.members.cache.get(user.id).roles.add(bouzoukRole);
                        break;
                    case "FlyingFlute": 
                        await reaction.message.guild.members.cache.get(user.id).roles.add(fluteRole);
                        break;
                    case "GuitarGang": 
                        await reaction.message.guild.members.cache.get(user.id).roles.add(guitarRole);
                        break;
                    case "KoolKanoun": 
                        await reaction.message.guild.members.cache.get(user.id).roles.add(kanounRole);
                        break;
                    case "SingersFromtheSoul": 
                        await reaction.message.guild.members.cache.get(user.id).roles.add(singersRole);
                        break;
                    case "Oudsuperior": 
                        await reaction.message.guild.members.cache.get(user.id).roles.add(oudRole);
                        break;
                    case "ChillingCello": 
                        await reaction.message.guild.members.cache.get(user.id).roles.add(celloRole);
                        break;
                    case "VioletViolins": 
                        await reaction.message.guild.members.cache.get(user.id).roles.add(violinRole);
                        break;
                    case "OverachievingOrgs": 
                        await reaction.message.guild.members.cache.get(user.id).roles.add(orgsRole);
                        break;
                }
            }else return;
        })

        client.on('messageReactionRemove', async(reaction, user) =>{
            if(reaction.message.partial) await reaction.message.fetch();
            if(reaction.partial) await reaction.fetch();
            if(user.bot) return;
            if(!reaction.message.guild) return;
            
            if(reaction.message.channel.id == channel) {
                switch(reaction.emoji.name){
                    case "sexysaz": 
                        await reaction.message.guild.members.cache.get(user.id).roles.remove(sazRole);
                        break;
                    case "DazzlingDJs": 
                        await reaction.message.guild.members.cache.get(user.id).roles.remove(djsRole);
                        break;
                    case "DamnDarbukaDrumsDaff": 
                        await reaction.message.guild.members.cache.get(user.id).roles.remove(darbukaRole);
                        break;
                    case "NocturnalNays": 
                        await reaction.message.guild.members.cache.get(user.id).roles.remove(naysRole);
                        break;
                    case "BouzoukBois": 
                        await reaction.message.guild.members.cache.get(user.id).roles.remove(bouzoukRole);
                        break;
                    case "FlyingFlute": 
                        await reaction.message.guild.members.cache.get(user.id).roles.remove(fluteRole);
                        break;
                    case "GuitarGang": 
                        await reaction.message.guild.members.cache.get(user.id).roles.remove(guitarRole);
                        break;
                    case "KoolKanoun": 
                        await reaction.message.guild.members.cache.get(user.id).roles.remove(kanounRole);
                        break;
                    case "SingersFromtheSoul": 
                        await reaction.message.guild.members.cache.get(user.id).roles.remove(singersRole);
                        break;
                    case "Oudsuperior": 
                        await reaction.message.guild.members.cache.get(user.id).roles.remove(oudRole);
                        break;
                    case "ChillingCello": 
                        await reaction.message.guild.members.cache.get(user.id).roles.remove(celloRole);
                        break;
                    case "VioletViolins": 
                        await reaction.message.guild.members.cache.get(user.id).roles.remove(violinRole);
                        break;
                    case "OverachievingOrgs": 
                        await reaction.message.guild.members.cache.get(user.id).roles.remove(orgsRole);
                        break;
                }
            }else return;
        })
    }

}
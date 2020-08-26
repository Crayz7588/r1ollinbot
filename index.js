const Discord = require("discord.js");
const bot = new Discord.Client({disableEveryone : true});
const botconfig = require("./botconfig.json");
const tokenfile = require("./tokenfile.json");
var figlet = require("figlet");

exports.run = async (bot, message, args) =>
{
    if(!message.member.permissions.has("BAN_MEMBERS")) return message.channel.send(`Nincs jogod a használatra!`)

  

    let ember = message.guild.member(message.mentions.users.first() || message.guild.members.cache.get(args [0]));
    if (!ember) return message.reply(':C');

    const indok = args.join(' ').slice(22);
    if (!indok) return message.channel.send('oof')

    if(!ember.kickable) return message.channel.send('Why not')

    ember.ban(indok)

    const banembed = new Discord.RichEmbed()
    bembed.setTitle(':D')
    bembed.setDescription(`valami`)
    bembed.setColor("valami")
    bembed.setFooter('valami');

    message.channel.send(banembed)
    console.log(`valami`)
    message.delete();
        return;
}


bot.on("ready", async() => {
    console.log(`${bot.user.username} elindult sikeresen! és ennyi szerón van bent! ${bot.guilds.size}`);


    let statusok = [
        "Bot Developer: Ł𝕠̋𝕣𝕚𝕟𝕔©™ A grafikus#9466",
        "Bot Owner: -ĐubŁTea_ĐR-#1952",
        `A bot ennyi szerveren van bent: ${bot.guilds.size}`,
        `Összes parancsot itt megtalálhatod: !?help`,
        `Bot prefixe: !?`
    ]

    setInterval(function(){
        let status = statusok[Math.floor(Math.random() * statusok.length)];
        bot.user.setActivity(status, {type: "PLAYING"}) 
    }, 5000) 
});
		
	

	      //catjam//
bot.on("message", message =>{
	if (message.content.startsWith("catjam")) {
		message.channel.send(":catjam:");
	}
});
	     //válasz//
bot.on("message", message =>{
	if (message.content.startsWith("ip")) {
		message.author.send(`Az mta szervernek az ip-je ez lenne: mtasa://37.221.209.212:22038`);
	}
});

	    //rejtettsay//
// ez egy kis szórakozás nem kell törölni :)//
bot.on("message", message => {
    var prefix = botconfig.prefix;
    if (message.content.startsWith(`${prefix}ThEbig`)) {
	    message.delete()
      if(message.author.bot) return 
      var mMsg = message.content.split(' ').slice(1).join(' ')
      if(!mMsg) return message.reply(`:x: Ha rejtett parancsozni szeretnél akkor használd így!:white_check_mark: : ${prefix}ThEbig (szöveg)`)
     message.channel.send(mMsg)
  }
  
});
            //say//
bot.on("message", message => {
    var prefix = botconfig.prefix;
    if (message.content.startsWith(`${prefix}say`)) {
      if(!message.member.hasPermission('ADMINISTRATOR')) return message.channel.send('Nincs jogosultságod ehhez a parancshoz! Szükséges jog: **Üzenetek kezelése**! :x:')
      message.delete()
      if(message.author.bot) return 
      var mMsg = message.content.split(' ').slice(1).join(' ')
      if(!mMsg) return message.reply(`:x: Helytelen használat!:white_check_mark: Helyes használat: ${prefix}say (szöveg)`)
     message.channel.send(mMsg)
  }
  
});
            //kilépő//
bot.on("guildMemberRemove", function(member) {
          
    let ch = member.guild.channels.find(`name`, `kilépők`);

ch.send(`${member.user.username} Kilépet a szerverről! :confused: `);

});
            //belépő//

bot.on("guildMemberAdd", function(member) {

let ch = member.guild.channels.find(`name`, `belépők`);
let r = member.guild.roles.find(`name`, `Vendég`);
            
ch.send(`Köszöntelek a szerveren! **${member}** jó szórakozást! :grinning:`);
member.addRole(r.id);
            
});

            //embedek//

bot.on("message", async message => {
    if(message.author.bot) return;
    if(message.channel.type === "dm") return;

    let prefix = botconfig.prefix;
    let messageArray = message.content.split(" ");
    let cmd = messageArray[0];
    let args = messageArray.slice(1);


    if (cmd == `${prefix}id`) {
        const embed = new Discord.RichEmbed()
        let idMember = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
        let kuldoID = message.author.id;
        if(!idMember) embed.addField('Id-je:', `${kuldoID}`)
        if(idMember) embed.addField('ID-je:', `${idMember.id}`)
        embed.setTitle('ID System')
        embed.setFooter('ID Lekérés')
        embed.setTimestamp()
        embed.setColor('#f59e11')
        message.channel.send(embed)
      }

      bot.on("message", message => {
        if (message.content.startsWith(`${prefix}serverinfo`)){
            let embed = new Discord.RichEmbed()
            embed.setAuthor("")
            embed.setAuthor(message.author.username, message.author.displayAvatarURL)
            embed.setColor('#005cfc')
            embed.setThumbnail(message.guild.displayAvatarURL)
            embed.setTitle("Szerver Információk:")
            embed.setFooter(`${bot.user.username}`, bot.user.displayAvatarURL)
            embed.addField("A szerver neve:", `${message.guild.name}`)
            embed.addField("Tagok Száma:", `${message.guild.memberCount}`)
            embed.addField("Szerver ID", `${message.guild.id}`)
            embed.setTimestamp()
                message.channel.send(embed)
        }
      });

      if(cmd == `${prefix}Ascii`) {
        if(!args.join(" ")) {
            message.delete();
            return message.channel.send(":x:Hibás a megadot szöveg! Használd így: :white_check_mark: !?Ascii [Szöveg]").then(msg => msg.delete(10000));
        }
        figlet(args.join(" "), function(err, data) {
            if (err) return console.dir(err);
            message.channel.send(data, {
                code: 'md'
            });
        });
    }
	
    if(cmd === `${prefix}botinfo`) {

        let botkep = bot.user.displayAvatarURL;
        let infoEmbed = new Discord.RichEmbed()
        .setAuthor(message.author.username)
	.addField("Itt tudod behívni a botot:", `[Link](https://discord.com/api/oauth2/authorize?client_id=740227268328292513&permissions=0&redirect_uri=https%3A%2F%2Fdiscord.com%2Fapi%2Foauth2%2Fauthorize%3Fclient_id%3D740227268328292513%26permissions%3D0%26scope%3Dbot&scope=bot)`)
	.addField("Weboldal:", `[Kattints ide](https://crayz-discord-bot.webnode.hu/)`)
        .addField("Parancsokat itt láthatod:", `${prefix}help \n \n Készítette: Ł𝕠̋𝕣𝕚𝕟𝕔©™ A grafikus#9466 \n Bot Tulajdonosai: Ł𝕠̋𝕣𝕚𝕟𝕔©™ A grafikus#9466, -ĐubŁTea_ĐR-#1952 \n A bot ennyi szerveren van bent: ${bot.guilds.size} \n A bot neve: ${bot.user.username} \n Bot prefixe: ${prefix}`)
        .addBlankField()
        .setColor("#2c40d4") 
        .setThumbnail(botkep)
        .setFooter("Bot Developer: Ł𝕠̋𝕣𝕚𝕟𝕔©™ A grafikus#9466");

        message.channel.send(infoEmbed);
		
    }
    if(cmd === `${prefix}help`){
        let help = new Discord.RichEmbed()
        .setColor('#cf9b00')
        .setTitle("Help System")
	.setDescription(`**Commands**`)
	.addField("Itt tudod behívni a botot:", `[Link](https://discord.com/api/oauth2/authorize?client_id=740227268328292513&permissions=0&redirect_uri=https%3A%2F%2Fdiscord.com%2Fapi%2Foauth2%2Fauthorize%3Fclient_id%3D740227268328292513%26permissions%3D0%26scope%3Dbot&scope=bot)`)
	.addField("Weboldal:", `[Kattints ide](https://crayz-discord-bot.webnode.hu/)`)
        .addField(`${prefix}botinfo`,"Megmutatja a bot információit!")
        .addField(`${prefix}Szerencsejáték`,"Kidob egy random számot!")
        .addField(`${prefix}help`,"Megmutatja az összes parancsot!")
        .addField(`${prefix}id`,"Megmutatja az account id-det!")
        .addField(`${prefix}serverinfo`,"Megmutatja a szerver infórmációit!")
        .addField(`${prefix}Ascii`,"Kiírja a megadot szöveget!")
        .addField(`${prefix}say`,"Kiírassa a bottal a megadot szöveget!")
        .setTimestamp()
        message.channel.send(help);
    }
    if(cmd == `${prefix}Szerencsejáték`) {
        let sum = Math.floor(Math.random() * 100) + 50;
        let embed = new Discord.RichEmbed() 
        embed.setAuthor(message.author.username, message.author.displayAvatarURL)
        embed.setFooter("Crayz", bot.user.avatarURL)
        embed.setTimestamp();
        embed.setColor("#0050f0");
        embed.addField("Szerencsejáték", `A mostani kidobott számod: ${sum}`);
        embed.addBlankField();
    
        if(sum == 1) embed.addField("Mostani szerencse:", "Nagyon balszerencsés voltál. :frowning2:");
        else if(sum < 3) embed.addField("Mostani szerencse:", "Balszerencsés voltál. :frowning2:");
        else if(sum < 5) embed.addField("Mostani szerencse:", "Átlagos. :confused:");
        else if(sum == 5) embed.addField("Mostani szerencse:", "Szerencsés voltál. :grinning:");
        else embed.addField("Mostani szerencse:", "Nagyon szerencsés voltál. :smiley:");
    
        message.channel.send(embed);
    }
});
bot.login(tokenfile.token);

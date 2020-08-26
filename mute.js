var Discord = require('discord.js');

exports.run = async(client, msg, args) => {
    if(!msg.member.hasPermission('MANAGE_MESSAGES')) return msg.reply('Nincs jogod a használatára!');

    var user = msg.mentions.users.first();
    if(!user) return msg.reply('Említs meg valakit');

    var member;

    try {
        member = await msg.guild.members.fetch(user);
    } catch(err) {
        member = null;
    }

    if(!member) return msg.reply('Ilyen ember nincs a szerveren!');
    if(member.hasPermission('MANAGE_MESSAGES')) return msg.reply('Nem némíthatod le ezt a személyt!');

    var rawTime = args[1];
    var time = ms(rawTime);
    if(!time) return msg.reply('Nem adtál meg időt!');

    var reason = args.splice(2).join(' ');
    if(!reason) return msg.reply('Addj indokot!');

    var channel = msg.guild.channels.cache.find(c => c.name === 'potato');

    var log = new Discord.RichEmbed()
    .setTitle('User Muted')
    .addField('User:', user, true)
    .addField('By:', msg.author, true)
    .addField('Expires:', rawTime)
    .addField('Reason:', reason)
    channel.send(log);

    var embed = new Discord.RichEmbed()
    .setTitle('Le vagy némítva')
    .addField('Expires:', rawTime, true)
    .addField('Reason:', reason, true);

    try {
        user.send(embed);
    } catch(err) {
        console.warn(err);
    }

    var role = msg.guild.roles.cache.find(r => r.name === 'Muted');

    member.roles.add(role);

    setTimeout(async() => {
        member.roles.remove(role);
    }, time);

    msg.channel.send(`**${user}** lenémította **${msg.author}**-t ennyi időre **${rawTime}**!`);
}

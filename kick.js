var Discord = require('discord.js');

exports.run = async(client, msg, args) => {
    if(!msg.member.hasPermission('KICK_MEMBERS')) return msg.reply('Nincs jogod a használatára!');

    var user = msg.mentions.users.first();
    if(!user) return msg.reply('Említs meg valakit');

    var member;

    try {
        member = await msg.guild.members.fetch(user);
    } catch(err) {
        member = null;
    }

    if(!member) return msg.reply('Ilyen ember nincs a szerveren!');
    if(member.hasPermission('MANAGE_MESSAGES')) return msg.reply('Nem rúghatod ki ezt a személyt!');

    var reason = args.splice(1).join(' ');
    if(!reason) return msg.reply('Addj indokot!');

    var channel = msg.guild.channels.cache.find(c => c.name === 'potato');

    var log = new Discord.RichEmbed()
    .setTitle('User Kicked')
    .addField('User:', user, true)
    .addField('By:', msg.author, true)
    .addField('Reason:', reason)
    channel.send(log);

    var embed = new Discord.RichEmbed()
    .setTitle('Kirúgtak a szerveről!')
    .setDescription(reason);

    try {
        await user.send(embed);
    } catch(err) {
        console.warn(err);
    }

    member.kick(reason);

    msg.channel.send(`**${user}** kirúgta a szerveről **${msg.author}**-t!`);
}

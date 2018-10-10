const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
    let bicon = bot.user.displayAvatarURL;
    let string = '';
    bot.guilds.forEach(guild => {
    string += guild.name  + '\n';})
    let bt = bot.user.username;
    let botembed = new Discord.RichEmbed()
        .setColor("#000FF")
        .addField("Botun Olduğu Sunucular " ,string)
        .setTimestamp()
        .setFooter("Komutu Kullanan: " + message.author.username, message.author.avatarURL);
    message.channel.send(botembed);
}

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ['sv'],
    permLevel: 0
  };
  
  exports.help = {
    name: 'Serverler',
    description: 'Servers',
    usage: 'Serverler'
  };
  
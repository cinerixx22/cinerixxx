const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {

    let replies = [`https://www.youtube.com/watch?v=7APNy7sdNPA`];

    let result = Math.floor((Math.random() * replies.length));

    let dukvideo = new Discord.RichEmbed()
        .setTitle("VİDEOOOO!!!")
        .setColor("#FF69B4")
        .setFooter(`Dukstill'in Videoları`)
        .addField(replies[result]);

        message.author.sendEmbed(dukvideo);
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['gifs'],
  permLevel: 0
};

exports.help = {
  name: 'gifs',
  description: 'Rastgele gif atar.',
  usage: 'gifs'
};

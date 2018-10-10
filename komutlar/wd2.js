const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {

    let replies = ["https://media.giphy.com/media/ETfN4s8TK4Li8/giphy.gif",
                   "https://media.giphy.com/media/l3q2BAs9N0IItUKA0/giphy.gif",
                   "https://media.giphy.com/media/gquD6sO9z9UAw/giphy.gif",
                   "https://media.giphy.com/media/l3q2JvztR3AjtBxQs/giphy.gif",
                   "https://media.giphy.com/media/12RlOL0HqKUS6k/giphy.gif",
                   "https://media.giphy.com/media/Q2w02BCP1Nvqg/giphy.gif",
                   "https://media.giphy.com/media/rXFl2JspcqupG/giphy.gif"];

    let result = Math.floor((Math.random() * replies.length));

    let gifembed = new Discord.RichEmbed()
        .setTitle("Gifiniz")
        .setColor("#FF69B4")
        .setFooter(`Gifiniz ${message.author.tag} `, message.author.avatarURL)
        .setImage(replies[result]);

    message.channel.send(gifembed);
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['wd2'],
  permLevel: 0
};

exports.help = {
  name: 'wd',
  description: 'asd.',
  usage: 'wd'
};

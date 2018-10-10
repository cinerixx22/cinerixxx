const Discord = require('discord.js');
const bot = new Discord.Client();

exports.run = async (client, message, args, level) => {  

var gif = ["https://media.giphy.com/media/zWzAudGgQ7JOE/giphy.gif",
            "https://media.giphy.com/media/3og0ITpdHjrDDH8Yy4/giphy.gif", 
            "https://media.giphy.com/media/krI1lBPsluByg/giphy.gif",
            "https://media.giphy.com/media/5xtDarobRW68tNCgjUA/giphy.gif",
            "https://media.giphy.com/media/8R7GUZWaydcOY/giphy.gif",
            "https://media.giphy.com/media/SuJoKxDplnKve/giphy.gif",
            "https://media.giphy.com/media/DKCNQcgbdekrC/giphy.gif",
            "https://media.giphy.com/media/l3q2K5jinAlChoCLS/giphy.gif",
            "https://media.giphy.com/media/LTpmRMNSmZgIw/giphy.gif",
            "https://media.giphy.com/media/bEVKYB487Lqxy/giphy.gif",
            "https://media.giphy.com/media/vbD9OoDgUOpkk/giphy.gif"]
            var temp = gif[Math.floor(Math.random() * 11)]
            var embed = new Discord.RichEmbed()
                .setColor(0x2186c0)
                .setAuthor("Gifiniz", client.user.avatarURL)
                .setImage(temp)
            message.channel.send(embed);
}
            
exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ['gif'],
    permLevel: 0
  };
  
  exports.help = {
    name: 'gif',
    description: 'Rastgele gif atar.',
    usage: 'gif'
  };
  
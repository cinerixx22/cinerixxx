const Discord = require('discord.js');
const bot = new Discord.Client();

exports.run = async (client, message, args, level) => {  

var gif = ["https://media.giphy.com/media/3o6UB7MOoxIfHet9PG/giphy.gif",
            "https://media.giphy.com/media/m9v9q1kB2i4ak/giphy.gif", 
            "https://media.giphy.com/media/4VCevEgXeYzwk/giphy.gif",
            "https://media.giphy.com/media/ej4lfadivQe1W/giphy.gif",
            "https://media.giphy.com/media/3xz2BCohVTd7h2Kvfi/giphy.gif",
            "https://media.giphy.com/media/3oEduSbSGpGaRX2Vri/giphy.gif"]
            var temp = gif[Math.floor(Math.random() * 11)]
            var embed = new Discord.RichEmbed()
                .setColor(0x2186c0)
                .setAuthor("Ponçik Gifiniz", client.user.avatarURL)
                .setImage(temp)
            message.channel.send(embed);
}
            
exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ['pgif'],
    permLevel: 0
  };
  
  exports.help = {
    name: 'pgif',
    description: 'Rastgele Ponçik gif atar.',
    usage: 'pgif'
  };
  
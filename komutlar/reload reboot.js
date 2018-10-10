const Discord = require('discord.js');
const bot = new Discord.Client();

module.exports.run = async (bot, message, args) => { 
    if(message.author.id !== "308550410023731204") return message.channel.send("Bu Komutu Kullanamazsın Çünki Sahibi Değilsin!")

    
  rebootBot(message.channel);
       function rebootBot(channel) {
           message.react('✅')
               .then(message => bot.destroy())
               .then(message => bot.destroy())
              .then(() => bot.login("NDcyNzk5Nzg1NDkwMDU1MTcx.Dj4orQ.5agLwuaa4F5MV5pTBwBUXbJgskg"));
           message.channel.send("``[Cinerix] Başarıyla Rebootlanmıştır!``")
       }
    }

    exports.conf = {
        enabled: true,
        guildOnly: false,
        aliases: ['reload', 'reboot'],
        permLevel: 4
      };
      
      exports.help = {
        name: "reboot / reload",
        description: "Botun Sahibi Dışında Kullanılamaz!",
        usage: "reboot&reload"
      };
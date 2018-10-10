const Discord = require("discord.js");
const ms = require("ms");

module.exports.run = async (bot, message, args) => {

    if (!message.member.hasPermissions ('KICK_MEMBERS')) return message.channel.send("Bu komudu kullanmak için **KICK_MEMBERS** sende yetkisi olmalı.")
    const modlog = message.guild.channels.find(channel => channel.name === 'mod-logs');
    const mod = message.author;
    let user = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
    if (!user) return message.channel.send("Böyle bir kullanıcı bulamıyorum.")
    let reason = args.join(" ").slice(22)
    let muterole = message.guild.roles.find(`name`, "Muteli");
    if(args[0] == "help"){
      message.reply("Kullanımı: c!mute <kullanıcı> <sebebi>");
      return;
    }
  let muteChannel = message.guild.channels.find(`name`, "mod-logs");
  if (!muteChannel) return message.channel.send('**Lütfen `mod-logs` adında bir yazı kanalı oluşturun**')
  if (!muterole) {
        try {
            muterole = await message.guild.createRole({
                name: "Muteli",
                color: "#000000",
                permissions: []
            })
            message.guild.channels.forEach(async (channel, id) => {
                await channel.overwritePermissions(muterole, {
                    SEND_MESSAGES: false,
                    ADD_REACTIONS: false,
                    SPEAK: false
                });
            });
        } catch (e) {
            console.log(e.stack);
        }
    }

    let mutetime = args[1];

    await (user.addRole(muterole.id));
    const muteembed = new Discord.RichEmbed()
            .setAuthor(' Süresiz | Mute', `https://images-ext-2.discordapp.net/external/Wms63jAyNOxNHtfUpS1EpRAQer2UT0nOsFaWlnDdR3M/https/image.flaticon.com/icons/png/128/148/148757.png`)
            .addField('Kullanıcı', `<@${user.id}>`)
            .addField("Sebep", reason ? reason : "Belirtilmemiş")
            .addField('Yetkili', `${mod}`)
            .addField('muteyi açmak için c!unmute @kullanıcı sebep')
            .setColor('#D9D900')
        modlog.send(muteembed)
  
  
}

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ["sustur", "muted", "mutele", "sus"],
    permLevel: 3
  };
  
  exports.help = {
    name: 'mute',
    description: 'İstediğiniz Kişiye Mute Atarsınız Kaldırmak İçin c!unmute @user',
    usage: 'mute @user sebep'
  };
const Discord = require('discord.js');
const client = new Discord.Client();
const ayarlar = require('../ayarlar.json');

exports.run = (client, message) => {
  if (message.channel.type !== 'dm') {
    const ozelmesajkontrol = new Discord.RichEmbed()
    .setColor(0x00AE86)
    .setTimestamp()
    .setAuthor(message.author.username, message.author.avatarURL)
    .setDescription('Özel mesajlarını kontrol et. :postbox:');
    message.channel.sendEmbed(ozelmesajkontrol) }
	const pingozel = new Discord.RichEmbed()
    .setColor(0x00AE86)
    .setTimestamp()
    .setTitle('BİLGİ PANELİ')
    .setAuthor(message.author.username, message.author.avatarURL)
    .setDescription(' Yapımcı: Mert (Fatal Waccle) **ST Chat Görevlisi**\n\n_**BOTU EKLEMEK İÇİN YETKİLİYE ULAŞINIZ:**_\n\n@-fatal- Waccle#1647 \n\n_**Linkler:**_\n\n**ST** sunucusunun davet linki:  https://discord.gg/Dsg6q7Q  \n\n**:copyright: 2015 ST**');
    return message.author.sendEmbed(pingozel)
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [ 'botbilgi', 'botb', 'bbot'],
  permLevel: 0
};

exports.help = {
  name: 'bilgi',
  description: 'Bot ile ilgili bilgi verir.',
  usage: 'bilgi'
};

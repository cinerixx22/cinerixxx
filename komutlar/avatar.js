const Discord = require('discord.js');

exports.run = (client, message, args) => {
    if (args.join(" ") == "") {
        message.reply(`bu komutu kullanmak için birisini etiketlemen gerek örnek: ${prefix}avatar @kişi`);
        return;
    } else {
        let user = message.mentions.users.first(); // Mentioned user
        let image = user.displayAvatarURL; // Get image URL
        let embed = new Discord.RichEmbed()
            .setAuthor(`${user.username}#${user.discriminator}`) // Set author
            .setColor("RANDOM") // Set color (If you don't have ideas or preference, use RANDOM for random colors)
            .setImage(image) // Set image in embed
        message.channel.send(embed); // Send embed
    }
};

    exports.conf = {
        enabled: true,
        guildOnly: false,
        aliases: ['avatar'],
        permLevel: 0
      };
      
      exports.help = {
        name: 'avatar',
        description: 'avatarını gösterir.',
        usage: 'avatar'
      };
      
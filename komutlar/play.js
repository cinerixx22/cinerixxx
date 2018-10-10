const ytdl = require('ytdl-core');

exports.run = async (client, message, args, ops) => {

    if (!message.member.voiceChannel) return message.channel.send('Please connet to a voice channel');

    if (message.guild.me.voiceChannel) return message.channel.send('sorry the bot is already connected to channel');

    if(!args[0]) return message.channel.send('sorry please input a url ');

    let validate = await ytdl.validateURL(args[0]);

    if (!validate) return message.channel.send('sorry please input a **valid** ur following url following the command')

    let info = await ytdl.getInfo(args[0]);

    try{
    var connection = await message.member.voiceChannel.join();
}catch(err) {
    console.error(err)
}

    let dispatcher = await connection.playStream(ytdl(args[0]));

    message.channel.send(`Now playing ${info.title}`);


}

exports.conf = {
    enabled: true,
    guildOnly: true,
    aliases: ['p'],
    permLevel: 3
  };
  
  exports.help = {
    name: 'p',
    description: 'p',
    usage: 'p'
  };
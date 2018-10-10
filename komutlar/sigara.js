exports.run = async (client, message, level) => {
    message.channel.send('**Paket Alev Aldı Moruq**').then(async msg => {
    setTimeout(() => {
      msg.edit('🚬');
    }, 1000);
    setTimeout(() => {
      msg.edit('🚬 ☁ ');
    }, 7000);
    setTimeout(() => {
      msg.edit('🚬 ☁☁ ');
    }, 10000);
    setTimeout(() => {
      msg.edit('🚬 ☁☁☁ ');
    }, 14000);
    setTimeout(() => {
      msg.edit('🚬 ☁☁');
    }, 18000);
    setTimeout(() => {
      msg.edit('🚬 ☁');
    }, 22000);
    setTimeout(() => {
      msg.edit('🚬 ');
    }, 25500);
    setTimeout(() => {
      msg.edit(`Sigaram bitti | Sigara İçmeyiniz. :no_smoking: Sigara Sağlığa Zararlıdır. `);
    }, 30000);
  });
  };
  
  exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ['sigara', 'Sigara', 'SİGARA'],
    permLevel: 0
  };
  
  exports.help = {
    name: "smoke",
    description: "Smoke weed everyday :dab:",
    usage: "smoke"
  };
const Discord = require('discord.js');
const client = new Discord.Client();
const ayarlar = require('./ayarlar.json');
const chalk = require('chalk');
const fs = require('fs');
const moment = require('moment');
require('./util/eventLoader')(client);
var prefix = ayarlar.prefix;











const log = message => {
  console.log(`[${moment().format('YYYY-MM-DD HH:mm:ss')}] ${message}`);
};








client.on("guildCreate", async guild => {
    let guildCreateChannel = client.channels.get("493488638277976064");
    let joinEmbed = new Discord.RichEmbed()
        .setTitle('Bilgilendirme')
        .setThumbnail(guild.iconURL)
        .setDescription(`[ Cinerix ] Yeni Bir Sunucuya Katılmıştır Hayırlı Olsun! :tada: \n Olduğu Sunucular: **${client.guilds.size}**`)
        .addField('Sunucu Bilgi', `Katıldığı Sunucunun Adı: **${guild.name}** \nSunucu ID: **${guild.id}**`)
    guildCreateChannel.send(joinEmbed);
});

client.on("guildDelete", async guild => {
    let guildCreateDelete = client.channels.get("493488638277976064");
    let leaveEmbed = new Discord.RichEmbed()
        .setTitle('Bilgilendirme')
        .setThumbnail(guild.iconURL)
        .setDescription(`[ Cinerix ] Bir Sunucudan Atılmıştır Geçmiş Olsun :sob: \n Olduğu Sunucular: **${client.guilds.size}**`)
        .addField('Sunucu Bilgi', `Atıldığı Sunucu Adı: **${guild.name}** \nSunucu ID: **${guild.id}**`)
    guildCreateDelete.send(leaveEmbed);
});




client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();
fs.readdir('./komutlar/', (err, files) => {
  if (err) console.error(err);
  log(`${files.length} komut yüklenecek.`);
  files.forEach(f => {
    let props = require(`./komutlar/${f}`);
    log(`Yüklenen komut: ${props.help.name}.`);
    client.commands.set(props.help.name, props);
    props.conf.aliases.forEach(alias => {
      client.aliases.set(alias, props.help.name);
    });
  });
});


client.reload = command => {
  return new Promise((resolve, reject) => {
    try {
      delete require.cache[require.resolve(`./komutlar/${command}`)];
      let cmd = require(`./komutlar/${command}`);
      client.commands.delete(command);
      client.aliases.forEach((cmd, alias) => {
        if (cmd === command) client.aliases.delete(alias);
      });
      client.commands.set(command, cmd);
      cmd.conf.aliases.forEach(alias => {
        client.aliases.set(alias, cmd.help.name);
      });
      resolve();
    } catch (e){
      reject(e);
    }
  });
};

client.load = command => {
  return new Promise((resolve, reject) => {
    try {
      let cmd = require(`./komutlar/${command}`);
      client.commands.set(command, cmd);
      cmd.conf.aliases.forEach(alias => {
        client.aliases.set(alias, cmd.help.name);
      });
      resolve();
    } catch (e){
      reject(e);
    }
  });
};

client.unload = command => {
  return new Promise((resolve, reject) => {
    try {
      delete require.cache[require.resolve(`./komutlar/${command}`)];
      let cmd = require(`./komutlar/${command}`);
      client.commands.delete(command);
      client.aliases.forEach((cmd, alias) => {
        if (cmd === command) client.aliases.delete(alias);
      });
      resolve();
    } catch (e){
      reject(e);
    }
  });
};














client.elevation = message => {
  if(!message.guild) {
	return; }
  let permlvl = 0;
  if (message.member.hasPermission("BAN_MEMBERS")) permlvl = 2;
  if (message.member.hasPermission("ADMINISTRATOR")) permlvl = 3;
  if (message.author.id === ayarlar.sahip) permlvl = 4;
  return permlvl;
};













//hoşgeldin hoşçakal mesajları çalışıyor!



//SON

client.on('message', message => {
  if (message.author.bot) return;
  if (!message.content.startsWith(prefix)) return;

  let command = message.content.split(' ')[0];
  command = command.slice(prefix.length);

  let args = message.content.split(' ').slice(1);

  if (command === 'tavsiyeni-gönder' || command === 'tavsiye') {
    let str = '<@308550410023731204> ';
    let id = str.replace(/[<@!>]/g, '');
    let mesaj = args.slice(0).join(' ');
    if (mesaj.length < 1) return message.reply(` ⚠ tavsiyeni yazmayı unuttun. ⚠ `);
    message.channel.sendEmbed(new Discord.RichEmbed()
    .setColor('#04FF00')
    .setDescription('Tavsiyeniz Gönderildi'));
    const embed = new Discord.RichEmbed()
    .setColor('#FF0000')
    .setTitle('Tavsiye bilgileri;')
    .addField('Tavsiye:', mesaj, true)
    .addField('Kullanıcı adı:', message.author.tag, true)
    .addField('Kullanıcı kimliği:', message.author.id, true)
    .addField('Sunucu adı:', message.guild.name, true)
    .addField('Sunucu kimliği:', message.guild.id, true)
    client.fetchUser(id)
    .then(user => {user.send({embed})})
  }
});


client.on("message", message => {
  let dmchannel = client.channels.get("493487195106312214");
  if (message.channel.type === "dm") {
      if (message.author.id === client.user.id) return;
      dmchannel.sendMessage("", {embed: {
              color: 3447003 ,
              title: `Yazan: ${message.author.tag}`,
              description: `${message.content}`
            }})
  }
  if (message.channel.bot) return;
});









//let statuses = [`${prefix}yardım ● 6 Sunucu ● v1.4`,
           //     `Botumuzu Seçtiğiniz İçin Teşekkürler`,
            //    `c!tavsiye Yazarak Botumuza Sizin İsteklerinizi Ekleyebiliriz!` , 
             //   `Botumuza Hergün Yepyeni İçerikler Geliyor Takipte Kalın`,
             //   `Destek Sunucusu :: discord.me/rakuncarboun`,
             //   `Sunucunuza Mod-logs eklemez iseniz bot çalışmaz`];
 
//client.on('ready', () =>  {

  //setInterval(function() {
   // let status = statuses[Math.floor(Math.random()*statuses.length )];

 //client.user.setPresence({game: { name: status }, status: 'online'});
  //}, 25000)
//})


client.on('message', async msg => {
  if (msg.content.toLowerCase() === 'c!eval client.token' || msg.content.toLowerCase() === 'c!eval bot.token' || msg.content.toLowerCase() === 'c!eval guild.token') {
    msg.channel.send("```Bi tek sen akıllısın demi kel```")
  }
});




var oyun = [
`Destek Sunucusu Discord.me/Cinerix`,
`Bizi Tercih Ettiğiniz İçin Teşekkürler`,
`Yeni İçerik : ${prefix}sayaç`,
`Yakında Log Kanallarını Ayarlayabileceksiniz!!`,
`Yapımcım -Fatal- Waccle#1647`,
`Yakında Çekiliş Yapılacaktır!!`,
`Cinerix Ekibi Saygıyla Sunar...`,];

setInterval(function() {

  var random = Math.floor(Math.random()*(oyun.length-0+1)+0);

  client.user.setGame(oyun[random], "https://www.twitch.tv/fatalwaccle");
  }, 50000);



  client.on('guildCreate', async guild => {
		const girismesaj = [
		  '**Cinerix sunucunuza eklendi!**',
		  '**Cinerix** sunucunuzdaki insanlara ve size kolaylıklar sağlar.',
		  'Bot `-Fatal- Waccle` tarafından geliştirilmektedir.',
      'Botumuzun özelliklerini görmek için c!yardım komutunu kullanabilirsiniz.',
      'Sunucunda Oluşturman Gereken Birkaç Kanal Var :**mod-logs**, **yeni-gelenler**, **raporlar** yakında kendiniz ayarlayabileceksiniz bu kanalları!!',
		  '',
		  `**Cinerix Resmi Discord Sunucusu** https://discord.gg/qXY5cbn`
		]
		guild.owner.send(girismesaj)
});

  

client.on('message', async message => {
    if (message.content.toLowerCase() === prefix + 'döviz') {
var request = require('request');
request('https://www.doviz.com/api/v1/currencies/USD/latest', function (error, response, body) {
    if (error) return console.log('Hata:', error);
    else if (!error) { 
        var info = JSON.parse(body);
request('https://www.doviz.com/api/v1/currencies/EUR/latest', function (error, response, body) {
    if (error) return console.log('Hata:', error); 
    else if (!error) { 
        var euro = JSON.parse(body);
      message.channel.send(`***DOLAR*** \nDolar satış » **${info.selling}** \nDolar alış » **${info.buying}** \n\n***EURO*** \nEuro satış » **${euro.selling}**TL \nEuro alış » **${euro.buying}**TL`)    }
})
    }
})
    }
});


client.on('message', message => {
  if (message.content.toLowerCase() ===  "selamın aleyküm") {
      var sans = [`Aleyküm Selam ${message.author} Hoş Geldin`, `Ve Aleyküm Selam ${message.author} İyi Eğlenceler`];
      var sonuc = sans[Math.floor((Math.random() * sans.length))];
      const embed = new Discord.RichEmbed()
      .addField(`**Hoşgeldin İyi İnsan**`, `${sonuc}`)
      return message.channel.sendEmbed(embed);
  }
  });


  client.on('message', message => {
    if (message.content.toLowerCase() ===  "sa") {
        var sans = [`Aleyküm Selam ${message.author} Hoş Geldin`, `Ve Aleyküm Selam ${message.author} İyi Eğlenceler`];
        var sonuc = sans[Math.floor((Math.random() * sans.length))];
        const embed = new Discord.RichEmbed()
        .addField(`**Hoşgeldin İyi İnsan**`, `${sonuc}`)
        return message.channel.sendEmbed(embed);
    }
    });



    client.on('message', message => { 

      if (message.channel.type == "dm") return;
      if (message.member.hasPermission('ADMINISTRATOR')) return;

      const channel = message.guild.channels.find(channel => channel.name === 'mod-logs');
    
 
        const yasaklikelimeler = ["discord.gg", "discord", "dc", "discord.io", "discord.me", "discord.li"];
        if (yasaklikelimeler.some(word => message.content.toLowerCase().includes(word))) {
            message.delete();
            message.channel.send(`Dostum ${message.author}! Onlar Yasaklı Kelimeler Kullanamazsın`).then(m => m.delete(3000)); 
            embed = new Discord.RichEmbed() 
            .setAuthor(' Discord | Reklam', `   https://cdn.iconscout.com/public/images/icon/free/png-128/discord-logo-3176a652a0327604-128x128.png`)
            embed.setDescription('Bir Kullanıcının mesajında **reklam** içeren kelime bulundu  \n\n **Bulunan Kanal »** '+ message.channel) 
            embed.setColor(0xff0000) 
            embed.addField(name="Mesaj »", value=message.content) 
            embed .addField('Yazan Kişi »', `${message.author}`)
            embed.setFooter(name=`Yazan Kişini İD'si » ${message.author.id}`)
            embed.setTimestamp()

            let Channel = message.guild.channels.find(`name`, "mod-logs");
            if (!Channel) return message.channel.send('**`mod-logs` adında bir yazı kanalı oluşturmalısın yoksa logları bir yere yazamam!**')

            channel.send(embed)

          }
    }); 



    client.on('message', message => { 

      if (message.channel.type == "dm") return;
      if (message.member.hasPermission('ADMINISTRATOR')) return;

      const channel = message.guild.channels.find(channel => channel.name === 'mod-logs');
    
 
        const yasaklikelimeler = ["aq", "amq", "amk", "ağzına sıçıyım", "ağzına sıçayım", "annesiz", "anan", "ananın", "annanın", "babasız", "bacı", "baci", "ebeni", "eben", "ebesini", "ejdadını", "ejtadını", "ezdadını", "eztadını", "ecdat", "ecdatını", "ecdatının", "sikik", "yavşak", "yavsak", "kahpe", "pezevenk", "kaltak", "oç", "piç", "orrospu", "orrospuçocu", "kürt", "kürdo", "kürdi", "zenci", "nigga", "niga", "siyahi", "zenci", "ateist","Amını sikem","amına koyam","sülaleni sikem","baban olam","dinsiz","dinsiz piç","dinsiz puşt","dinsiz pezevenk","dinsiz orospu","dinsiz orospu çocuğu","kardeşini sikeyim","babanneni sikeyim","anneanneni sikem","babanneni sikem","anneanneni sikeyim","dedeni sikeyim","nineni sikeyim","nineni sikem","dedeni sikem","fuck you","fuck","motherfucker","motherfuck","bitch","idiots","mal","puşt","pezevenk","doğmamış çocuğunu sikem","deli orospu","deli orospu çocuğu","fahişe","pıttık","am","olmayan beynine sokam","amina koyiiym","bacini skiim","senin yolunu yordamını skerim","senin membağını skiim"," amina ermeni yarragi deemis orrospu cocuu","seni bogaz koprusunun ta ortasinda sikerim","ananın mına bacagımı sokup yarım vole attıgımının evladi","ananın adet suyuna ekmek bandıımın","kerhaneci pezevenk","seni tam şurada sikerim","senı tam surada sıkerım","yıkık","yıkık oç","yıkık orospu çocuğu","piçin doğurduğu","senin yolunu yordamını sikerim"];
        if (yasaklikelimeler.some(word => message.content.toLowerCase().includes(word))) {
            message.delete();
            message.channel.send(`Dostum ${message.author}! Onlar Yasaklı Kelimeler Kullanamazsın`).then(m => m.delete(3000)); 
            embed = new Discord.RichEmbed() 
            .setAuthor(' Yasaklı | Kelime', `https://www.iconsdb.com/icons/preview/black/letter-k-xxl.png`)
            embed.setDescription('Bir Kullanıcının mesajında **Küfür** içeren kelime bulundu  \n\n **Bulunan Kanal »** '+ message.channel) 
            embed.setColor(0xff0000) 
            embed.addField(name="Mesaj »", value=message.content) 
            embed .addField('Yazan Kişi »', `${message.author}`)
            embed.setFooter(name=`Yazan Kişini İD'si » ${message.author.id}`)
            embed.setTimestamp()

            let Channel = message.guild.channels.find(`name`, "mod-logs");
            if (!Channel) return message.channel.send('**`mod-logs` adında bir yazı kanalı oluşturmalısın yoksa logları bir yere yazamam!**')

            channel.send(embed)

          }
    }); 


  


 client.on("message", async message => {
  let sayac = JSON.parse(fs.readFileSync("./sunucuyaözelayarlar/sayaç.json", "utf8"));
  if (message.channel.type == "dm") return;
  if(sayac[message.guild.id]) {
      if(sayac[message.guild.id].sayi <= message.guild.members.size) {
          const embed = new Discord.RichEmbed()
              .setDescription(`Tebrikler ${message.guild.name}! Başarıyla ${sayac[message.guild.id].sayi} kullanıcıya ulaştık! Sayaç sıfırlandı!`)
              .setColor(ayarlar.renk)
              .setTimestamp()
          message.channel.send({embed})
          delete sayac[message.guild.id].sayi;
          delete sayac[message.guild.id];
          fs.writeFile("./sunucuyaözelayarlar/sayaç.json", JSON.stringify(sayac), (err) => {
              console.log(err)
          })
      }
  }
})


client.on("guildMemberAdd", async member => {
  let sayac = JSON.parse(fs.readFileSync("./sunucuyaözelayarlar/sayaç.json", "utf8"));
  const channel = member.guild.channels.find("name", "sayac")
  channel.send(`:inbox_tray: Hoş Geldin :inbox_tray: \n╔▬▬▬▬▬▬▬▬Sayaç▬▬▬▬▬▬▬▬▬\n║►             ${member.user.tag}\n║► Kullanıcı Katıldı \n║► **${sayac[member.guild.id].sayi}** Kişi Olmamıza ➡️ **${sayac[member.guild.id].sayi - member.guild.memberCount}** ⬅️ Kişi Kaldı\n║► Senin Katılmanla Beraber **${member.guild.memberCount}**  Kişiyiz! :inbox_tray:\n╚▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬`)
})

client.on("guildMemberRemove", async member => {
  let sayac = JSON.parse(fs.readFileSync("./sunucuyaözelayarlar/sayaç.json", "utf8"));
  const channel = member.guild.channels.find("name", "sayac")
  channel.send(`:outbox_tray: Güle Güle :outbox_tray: \n╔▬▬▬▬▬▬▬▬Sayaç▬▬▬▬▬▬▬▬▬\n║►             ${member.user.tag}\n║► Kullanıcı Ayrıldı \n║► **${sayac[member.guild.id].sayi}** Kişi Olmamıza ➡️ **${sayac[member.guild.id].sayi - member.guild.memberCount}** ⬅️ Kişi Kaldı\n║► Senin Ayrılmanla Beraber **${member.guild.memberCount}**  Kişiyiz! :outbox_tray:\n╚▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬`)
})



client.on("guildMemberAdd", member => {
  let otorol = JSON.parse(fs.readFileSync("./sunucuyaözelayarlar/otorol.json", "utf8"));

  var role = otorol[member.guild.id].role;
const rol = member.guild.roles.find('name', role);
  if (!rol)
  member.addRole(role);
});






client.on ("guildMemberAdd", member => {
  member.sendMessage(':tada:  Dukstill Ailesine Hoşgeldin :tada:\n Sunucudaki Kuralları Öğrenmek İçin !kurallar yazmayı unutma.');
});






var regToken = /[\w\d]{24}\.[\w\d]{6}\.[\w\d-_]{27}/g;

client.on('warn', e => {
  console.log(chalk.bgYellow(e.replace(regToken, 'that was redacted')));
});

client.on('error', e => {
  console.log(chalk.bgRed(e.replace(regToken, 'that was redacted')));
});


client.login(process.env.BOT_TOKEN);

const Discord = require('discord.js');
const client = new Discord.Client();
const ayarlar = require('./ayarlar.json');
const { Client, Util } = require('discord.js');
require('./util/eventLoader.js')(client);
const fs = require('fs');
const  db  = require('wio.db') 
const data = require('quick.db') 
const moment = require('moment')

var prefix = ayarlar.prefix;

const log = message => {
    console.log(`${message}`);
};

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
        } catch (e) {
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
        } catch (e) {
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
        } catch (e) {
            reject(e);
        }
    });
};

client.elevation = message => {
    if (!message.guild) {
        return;
    }
    let permlvl = 0;
    if (message.member.hasPermission("BAN_MEMBERS")) permlvl = 2;
    if (message.member.hasPermission("ADMINISTRATOR")) permlvl = 3;
    if (message.author.id === ayarlar.sahip) permlvl = 4;
    return permlvl;
};

var regToken = /[\w\d]{24}\.[\w\d]{6}\.[\w\d-_]{27}/g;
// client.on('debug', e => {
//   console.log(chalk.bgBlue.green(e.replace(regToken, 'that was redacted')));
// });

client.on('warn', e => {
    console.log(chalk.bgYellow(e.replace(regToken, 'that was redacted')));
});

client.on('error', e => {
    console.log(chalk.bgRed(e.replace(regToken, 'that was redacted')));
});

client.login(ayarlar.token);



client.on('message', async (msg, member, guild) => {
    let i = data.fetch(`saas_${msg.guild.id}`)
        if(i === 'açık') {
          if (msg.content.toLowerCase() === 'sa'){
            
          msg.reply('Aleyküm Selam, Hoşgeldin ');    
        }
        }
      });
  
  client.on('message', async (msg, member, guild) => {
    let i = data.fetch(`saas_${msg.guild.id}`)
        if(i === 'açık') {
          if (msg.content.toLowerCase() === 'hi'){
            
          msg.reply('Hi welcome ');    
        }
        }
      });





    //--------------------------------------------------------------------------------------\\

client.on("message", msg => {
    const db = require("quick.db"); 
    if(!db.fetch(`reklam_${msg.guild.id}`)) return;
           const reklam = [".com", ".net", ".xyz", ".tk", ".pw", ".io", ".me", ".gg", "www.", "https", "http", ".gl", ".org", ".com.tr", ".biz", "net", ".rf.gd", ".az", ".party", "discord.gg",];
           if (reklam.some(word => msg.content.includes(word))) {
             try {
               if (!msg.member.hasPermission("BAN_MEMBERS")) {
                     msg.delete();
                       return msg.channel.send(new Discord.MessageEmbed().setDescription(`${msg.author} Bu sunucuda reklam filtresi etkin.`).setColor('0x800d0d').setAuthor(msg.member.displayName, msg.author.avatarURL({ dynamic: true })).setTimestamp()).then(x => x.delete({timeout: 5000}));
     
    
     msg.delete(3000);                              
    
               }              
             } catch(err) {
               console.log(err);
             }
           }
       });
   
   //--------------------------------------------------------------------------------------\\


    

   


//--------------------------------------------------------------------------------------\\

client.on("message", async msg => {
    const data = require('quick.db')
  
  
    let kufureng = await data.fetch(`kufur_${msg.guild.id}`);
    if (kufureng == "kapali") return;
    if (kufureng == "acik") {
        const kufur = ["oç", "amk", "ananı sikiyim", "ananıskm", "piç", "amk", "amsk", "sikim", "sikiyim", "orospu çocuğu", "piç kurusu", "kahpe", "orospu", "mal", "sik", "yarrak", "am", "amcık", "amık", "yarram", "sikimi ye", "mk", "mq", "aq", "ak", "amq","amguard","seksüel","sekssüel"];
           if (kufur.some(word => msg.content.includes(word))) {
             try {
               if (!msg.member.hasPermission("BAN_MEMBERS")) {
                     msg.delete();
                             
                         return msg.channel.send(new Discord.MessageEmbed().setDescription(`${msg.author} Bu sunucuda küfür filtresi etkin.`).setColor('0x800d0d').setAuthor(msg.member.displayName, msg.author.avatarURL({ dynamic: true })).setTimestamp()).then(x => x.delete({timeout: 5000}));
     
               }              
             } catch(err) {
               console.log(err);
             }
           }
       }
       if (!kufureng) return;
   });
   
   client.on("messageUpdate", (oldMessage, newMessage) => {
  
  
    const data = require('quick.db')
  
  
    let kufureng = data.fetch(`${oldMessage.guild.id}.kufur`);
    if (kufureng == "kapali") return;
    if (kufureng == "acik") {
           const kufur = ["oç", "amk", "ananı sikiyim", "ananıskm", "piç", "amk", "amsk", "sikim", "sikiyim", "orospu çocuğu", "piç kurusu", "kahpe", "orospu", "mal", "sik", "yarrak", "am", "amcık", "amık", "yarram", "sikimi ye", "mk", "mq", "aq", "ak", "amq","amguard","seksüel","sekssüel"];
           if (kufur.some(word => newMessage.content.includes(word))) {
             try {
               if (!oldMessage.member.hasPermission("BAN_MEMBERS")) {
                     oldMessage.delete();
                             
                         return oldMessage.channel.send(new Discord.MessageEmbed().setDescription(`${oldMessage.author} Bu sunucuda küfür filtresi etkin.`).setColor('0x800d0d').setAuthor(oldMessage.member.displayName, oldMessage.author.avatarURL({ dynamic: true })).setTimestamp()).then(x => x.delete({timeout: 5000}));
     
               }              
             } catch(err) {
               console.log(err);
             }
           }
           if (!kufureng) return;
        }})

   
   
   //--------------------------------------------------------------------------------------\\





//--------------------------------------------------------------------------------------\\


client.on('roleDelete', async role => {
    const data = await require('quick.db').fetch(`codework-mute.${role.guild.id}`);
    if(data && data === role.id) require('quick.db').delete(`codework-mute.${role.guild.id}`); 
    });

    //--------------------------------------------------------------------------------------\\
   


    //--------------------------------------------------------------------------------------\\
    const ms = require("parse-ms");
const { DiscordAPIError } = require("discord.js");
client.on("message", async message => {
  if (message.author.bot) return;
  if (!message.guild) return;
  if (message.content.includes(`afk`)) return;
  if (data.fetch(`afk_${message.author.id}`)) {
    data.delete(`afk_${message.author.id}`);
    data.delete(`afk_süre_${message.author.id}`);
    const embed = new Discord.MessageEmbed().setFooter(client.user.username, client.user.avatarURL()).setColor("BLACK").setDescription(`${message.author.username} **Artık AFK Değilsin.**`);
    message.channel.send(embed).then(msg => { msg.delete({ timeout: 5000});})}
  var USER = message.mentions.users.first();
  if (!USER) return;
  var REASON = data.fetch(`afk_${USER.id}`);
  if (REASON) {
    let süre = data.fetch(`afk_süre_${USER.id}`);
    let timeObj = ms(Date.now() - süre);
    const afk = new Discord.MessageEmbed()
.setFooter(client.user.username, client.user.avatarURL()).setColor("BLACK").setDescription(`<@${message.author.id}> **Bu Kullanıcı** \`${timeObj.hours} Saat, ${timeObj.minutes} Dakika, ${timeObj.seconds} Saniyedir\` \`${REASON}\` **Nedeniyle AFK.**`);
    message.channel.send(afk).then(msg => { msg.delete({ timeout: 5000});
            })}});


   //--------------------------------------------------------------------------------------\\








client.on("message", async message => {
    if (!message.guild) return;
  
    if (data.has(`sayac_${message.guild.id}`) === true) {
      if (data.fetch(`sayac_${message.guild.id}`) <= message.guild.members.cache.size) {
        const embed = new Discord.MessageEmbed()
          .setTitle(`Tebrikler ${message.guild.name}!`)
          .setDescription(`Başarıyla \`${db.fetch(`sayac_${message.guild.id}`)}\` kullanıcıya ulaştık! Sayaç sıfırlandı!`)
          .setColor("RANDOM");
        message.channel.send(embed);
        message.guild.owner.send(embed);
        db.delete(`sayac_${message.guild.id}`);
      }
    }
  });
  client.on("guildMemberRemove", async member => {
    const channel = data.fetch(`sKanal_${member.guild.id}`);
    if (data.has(`sayac_${member.guild.id}`) == false) return;
    if (data.has(`sKanal_${member.guild.id}`) == false) return;
  
      member.guild.channels.cache.get(channel).send(`**${member.user.tag}** Sunucudan ayrıldı! \`${data.fetch(`sayac_${member.guild.id}`)}\` üye olmamıza son \`${data.fetch(`sayac_${member.guild.id}`) - member.guild.memberCount}\` üye kaldı!`);
  });
  client.on("guildMemberAdd", async member => {
    const channel = data.fetch(`sKanal_${member.guild.id}`);
    if (data.has(`sayac_${member.guild.id}`) == false) return;
    if (data.has(`sKanal_${member.guild.id}`) == false) return;
  
      member.guild.channels.cache.get(channel).send(`**${member.user.tag}** Sunucuya Katıldı :tada:! \`${data.fetch(`sayac_${member.guild.id}`)}\` üye olmamıza son \`${data.fetch(`sayac_${member.guild.id}`) - member.guild.memberCount}\` üye kaldı!`);
  });
  



  //YETKİLİ KAYIT MESAJI\\

client.on("guildMemberAdd", async member => {
  let yetkilihgmesajı = data.fetch(`yetkilikgirismesajı_${member.guild.id}`)
  client.channels.cache.get(yetkilihgmesajı).send(`Hoşgeldin ${member} Kayıt Olmak İçin Kayıt Kanalına İsmini Yaz Ve Yetkilileri Bekle!`);
});

//YETKİLİ KAYIT MESAJI SON\\



//KULLANICI KAYIT MESAJI\\

client.on("guildMemberAdd", async member => {
  let hgmesajı = data.fetch(`kgirismesajı_${member.guild.id}`)
  client.channels.cache.get(hgmesajı).send(`Hoşgeldin ${member} Kayıt Olmak İçin !kayıt İsim Yaş`);
});

//KULLANICI KAYIT MESAJI SON\\





client.on("message", async msg => {
  if (msg.channel.type === "dm") return;
  if (msg.author.bot) return;
  if (msg.content.length > 4) {
    if (data.fetch(`capslock_${msg.guild.id}`)) {
      let caps = msg.content.toUpperCase();
      if (msg.content == caps) {
        if (!msg.member.hasPermission("ADMINISTRATOR")) {
          if (!msg.mentions.users.first()) {
            msg.delete();
            return msg.channel
              .send(`Bu sunucuda Caps Lock Engelleme sistemi kullanılıyor.Bu yüzden mesajını sildim!`)
              .then(m => m.delete(5000));
          }
        }
      }
    }
  }
});






client.on('guildMemberAdd', async member => {
  
  let kanal1 = await data.fetch(`otorolkanal_${member.guild.id}`);
  let kanal2 = member.guild.channels.cache.get(kanal1)
  
  let rol1 = await data.fetch(`otorolrol_${member.guild.id}`);
  let rol2 = member.guild.roles.cache.get(rol1)
  
  if (!kanal2) return;
  if (!rol2) return;
    
  const embed = new Discord.MessageEmbed()
  
  .setTitle('Templars - Otorol')
  
  .setColor("GREEN")
  
  .setDescription(`Sunucuya Katılan **${member}** Adlı Kullanıcıya Başarıyla \`${rol2.name}\` Rolü Verildi.`)
  
  kanal2.send(embed)
    
  member.roles.add(rol2)
  });
  
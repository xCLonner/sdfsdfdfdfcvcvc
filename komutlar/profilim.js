const moment = require("moment")
const Discord = require("discord.js");
const dateFormat = require('dateformat');

exports.run = (client, message) => {
  
  const online = message.client.emojis.get("484648488739667968");
  const rahatsizetmeyin = message.client.emojis.get("484648491709104160");
  const bosta = message.client.emojis.get("484648489209430036");
  const görünmez = message.client.emojis.get("484648489423470604");
  const kalem = message.client.emojis.get("484648493823033345");
  const kullan = message.client.emojis.get("484648493512654850");
  const botmu = message.client.emojis.get("484648490153279488");
var user;
    let member = message.mentions.users.first();
        let author = message.author; 
        if(member) {
             user = member;
        } else {
             user = author;
        }
    member = message.guild.member(user);
    let roles = member.roles.array().slice(1).sort((a, b) => a.comparePositionTo(b)).reverse().map(role => role.name);
       if (roles.length < 1) roles = ['Bu Kullanıcının Rolü Yok!'];
    const millisCreated = new Date().getTime() - user.createdAt.getTime();
    const daysCreated = moment.duration(millisCreated).format("Y [yıl], D [gün], H [saat], m [dakika], s [saniye]")
    const millisJoined = new Date().getTime() - member.joinedAt.getTime();
    const userJoined = moment.duration(millisJoined).format("Y [yıl], D [gün], H [saat], m [dakika], s [saniye]")
    if(user.presence.status === "dnd"){
      var durum = `${rahatsizetmeyin}` + " Rahatsız Etmeyin"
    }
    else if(user.presence.status === "online"){
      var durum = `${online}` + " Çevrimiçi"
    }
    else if(user.presence.status === "idle"){
      var durum = `${bosta}` + " Boşta"
    }
      else {
      var durum = `${görünmez}` + " Boşta"
    }
      const embed = new Discord.RichEmbed()
      .setColor('RANDOM')
      .setAuthor(user.tag, user.avatarURL || user.defaultAvatarURL)
      .setThumbnail(user.avatarURL || user.defaultAvatarURL)
      .setTitle(`${kullan} Kullanıcı;`)
      .addField("Şu anda oynadığı oyun", user.presence.game ? user.presence.game.name : 'Oynadığı bir oyun yok', true) 
      .addField('Durum:', `${durum}`)
      .addField('Katılım tarihi (Sunucu)', `${userJoined}`, true)
      .addField('Katılım Tarihi (Discord)', `${daysCreated}`, true)
      .addField("Hesabın Kuruluş Tarihi", `${dateFormat(user.createdAt)}`)
      .addField('Kimlik:', user.id, true)
      .addField(`${botmu} Botmu:`, user.bot ? '\n Evet' : 'Hayır', true)
      .addField('Rolleri:', message.guild.member(user).roles.map(m => m.name).join(' | '), true)
      .addField(`${kalem} Son gönderdiği mesaj:`, user.lastMessage || 'Yok', true)
      .addField('Hesap Oluşturma tarihi:', user.createdAt.toLocaleDateString(), true)
      .setFooter('Yeni Arayüz.', client.user.avatarURL)
      .setTimestamp()
      message.channel.send(embed);
    
    }

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['profilim', 'profil'],
  permLevel: 0
};

exports.help = {
  name: 'kullanici',
  description: 'Profilinizi Gösterir.',
  usage: 'kullanici'
};
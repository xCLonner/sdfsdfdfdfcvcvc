const Discord = require('discord.js');
const moment = require('moment');
const { version } = require("discord.js");
const os = require('os');
let cpuStat = require("cpu-stat");
const { stripIndents } = require('common-tags');
require('moment-duration-format');

var ayarlar = require('../ayarlar.json');

exports.run = (bot, message, args) => {
    let cpuLol;
    cpuStat.usagePercent(function(err, percent, seconds) {
        if (err) {
            return console.log(err);
        }
        const duration = moment.duration(bot.uptime).format(" D [gün], H [saat], m [dakika], s [saniye]");
        const embedStats = new Discord.RichEmbed()
            .setAuthor(bot.user.username + " | İstatistikler", bot.user.avatarURL)
            .setColor('RANDOM')
            .addField("<a:Partner:504229364716797955> Bellek Kullanımı", `${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)} / ${(os.totalmem() / 1024 / 1024).toFixed(2)} MB`)
            .addField("<a:blobCoolBoy:504229364209156096> Çalışma Süresi ", `${duration}`)
            .addField("<a:yukleniyor:505059163404107786> Bot İstatistikleri", stripIndents`
            <a:blobDansDans:504229374665424896> Kullanıcı: ${bot.users.size.toLocaleString()}
            <a:blobDansDans:504229374665424896> Sunucu: ${bot.guilds.size.toLocaleString()}
            <a:blobDansDans:504229374665424896> Kanal: ${bot.channels.size.toLocaleString()}
            <a:blobDansDans:504229374665424896> Müzik Çalınan Sunucu Sayısı: ${bot.voiceConnections.size ? bot.voiceConnections.size : '0'}
            <a:blobDansDans:504229374665424896> Ping: ${Math.round(bot.ping)}ms.
            `)
            .addField("<a:yukleniyor:505059163404107786> Versiyonlar", stripIndents`
            <a:BugHanter:504229364402225163> Discord.js: v${version}
            <a:BugHanter:504229364402225163> Node.js: ${process.version}
            `)
            .addField("<a:Staff:504229364729118730> CPU", `\`\`\`md\n${os.cpus().map(i => `${i.model}`)[0]}\`\`\``)
            .addField("<a:Staff:504229364729118730> CPU Kullanımı", `\`${percent.toFixed(2)}%\``)
            .addField("<a:Staff:504229364729118730> Bit", `\`${os.arch()}\``, true)
            .addField("<a:Staff:504229364729118730> İşletim Sistemi", `\`\`${os.platform()}\`\``) 
        message.channel.send(embedStats)
    });
};

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ['i'],
    permLevel: `Yetki gerekmiyor. (${0})`
  };
  
  exports.help = {
    name: 'botayrıntı',
    category: "bot",
    description: 'Botun istatistiklerini gösterir.',
    usage: '.botayrıntı'
  };
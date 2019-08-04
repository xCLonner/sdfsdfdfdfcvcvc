const Discord = require("discord.js");
const ms = require("ms");
const fs = require('fs');

module.exports.run = async (client, message, args) => {

    if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.sendEmbed(new Discord.RichEmbed().setDescription('Bu komudu kullanmak için **Mesajları yönet** yetkisine sahip olmalısın.').setColor('RED'));
    let tomute = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
    if (!tomute) return message.channel.sendEmbed(new Discord.RichEmbed().setDescription("Üye bulamadım.").setColor('#36393F'));
    if (tomute.hasPermission("MANAGE_MESSAGES")) return message.channel.sendEmbed(new Discord.RichEmbed().setDescription('Seninle aynı rütbede olan yada senden daha yüksek rütbede olan birini susturmaya çalıştın.').setColor('#36393F'));
    let muterole = message.guild.roles.find(`name`, "Susturulmuş");

    if (!muterole) {
        try {
            muterole = await message.guild.createRole({
                name: "Susturulmuş",
                color: "#FF0000",
                permissions: []
            })
            message.guild.channels.forEach(async (channel, id) => {
                await channel.overwritePermissions(muterole, {
                    SEND_MESSAGES: false,
                    ADD_REACTIONS: false
                });
            });
        } catch (e) {
            console.log(e.stack);
        }
    }

    let mutetime = args[1];
    if (!mutetime) return message.channel.sendEmbed(new Discord.RichEmbed().setDescription("Bir zaman girmedin! \n s = saniye \n m = dakika \n h = saat \n d = gün").setColor('#36393F'));
    let reason = args.slice(2).join(' ');
    if (!reason) return message.channel.sendEmbed(new Discord.RichEmbed().setDescription("Bir sebep girmedin!").setColor('#36393F'));
    await (tomute.addRole(muterole.id));
    try {
      const embedanan = new Discord.RichEmbed()
    .setColor('RANDOM')
    .setTimestamp()
    .addField('<a:yaziyor:504229364045578240> Sunucun Adı', message.guild.name)
    .addField('<a:blobBan:504229377605763072> Eylem', 'Susturma')
    .addField('<a:yaziyor:504229364045578240> Susturulan Kullanıcı', `<@${tomute.id}>`)
    .addField('<a:yaziyor:504229364045578240> Susturan Yetkili:', `<@${message.author.id}>`)
    .addField('<a:yaziyor:504229364045578240> Susturma Süresi:', `${ms(ms(mutetime))}`)
    .addField('<a:TrollDance:504229371821686794> Sebep:', `${reason}`)
    .setFooter('Morf3u5 <a:kopkop:5042293645406371862018> | Susturma Sistemi', client.user.avatarURL);
    message.channel.send(embedanan)
    } catch (e) { // eğer hata olursa bu hatayı öğrenmek için hatayı konsola gönderelim.
      return console.log(e)
    }
    setTimeout(function() {
        tomute.removeRole(muterole.id);
        message.channel.sendEmbed(new Discord.RichEmbed().setDescription(`<@${tomute.id}> isimli üye artık konuşabilir!`).setColor('#36393F'));
    }, ms(mutetime));

}

exports.conf = {
    aliases: [""]
}

exports.help = {
    name: "sustur"
}
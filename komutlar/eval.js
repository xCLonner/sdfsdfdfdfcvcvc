const Discord = require('discord.js')
const util = require('util');
const tokenuyari = `SyntaxError: Unexpected token (token protect heçkırs and ayyildiztim veleds)`

exports.run = async (client, message, args) => {
    if(!args[0]) {
        return message.reply('g!eval kod')
    }
    const code = args.join(' ');
    if(code.match(/(client.token)/g)) {
        const newEmbed = new Discord.RichEmbed()
            .addField('Hata çıktı;', `\`\`\`xl\n${tokenuyari}\`\`\``)
            .setColor('#FF0000');
        message.channel.send(newEmbed);
        return
    }

    function clean(text) {
        if (typeof text !== 'string')
            text = require('util').inspect(text, { depth: 0 })
        text = text
            .replace(/`/g, '`' + String.fromCharCode(8203))
            .replace(/@/g, '@' + String.fromCharCode(8203))
        return text;
    };

    const evalEmbed = new Discord.RichEmbed().setColor('RANDOM')
    try {
        var evaled = clean(await eval(code));
        if(evaled.startsWith('NDc4O')) evaled = tokenuyari;
        if (evaled.constructor.name === 'Promise') evalEmbed.setDescription(`\`\`\`\n${evaled}\n\`\`\``)
        else evalEmbed.setDescription(`\`\`\`xl\n${evaled}\n\`\`\``)
        const newEmbed = new Discord.RichEmbed()
            .addField('<a:girme:505354294795436034> Giriş', `\`\`\`javascript\n${code}\n\`\`\``)
            .addField('<a:cikma:505354262746890260> Çıkış', `\`\`\`xl\n${evaled}\`\`\``)
            .setColor('RANDOM')
        message.channel.send(newEmbed);
    }
    catch (err) {
        evalEmbed.addField('Hata çıktı;', `\`\`\`xl\n${err}\n\`\`\``);
        evalEmbed.setColor('#FF0000');
        message.channel.send(evalEmbed);
    }
}

exports.conf = {
    enabled: true,
    guildOnly: true,
    aliases: [],
    permLevel: 4
}

exports.help = {
    name: 'eval',
    description: 'Yazılan kodu çalıştırır.',
    usage: 'eval [kod]'
}
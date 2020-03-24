const Discord = require('discord.js');
const client = new Discord.Client();
const fs = require('fs');

let ip = fs.readFileSync('ip.txt').toString();

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
    client.channels.fetch('690700442866286612').then(channel => {
        console.log('Fetched '+channel.name)

        setInterval(function() {
            const newIp = fs.readFileSync('ip.txt').toString();
            if(ip != newIp) {
                ip = newIp;
                announceChannel.send('The server IP has changed to ' + ip);
            }
        }, 10000);
    }).catch(console.error);
});

client.on('message', message => {
    if (message.content.toLowerCase() === 'ip' || message.content.toLowerCase() === 'ip?' || message.content.toLowerCase() === 'lp' || message.content.toLowerCase().includes('ip?')) {
        ip = fs.readFileSync('ip.txt').toString();
        message.reply('The server IP is currently ' + ip);
    }
});

client.login('NjkyMDIwOTI3NjA4NzgyODU4.XnodNA.rQfukWGTF1KDI8BwYKC_YPV77oo');

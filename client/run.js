var fs=require('fs');
var request=require('request');
var publicIp=require('public-ip');

const Discord = require('discord.js');
const client = new Discord.Client();

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
    client.channels.fetch('690700442866286612').then(channel => {
        console.log('Fetched '+channel.name)

        performIpCheck(channel);
    }).catch(console.error);
});

client.login('NjkyMDIwOTI3NjA4NzgyODU4.XnodNA.rQfukWGTF1KDI8BwYKC_YPV77oo');

function performIpCheck(announceChannel) {
    var baseUrl = 'http://ctrekker.mjtrekkers.com/utilities/DynamicIpTracker/';
    var computerName = 'NONE';

    publicIp.v4().then(function(ip) {
        try {
            if(fs.readFileSync('ip.txt').toString()!==ip) {
                fs.appendFileSync('changes.txt', getTimeStamp()+' -> '+ip + '\n');
                announceChannel.send('The server IP has changed to ' + ip);
            }
        } catch(err) {};

        fs.writeFileSync('ip.txt', ip);

        request.post(
            baseUrl + 'update.php?name=' + computerName + '&ip='+ip+'&key=GgYUJRXrAWJpdtICCDsq',
            {},
            function (error, response, body) {
                if (!error && response.statusCode === 200) {
                    fs.writeFileSync('last_success.txt', getTimeStamp());
                    client.destroy();
                }
            }
        );
    }).catch(function(err) {
        console.log(err);
    });
}

function getTimeStamp() {
    var now = new Date();
    return ((now.getMonth() + 1) + '/' +
        (now.getDate()) + '/' +
        now.getFullYear() + " " +
        now.getHours() + ':' +
        ((now.getMinutes() < 10)
            ? ("0" + now.getMinutes())
            : (now.getMinutes())) + ':' +
        ((now.getSeconds() < 10)
            ? ("0" + now.getSeconds())
            : (now.getSeconds())));
}
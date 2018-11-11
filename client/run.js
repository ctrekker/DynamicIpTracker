var fs=require('fs');
var request=require('request');
var externalip=require('externalip');

var baseUrl = 'http://ctrekker.mjtrekkers.com/utilities/DynamicIpTracker/';
var computerName = 'NONE';

externalip(function(err, ip) {
    if(err) throw err;
    try {
        if(fs.readFileSync('ip.txt').toString()!==ip) {
            fs.appendFileSync('changes.txt', getTimeStamp()+' -> '+ip);
        }
    } catch(err) {};

    fs.writeFileSync('ip.txt', ip);
    
    request.post(
        baseUrl + 'update.php?name=' + computerName + '&ip='+ip+'&key=GgYUJRXrAWJpdtICCDsq',
        {},
        function (error, response, body) {
            if (!error && response.statusCode === 200) {
                fs.writeFileSync('last_success.txt', getTimeStamp());
            }
        }
    );
});

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
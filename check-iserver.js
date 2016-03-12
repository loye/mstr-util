var colors = require('colors');
var Client = require('ssh2').Client;
var _ = require('underscore');

var sshConfig = {
  port: 443,
  user: '',
  password: ''
};

var destServer = _.extend({host: ''}, sshConfig);
var conn = new Client();
conn.on('ready', function () {
  //console.log('connected to ' + destServer.host);
  conn.exec('uptime', function (err, stream) {
    if (err) {
      console.log(colors.red('exec error from ' + destServer.host + ': ' + err));
      conn.end();
    }
    stream.on('close', function (code, signal) {
      //console.log('stream closed with success');
      conn.end();
    }).on('data', function (data) {
      console.log('data from ' + destServer.host + ': ' + data);


    }).stderr.on('data', function (data) {
        console.log(colors.red('error from ' + destServer.host + ': ' + data));
      });
  });
}).connect(destServer);



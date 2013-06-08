var https = require('https');

console.log('Setting up');

var interval = 240000; //14400000

setInterval(function() {
  var apiEventNamesGet = https.request({host:'api.guildwars2.com', path:'/v1/event_names.json', method:'GET'}, function(res) {
    console.log('STATUS: ' + res.statusCode);
    console.log('HEADERS: ' + JSON.stringify(res.headers));
    var content = '';
 
    res.on('data', function (chunk) {
      content += chunk;
    });
    res.on('end', function() {
      console.log('*********** Done');
      var eventArray = JSON.parse(content);

      eventArray.forEach(function(event) {
        console.log('Name: ' + event.name);
      });
    });
  });
  apiEventNamesGet.end();
}, interval);
/*
var options = {host:'api.guildwars2.com',
               path:'/v1/event_names.json',
               method:'GET'};
               
var apiEventNamesGet = https.request(options, function(res) {
  console.log('STATUS: ' + res.statusCode);
  console.log('HEADERS: ' + JSON.stringify(res.headers));
  var content = '';
 
  res.on('data', function (chunk) {
    content += chunk;
  });
  res.on('end', function() {
    console.log('*********** Done');
    var eventArray = JSON.parse(content);

    eventArray.forEach(function(event) {
      console.log('Name: ' + event.name);
    });
  });
}).end();
*/
var https = require('https');
var gw2events = require('./mysql/gwevents');

var edb = new gw2events.EventsDB({host:'192.168.91.161', user:'gw2events', password:'gw2events'});

console.log('Setting up');

var interval = 240000; //14400000

function jsonResponseHandler(res, cb)  {
  console.log('STATUS: ' + res.statusCode);
  console.log('HEADERS: ' + JSON.stringify(res.headers));
  var content = '';
  res.on('data', function (chunk) {
    content += chunk;
  });
  res.on('end', function() {
    cb(JSON.parse(content));
  });
}

function fetchEventNames(cb) {
  var apiEventNamesGet = https.request({host:'api.guildwars2.com', path:'/v1/event_names.json', method:'GET'}, function(res) {
    jsonResponseHandler(res, cb);
  });
  apiEventNamesGet.end();
}

function fetchMapNames(cb) {
  var apiEventNamesGet = https.request({host:'api.guildwars2.com', path:'/v1/map_names.json', method:'GET'}, function(res) {
    jsonResponseHandler(res, cb);
  });
  apiEventNamesGet.end();
}

function fetchWorldNames(cb) {
  var apiEventNamesGet = https.request({host:'api.guildwars2.com', path:'/v1/world_names.json', method:'GET'}, function(res) {
    jsonResponseHandler(res, cb);
  });
  apiEventNamesGet.end();
}

function fetchEventState(world_id, cb) {
  var apiEventNamesGet = https.request({host:'api.guildwars2.com', path:'/v1/events.json?world_id=' + world_id, method:'GET'}, function(res) {
    jsonResponseHandler(res, cb);
  });
  apiEventNamesGet.end();
}

fetchEventNames(function(events) {
  console.log('Completed the call!');
  events.forEach(function(event) {
    edb.insertEvent(event);
  });
});

fetchWorldNames(function(worlds) {
  console.log('Completed the call!');
  worlds.forEach(function(world) {
    edb.insertWorld(world);
  });
});

fetchWorldNames(function(maps) {
  console.log('Completed the call!');
  maps.forEach(function(map) {
    edb.insertMap(map);
  });
});

setInterval(function() {
  edb.fetchWorlds(function (results) {
    results.forEach(function(world) {
      // Build an index of existing events by event_id for a given world.
      var existing_events = [];
      edb.fetchEventState(world.server_id, function(results) {
        results.forEach(function(event_state) {
          existing_events[event_state.event_id] = event_state;
        });
      });
      fetchEventState(world.server_id, function(event_states) {
        event_states.events.forEach(function(event_state) {
          if (existing_events[event_state.event_id]) {
            if (existing_events[event_state.event_id].state != event_state.state) {
              edb.updateEventState(event_state, existing_events[event_state.event_id]);
            }
          } else {
            edb.insertEventState(event_state);
          }
        });
      });
    });
  });
}, 30000);

/*
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
*/
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
var gw2events = require('../mysql/gwevents');
var edb = new gw2events.EventsDB({host:'192.168.91.161', user:'gw2events', password:'gw2events'});
/*
 * GET home page.
 */

exports.index = function(req, res) {
  edb.fetchWorlds(function (results) {
      res.render('index', { title: 'GW2 Events', worlds: results, menu:'home' });
  });
};
var gw2events = require('../mysql/gwevents');
var edb = new gw2events.EventsDB({host:'192.168.91.161', user:'gw2events', password:'gw2events'});
/**
 * World Routes.
 */

exports.index = function(req, res){
  res.render('world', { title: 'GW2 Events :. Worlds', menu:'world' });
};

exports.view = function(req, res){
  var id = req.params.id;
  res.render('world', { title: 'GW2 Events :. World', menu:'world' });
};

exports.events = function(req, res) {
  var id = req.params.id;
  res.render('world', { title: 'GW2 Events :. World Events', menu:'world' });
};
var mysql = require('mysql');

function EventsDB(options) {
  this.pool  = mysql.createPool({
    host : options.host,
    user : options.user,
    password : options.password,
    database : 'gw2events'
  });
}

EventsDB.prototype.insertEvent = function(event) {
  this.pool.getConnection(function(err, connection) {
    if (err) throw err;
    connection.query('SELECT id FROM gw2_events where server_id = '
      + connection.escape(event.id), function(err, rows) {
        if (err) throw err;
        var dbEvent = {server_id:event.id, name:event.name};
        if (rows.length == 0) {
          connection.query('INSERT INTO gw2_events SET ?', dbEvent, function(err, result) {
            connection.end();
          });
        } else {
          connection.query('UPDATE gw2_events SET ? WHERE id = ?', [dbEvent, rows[0]], function(err, result) {
            connection.end();
          });
        }
    });
  });
};

EventsDB.prototype.insertMap = function(map) {
  this.pool.getConnection(function(err, connection) {
    if (err) throw err;
    connection.query('SELECT id FROM gw2_maps where server_id = '
      + connection.escape(map.id), function(err, rows) {
        if (err) throw err;
        var dbMap = {server_id:map.id, name:map.name};
        if (rows.length == 0) {
          connection.query('INSERT INTO gw2_maps SET ?', dbMap, function(err, result) {
            connection.end();
          });
        } else {
          connection.query('UPDATE gw2_maps SET ? WHERE id = ?', [dbMap, rows[0]], function(err, result) {
            connection.end();
          });
        }
    });
  });
};

EventsDB.prototype.insertWorld = function(world) {
  this.pool.getConnection(function(err, connection) {
    if (err) throw err;
    connection.query('SELECT id FROM gw2_worlds where server_id = '
      + connection.escape(world.id), function(err, rows) {
        if (err) throw err;
        var dbWorld = {server_id:world.id, name:world.name};
        if (rows.length == 0) {
          connection.query('INSERT INTO gw2_worlds SET ?', dbWorld, function(err, result) {
            connection.end();
          });
        } else {
          connection.query('UPDATE gw2_worlds SET ? WHERE id = ?', [dbWorld, rows[0]], function(err, result) {
            connection.end();
          });
        }
    });
  });
};

EventsDB.prototype.updateEventState = function(event_state, old_event_state) {
  this.pool.getConnection(function(err, connection) {
    if (err) throw err;
    event_state.created = new Date();
    connection.query('UPDATE gw2_event_states SET ? WHERE id = ?',
      [event_state, old_event_state.id], function(err, result) {
      connection.end();
    });
    // Create a history record.
    var history = {
      world_id: old_event_state.world_id,
      map_id: old_event_state.map_id,
      event_id: old_event_state.event_id,
      state: old_event_state.state
    };
    connection.query('INSERT INTO gw2_event_state_history SET ?',
      history, function(err, result) {
      connection.end();
    });
  });
}

EventsDB.prototype.insertEventState = function(event_state) {
  this.pool.getConnection(function(err, connection) {
    if (err) throw err;
    connection.query('INSERT INTO gw2_event_states SET ?', event_state, function(err, rows) {
      connection.end();
    });
  });
};

EventsDB.prototype.fetchWorlds = function(cb) {
  this.pool.getConnection(function(err, connection) {
    connection.query('SELECT * from gw2_worlds order by name', function(err, results) {
      if (err) throw err;
      
      cb(results);
      connection.end();
    });
  });
};

EventsDB.prototype.fetchEventState = function(world_id, cb) {
  this.pool.getConnection(function(err, connection) {
    if (err) throw err;
    connection.query('SELECT * FROM gw2_event_states where world_id = ?', world_id, function(err, results) {
      if (err) throw err;
      
      cb(results);
      connection.end();
    });
  });
};


module.exports.EventsDB = EventsDB;

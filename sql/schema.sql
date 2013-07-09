# Creates the GW2 Database for MySQL
# create database gw2events;

# A List of the GW2 Events.
CREATE TABLE gw2_events (
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  server_id VARCHAR(40) NOT NULL,
  name VARCHAR(255) NOT NULL,
  UNIQUE(server_id)
);

# A list of the GW2 Maps
CREATE TABLE gw2_maps (
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  server_id INT NOT NULL,
  name VARCHAR(255) NOT NULL,
  UNIQUE(server_id)
);

# A list of the GW2 Worlds
CREATE TABLE gw2_worlds (
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  server_id INT NOT NULL,
  name VARCHAR(255) NOT NULL,
  UNIQUE(server_id)
);

# A list of the current event state, with a date of when that state became the current state.
CREATE TABLE gw2_event_states (
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  world_id INT NOT NULL,
  map_id INT NOT NULL,
  event_id VARCHAR(40) NOT NULL,
  state VARCHAR(40) NOT NULL,
  created TIMESTAMP NOT NULL,
  UNIQUE KEY idx_state_key (world_id, map_id, event_id)
);

# Used to track when the event state as been changed.
CREATE TABLE gw2_event_state_history (
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  world_id INT NOT NULL,
  map_id INT NOT NULL,
  event_id VARCHAR(40) NOT NULL,
  state VARCHAR(40) NOT NULL,
  created TIMESTAMP NOT NULL
);
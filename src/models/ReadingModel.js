const db = require('../config/db');

// saves one reading from the ESP32
exports.insert = (deviceId, r) =>
  db.query(
    `INSERT INTO readings (device_id, soil_moisture, soil_raw, air_temp, air_humidity, pump_on)
     VALUES ($1, $2, $3, $4, $5, $6)`,
    [deviceId, r.soil_moisture, r.soil_raw, r.air_temp, r.air_humidity, r.pump_on]
  );

// readings for charts, newest `hours` hours, oldest first
exports.listByDevice = async (deviceId, hours) => {
  const { rows } = await db.query(
    `SELECT soil_moisture, air_temp, air_humidity, created_at
     FROM readings
     WHERE device_id = $1 AND created_at >= now() - ($2 * interval '1 hour')
     ORDER BY created_at`,
    [deviceId, hours]
  );
  return rows;
};
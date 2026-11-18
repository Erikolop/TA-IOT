const db = require('../config/db');

// every event joined with its device's name and plant
const WITH_DEVICE = `
  SELECT e.*, d.name AS device_name, d.plant
  FROM watering_events e
  JOIN devices d ON d.id = e.device_id
`;

// saves a finished watering cycle reported by the ESP32
// started_at is worked out from the duration, because the ESP32 has no clock
exports.insert = (deviceId, e) =>
  db.query(
    `INSERT INTO watering_events
       (device_id, trigger, duration_s, moisture_before, moisture_after, started_at, ended_at)
     VALUES ($1, $2, $3, $4, $5, now() - ($3::int * interval '1 second'), now())`,
    [deviceId, e.trigger, e.duration_s, e.moisture_before, e.moisture_after]
  );

// the 100 most recent events, newest first (Watering Log screen)
exports.list = async () => {
  const { rows } = await db.query(`${WITH_DEVICE} ORDER BY e.ended_at DESC LIMIT 100`);
  return rows;
};

// one event (Event Detail screen)
exports.findById = async (id) => {
  const { rows } = await db.query(`${WITH_DEVICE} WHERE e.id = $1`, [id]);
  return rows[0];
};
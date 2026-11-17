const db = require('../config/db');

const UPDATABLE = ['name', 'plant', 'mode', 'dry_threshold', 'wet_threshold', 'max_run_s', 'cooldown_min', 'manual_pump'];

const WITH_LATEST = `
    SELECT d.*, r.soil_moisture, r.air_temp, r.air_humidity, r.pump_on, r.created_at AS reading_at
    FROM devices d
    LEFT JOIN LATERAL (
        SELECT * FROM readings WHERE device_id = d.id ORDER BY id DESC LIMIT 1
    ) r ON TRUE
`;

exports.touch = async (hwId) => {
    const {rows} = await db.query(`
        INSERT INTO devices (hw_id) VALUES ($1)
        ON CONFLICT (hw_id) DO UPDATE SET last_seen = now()
        RETURNING *    
    `, [hwId]);
    return rows[0];
};

exports.findByHwId = async (hwId) => {
    const { rows } = await db.query('SELECT * FROM devices WHERE hw_id = $1', [hwId]);
    return rows[0];
};

exports.listAdded = async () => {
    const { rows } = await db.query(`${WITH_LATEST} WHERE d.name IS NOT NULL ORDER BY d.id`);
    return rows; 
};

exports.listNew = async () => {
    const { rows } = await db.query(`
        SELECT id, hw_id, last_seen FROM devices
        WHERE name IS NULL AND last_seen > now() - interval '10 minutes'
        ORDER BY last_seen DESC
    `);
    return rows;
};

exports.findById = async (id) => {
    const { rows } = await db.query(`
        ${WITH_LATEST} WHERE d.id = $1
    `, [id]);
    return rows[0];
};

exports.update = async (id, fields) => {
    const keys = Object.keys(fields).filter((k) => UPDATABLE.includes(k));
    if (!keys.length) return null; 
    const sets = keys.map((k, i) => `${k} = $${i + 1}`).join(', ');
    const { rows } = await db.query(
        `UPDATE devices SET ${sets} WHERE id = $${keys.length + 1} RETURNING *`, [...keys.map((k) => fields[k]), id]
    );
    return rows[0]
}
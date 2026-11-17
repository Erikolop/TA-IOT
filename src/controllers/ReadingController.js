const devices = require('../models/DeviceModel');
const readings = require('../models/ReadingModel');

exports.ingest = async (req, res) => {
    const { hw_id } = req.body;
    if (!hw_id) return res.status(400).json({ error: 'hw_id required'});
    const device = await devices.touch(hw_id);
    await readings.insert(device.id, req.body);
    res.status(201).json({
        added: device.name !== null,
        mode: device.mode,
        dry_threshold: device.dry_threshold,
        wet_threshold: device.wet_threshold,
        max_run_s: device.max_run_s,
        cooldown_min: device.cooldown_min,
        manual_pump: device.manual_pump,
    });
};
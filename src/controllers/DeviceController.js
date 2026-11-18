const devices = require('../models/DeviceModel');
const reading = require('../models/ReadingModel');

exports.list = async (_req, res) => res.json(await devices.listAdded());

exports.listNew = async (_req, res) => res.json(await devices.listNew());

exports.get = async (req, res) => {
    const device = await devices.findById(req.params.id);
    device ? res.json(device) : res.status(404).json({ error: 'Not found' });
};

exports.readings = async (req, res) => {
    const hours = Number(req.query.hours) || 24;
    res.json(await reading.listByDevice(req.params.id, hours));
};

exports.config = async (req, res) => {
    const device = await devices.findByHwId(req.params.hwId);
    if (!device) return res.status(404).json({ error: 'Unknown device' });
    res.json({
        mode:          device.mode,
        dry_threshold: device.dry_threshold,
        wet_threshold: device.wet_threshold,
        max_run_s:     device.max_run_s,
        cooldown_min:  device.cooldown_min,
        manual_pump:   device.manual_pump,
    });
};

exports.update = async (req, res) => {
    const device = await devices.update(req.params.id, req.body);
    if(device === null) return res.status(400).json({ error: 'Nothing to update'});
    device ? res.json(device) : res.status(404).json({ error: 'Not found'});
};

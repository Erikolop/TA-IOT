const devices = require('../models/DeviceModel');
const events = require('../models/EventModel');

exports.create = async (req, res) => {
    const device = await devices.findByHwId(req.body.hw_id);
    if (!device) return res.status(404).json({ error: 'Unknown device'});
    await events.insert(device.id, req.body);
    res.status(201).json({ ok: true });
};

exports.list = async (_req, res) => res.json(await events.list());

exports.get = async (req, res) => {
    const event = await events.findById(req.params.id);
    event ? res.json(event) : res.status(404).json({ error: 'Not found'});
};
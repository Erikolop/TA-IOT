const {fleetKey} = require('../config/env');

module.exports = (req, res, next) =>
    req.header('x-fleet-key') === fleetKey ? next() : res.status(401).json({error: 'Bad Key'});
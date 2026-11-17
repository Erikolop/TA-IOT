const router = require('express').Router();

router.get('/health', (_req, res) => res.json({ ok: true }));
router.use('/devices', require('./DeviceRoutes'));
router.use('/readings', require('./ReadingRoutes'));
router.use('/events', require('./EventRoutes'));
module.exports = router;
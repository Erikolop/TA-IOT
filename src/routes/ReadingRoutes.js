const router = require('express').Router();
const wrap = require('../utils/asyncHandler');
const fleetAuth = require('../middleware/fleetAuth');
const c = require('../controllers/ReadingController');

router.post('/', fleetAuth, wrap(c.ingest));
module.exports = router;
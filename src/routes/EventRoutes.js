const router = require('express').Router();
const wrap = require('../utils/asyncHandler');
const fleetAuth = require('../middleware/fleetAuth');
const c = require('../controllers/EventController');

router.post('/', fleetAuth, wrap(c.create));
router.get('/', wrap(c.list));
router.get('/:id', wrap(c.get));
module.exports = router;
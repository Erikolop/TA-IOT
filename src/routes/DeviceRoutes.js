const router = require('express').Router();
const wrap = require('../utils/asyncHandler');
const c = require('../controllers/DeviceController');

router.get('/', wrap(c.list));
router.get('/new', wrap(c.listNew)); // keep above '/:id'
router.get('/:id', wrap(c.get));
router.get('/:id/readings', wrap(c.readings));
router.patch('/:id', wrap(c.update));
module.exports = router;
const { generateSchedule } = require('../controllers/aiController');
const router = require('express').Router();

router.post('/generate-schedule', generateSchedule);

module.exports = router;
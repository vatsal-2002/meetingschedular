const express = require('express');
const router = express.Router();
const schedule = require('../controllers/schedule');
const authMiddleware = require('../middleware/auth');

router.post('/schedules', authMiddleware.verifyToken, schedule.createSchedule);
router.get('/schedules', schedule.getAllSchedules);
router.get('/schedules/:id', authMiddleware.verifyToken, authMiddleware.verifyschedule, schedule.getScheduleById);
router.patch('/schedules/:id', authMiddleware.verifyToken, authMiddleware.verifyschedule, schedule.updateScheduleById);
router.delete('/schedules/:id', authMiddleware.verifyToken, authMiddleware.verifyschedule, schedule.deleteScheduleById);

router.get('/schedule/:id/', authMiddleware.verifyToken, schedule.userSchedules);

module.exports = router;

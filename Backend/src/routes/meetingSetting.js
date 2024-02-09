const express = require('express');
const router = express.Router();
const meetingSetting = require('../controllers/meetingSetting');
const authMiddleware = require('../middleware/auth');

router.post('/meetingSettings', authMiddleware.verifyToken, meetingSetting.createMeetingSetting);
router.get('/meetingSettings/:id', authMiddleware.verifyToken, meetingSetting.getMeetingSettingById);
router.get('/meetingSettings', meetingSetting.getAllMeetingSettings);
router.patch('/meetingSettings/:id', authMiddleware.verifyToken, authMiddleware.verifymeetingSetting, meetingSetting.updateMeetingSettingById);
router.delete('/meetingSettings/:id', authMiddleware.verifyToken, authMiddleware.verifymeetingSetting, meetingSetting.deleteMeetingSettingById);

router.get('/meeting/:id/', authMiddleware.verifyToken, meetingSetting.userMeetingSettings);

module.exports = router;

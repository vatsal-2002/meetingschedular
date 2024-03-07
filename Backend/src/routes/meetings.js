const express = require('express');
const router = express.Router();
const meeting = require('../controllers/meetings');
const authMiddleware = require('../middleware/auth');

router.post('/slotbooked', authMiddleware.verifyToken, meeting.createSlot);
router.get('/slotbooked/:id/', authMiddleware.verifyToken, meeting.getMeetingDetails);

module.exports = router;
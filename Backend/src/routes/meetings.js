const express = require('express');
const router = express.Router();
const meeting = require('../controllers/meetings');
const authMiddleware = require('../middleware/auth');

router.post('/slotbooked', authMiddleware.verifyToken, meeting.createSlot);

module.exports = router;
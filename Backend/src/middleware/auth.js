const jwt = require('jsonwebtoken');
const db = require('../config/db');
    

const verifyToken = (req, res, next) => {
    const userToken = req.headers['authorization'];

    if (!userToken) {
        return res.status(403).json({ error: "Invalid or missing token" });
    }

    const token = userToken;

    jwt.verify(token, process.env.SECRET_KEY, (err, authData) => {
        if (err) {
            console.error("Error verifying token:", err);
            return res.status(403).json({ error: "Invalid token" });
        }

        // authData has the 'id' property
        if (!authData || !authData.id) {
            console.error("Invalid authData:", authData);
            return res.status(403).json({ error: "Invalid token format" });
        }

        req.user = authData;
        req.authData = authData;
        // console.log("Decoded token:", authData);
        next();
    });
};

const verifyschedule = (req, res, next) => {
    const userId = req.authData.id;
    const scheduleId = req.params.id;
    const selectQuery = `SELECT userId FROM schedules WHERE id = ?`;

    db.query(selectQuery, [scheduleId], (error, results) => {
        if (error) {
            console.error('Internal Server Error inside query:', error);
            console.log('Inside verifyOwnership middleware');
            return res.json({ error });
        }
        // console.log('verifyOwnership - req.authData:', req.authData);
        // console.log('verifyOwnership - req.params:', req.params);

        if (results.length === 0) {
            return res.status(404).json({ error: 'Schedule not found' });
        }

        const scheduleUserId = results[0].userId;

        // console.log('verifyOwnership - userId:', userId);
        // console.log('verifyOwnership - scheduleUserId:', scheduleUserId);

        if (scheduleUserId !== userId) {
            return res.status(403).json({ error: "Unauthorized: Schedule does not belong to the authenticated user." });
        }

        req.params.userId = userId; // Store userId in req.params
        next();
    });
};

const verifymeetingSetting = (req, res, next) => {
    const userId = req.authData.id;
    const meetingId = req.params.id;
    const selectQuery = `SELECT userId FROM meeting_Settings WHERE id = ?`;

    db.query(selectQuery, [meetingId], (error, results) => {
        if (error) {
            console.error('Internal Server Error inside query:', error);
            console.log('Inside verifyOwnership middleware');
            return res.status(500).json({ error: 'Internal Server Error' });
        }

        // console.log('verifyOwnership - req.authData:', req.authData);
        // console.log('verifyOwnership - req.params:', req.params);

        if (results.length === 0) {
            return res.status(404).json({ error: 'Meeting Setting not found' });
        }

        const meetingUserId = results[0].userId;

        // console.log('verifyOwnership - userId:', userId);
        // console.log('verifyOwnership - meetingUserId:', meetingUserId);

        if (meetingUserId !== userId) {
            return res.status(403).json({ error: "Unauthorized: Meeting Setting does not belong to the authenticated user." });
        }

        req.params.userId = userId;
        next();
    });
};


module.exports = {
    verifyToken,
    verifyschedule,
    verifymeetingSetting
};

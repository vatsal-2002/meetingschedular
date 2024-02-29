const db = require('../config/db');

const createSlot = (req, res) => {
    try {
        const { meetingSettingsId, guestname, guestemail, slotbooked } = req.body;

        const insertQuery = `INSERT INTO meeting (meetingSettingsId, guestname, guestemail, slotBooked) VALUES (?, ?, ?, ?)`;
        const values = [meetingSettingsId, guestname, guestemail, JSON.stringify(slotbooked)];

        db.query(insertQuery, values, (error, results) => {
            if (error) {
                console.log(error, 'Internal Server Error inside query');
                return res.json({ error });
            }

            const selectQuery = `SELECT guestname, guestemail, slotBooked FROM meeting WHERE id = ?`;
            db.query(selectQuery, [results.insertId], (selectError, selectResults) => {
                if (selectError) {
                    console.log('Internal Server Error for select');
                    return res.json({ error: selectError });
                }

                const schedule = selectResults[0];
                res.status(201).json(schedule);
            });
        });
    } catch (err) {
        console.error('Error in createSlot:', err);
        return res.json({ error: err.message });
    }
};

const userMeetings = (req, res) => {
    const userId = req.params.id;
    try {
        // const selectQuery = `SELECT  id , meetingSettingsId , guestname , guestemail, slotbooked FROM meeting where userId = ? AND deletedAt IS NULL`;
        const selectQuery = `SELECT * FROM meeting m JOIN meeting_settings ms ON m.meetingSettingsId = ms.id WHERE userId = ? AND deletedAt IS NULL;`;


        db.query(selectQuery, [userId], (error, results) => {
            if (error) {
                console.log(error, 'Internal Server Error inside query');
            } else {
                const schedules = results.map(schedule => schedule);
                res.status(200).json(schedules);
            }
        });
    } catch (err) {
        console.error('Error in getAllSchedules:', err);
    }
};

module.exports = {
    createSlot,
    userMeetings
};


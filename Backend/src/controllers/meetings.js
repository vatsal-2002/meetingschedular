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

            const selectQuery = `SELECT meetingSettingsId, guestname, guestemail, slotBooked FROM meeting WHERE id = ?`;
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
        return res.json({ error: err.message || "Internal server error" });
    }
};

const getMeetingDetails = (req, res) => {
    try {
        const meetingId = req.params.id; // Assuming the meetingId is passed as a route parameter
        console.log('Meeting ID:', meetingId);
        const selectQuery = `SELECT * FROM meeting WHERE id = ?`;
        db.query(selectQuery, [meetingId], (error, results) => {
            if (error) {
                console.log('Database Error:', error); // Add this line for logging
                //   console.log('Internal Server Error for meeting details');
                return res.status(500).json({ error });
            }

            console.log('Query Results:', results); // Add this line for logging

            if (results.length === 0) {
                return res.status(404).json({ message: 'Meeting not found' });
            }

            const meetingDetails = results[0];
            res.status(200).json(meetingDetails);
        });
    } catch (err) {
        console.error('Error in getMeetingDetails:', err);
        return res.status(500).json({ error: err.message || "Internal server error" });
    }
};


module.exports = {
    createSlot,
    getMeetingDetails
};
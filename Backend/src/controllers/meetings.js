const db = require("../config/db");

const createSlot = (req, res) => {
    try {
        const { meetingSettingsId, guestname, guestemail, slotbooked } = req.body;

        const insertQuery = `INSERT INTO meeting (meetingSettingId, guestname, guestemail, slotBooked) VALUES (?, ?, ?, ?)`;
        const values = [
            meetingSettingsId,
            guestname,
            guestemail,
            JSON.stringify(slotbooked),
        ];

        db.query(insertQuery, values, (error, results) => {
            if (error) {
                console.log(error, "Internal Server Error inside query");
                return res.json({ error });
            }

            const selectQuery = `SELECT meetingSettingId, guestname, guestemail, slotBooked FROM meeting WHERE id = ?`;
            db.query(
                selectQuery,
                [results.insertId],
                (selectError, selectResults) => {
                    if (selectError) {
                        console.log("Internal Server Error for select");
                        return res.json({ error: selectError });
                    }

                    const schedule = selectResults[0];
                    res.status(201).json(schedule);
                }
            );
        });
    } catch (err) {
        console.error("Error in createSlot:", err);
        return res.json({ error: err.message || "Internal server error" });
    }
};

const getMeetingDetails = (req, res) => {
    try {
        const userId = req.params.id; // Use req.params for route parameters
        console.log("User ID:", userId);

        if (!userId) {
            console.log("User ID is missing in the request parameters.");
            return res.status(400).json({ error: "User ID is missing" });
        }

        const selectQuery = `
      SELECT 
        meeting.id, meeting.meetingSettingsId, meeting.guestname, meeting.guestemail, meeting.slotbooked, 
        meeting.createdAt, meeting.updatedAt, meeting.deletedAt,
        meeting_settings.id AS settingId, meeting_settings.userId, meeting_settings.scheduleId, 
        meeting_settings.name AS meetingName, meeting_settings.duration, meeting_settings.location, 
        meeting_settings.link, meeting_settings.createdAt AS settingCreatedAt, 
        meeting_settings.updatedAt AS settingUpdatedAt, meeting_settings.deletedAt AS settingDeletedAt
      FROM meeting
      JOIN meeting_settings ON meeting.meetingSettingsId = meeting_settings.id
      WHERE meeting_settings.userId = ?`;

        db.query(selectQuery, [userId], (error, results) => {
            if (error) {
                console.log("Database Error:", error);
                return res.status(404).json({ error });
            }

            console.log("Query Results:", results);

            if (results.length === 0) {
                console.log("No meetings found for User ID:", userId);
                return res.status(404).json({ message: "No meetings found" });
            }

            res.status(200).json(results);
        });
    } catch (err) {
        console.error("Error in getMeetingDetails:", err);
        return res
            .status(404)
            .json({ error: err.message || "Internal server error" });
    }
};

module.exports = {
    createSlot,
    getMeetingDetails,
};
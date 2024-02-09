const db = require('../config/db');

// Create meeting_Settings
const createMeetingSetting = (req, res) => {
  const { scheduleId, name, duration, location, link } = req.body;
  const userId = req.authData.id;

  try {
    const insertQuery = `INSERT INTO meeting_Settings (userId, scheduleId, name, duration, location, link) VALUES (?, ?, ?, ?, ?, ?)`;
    db.query(insertQuery, [userId, scheduleId, name, duration, location, link], (err, results) => {
      if (err) {
        console.error('Error inside query:', err);
        return res.json({ err });
      }

      const newMeetingSettingId = results.insertId; // Get the last inserted ID

      const selectQuery = `SELECT * FROM meeting_Settings WHERE id = ?`;
      db.query(selectQuery, [newMeetingSettingId], (selectError, selectResults) => {
        if (selectError) {
          console.error('Error fetching newly created meeting setting:', selectError);
          return res.json({ error: 'Error fetching newly created meeting setting' });
        }

        const newMeetingSetting = {
          id: newMeetingSettingId,
          userId,
          scheduleId,
          name,
          duration,
          location,
          link,
        };

        res.status(201).json(newMeetingSetting);
      });
    });
  } catch (error) {
    console.error('Catch block error:', error);
    res.json({ error });
  }
};


// Get Meeting_setting By ID
const getMeetingSettingById = (req, res) => {
  try {
    const meetingId = req.params.id;
    const query = 'SELECT id, userId, scheduleId, name, duration, location, link FROM meeting_Settings WHERE id = ?';

    db.query(query, [meetingId], (err, results) => {
      if (err) {
        console.log("server error inside query");
        return res.json({ error: "Server Error inside query" });
      }

      if (results.length === 0) {
        return res.status(404).json({ error: "Meeting not found" });
      }

      const meetingData = results[0];
      res.json(meetingData);
      console.log("Successfully retrieved meeting data by ID");
    });
  } catch (error) {
    res.json({ error: "Internal Server Error" });
  }
};

//  update metting_setting By ID
const updateMeetingSettingById = async (req, res) => {
  const id = Number(req.params.id);
  const { name, duration, location, link } = req.body;

  if (!Number.isInteger(id) || id <= 0)
    return res.status(400).json({ error: "Invalid Meeting ID" });

  try {
    const checkQuery = 'SELECT * FROM meeting_Settings WHERE id = ?';
    db.query(checkQuery, [id], (checkErr, checkResults) => {
      if (checkErr)
        return res.json({ error: "Server Error (Check)" });

      if (checkResults.length === 0)
        return res.status(404).json({ error: "Meeting not found" });

      const updateFields = [], updateValues = [];

      if (name !== undefined) {
        updateFields.push('name = ?');
        updateValues.push(name);
      }

      if (duration !== undefined) {
        updateFields.push('duration = ?');
        updateValues.push(duration);
      }

      if (location !== undefined) {
        updateFields.push('location = ?');
        updateValues.push(location);
      }

      if (link !== undefined) {
        updateFields.push('link = ?');
        updateValues.push(link);
      }

      if (updateFields.length === 0) {
        return res.json({ status: "No fields to update" });
      }

      const updateQuery = `UPDATE meeting_Settings SET ${updateFields.join(', ')} WHERE id = ?`;
      const updateParams = [...updateValues, id];

      db.query(updateQuery, updateParams, (updateErr, updateResults) => {
        if (updateErr)
          return res.json({ error: "Server Error (Update)" });

        const updatedFields = updateFields.map(field => field.split(' = ')[0]);
        res.json({ status: "Meeting updated successfully", updatedFields });
      });
    });
  } catch (error) {
    console.log(error);
    res.json({ error: "Internal Server Error" });
  }
};

// Get All Meeting_settings
const getAllMeetingSettings = (req, res) => {
  try {
    const query = 'SELECT id, userId, scheduleId, name, duration, location, link FROM meeting_Settings';
    db.query(query, (err, results) => {
      if (err) {
        console.log("server error about query");
        return res.json({ error: "Server Error" });
      }
      res.json(results);
      console.log("Successfully retrieved all Meeting Settings Data");
    });
  } catch (error) {
    console.log(error);
    res.json({ error: "Internal Server Error" });
  }
};

// Delete Meeting_settings By ID
const deleteMeetingSettingById = (req, res) => {
  try {
    const meetingId = req.params.id;
    const deleteQuery = 'UPDATE meeting_Settings SET deletedAt = CURRENT_TIMESTAMP() WHERE id = ?';

    db.query(deleteQuery, [meetingId], (err, results) => {
      if (err) {
        console.log("server error about query");
        return res.json({ error: "Server Error" });
      }

      if (results.affectedRows === 0) {
        return res.status(404).json({ error: "Meeting not found" });
      }

      res.json({ status: "Meeting deleted successfully" });
      console.log("Successfully Deleted Meeting Data");
    });
  } catch (error) {
    console.error("Error in deleteMeetingSettingById:", error);
    res.json({ error: "Internal Server Error" });
  }
};


const userMeetingSettings = (req, res) => {
  const userId = req.params.id;
  try {
    const selectQuery = `SELECT id, userId, scheduleId, name, duration, location, link FROM meeting_Settings WHERE userId = ? AND deletedAt IS NULL`;

    db.query(selectQuery, [userId], (error, results) => {
      if (error) {
        console.log(error, 'Internal Server Error inside query');
        res.status(500).json({ error: "Internal Server Error" });
      } else {
        const schedules = results.map(schedule => schedule);
        res.status(200).json(schedules);
      }
    });
  } catch (err) {
    console.error('Error in userMeetingSettings:', err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};


module.exports = {
  createMeetingSetting,
  getMeetingSettingById,
  updateMeetingSettingById,
  getAllMeetingSettings,
  deleteMeetingSettingById,
  userMeetingSettings
};

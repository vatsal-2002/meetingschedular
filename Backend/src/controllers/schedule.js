const db = require('../config/db');
const moment = require('moment-timezone');

// create  Schedule
const createSchedule = (req, res) => {
  try {
    const { isDefault, name, timezone, weeklyhours } = req.body;
    const userId = req.authData.id;

    const defaultTimezone = timezone;
    const defaultWeeklyHours = weeklyhours;

    const insertQuery = `INSERT INTO schedules (userId, isDefault, name, timezone, weeklyhours) VALUES (?, ?, ?, ?, ?)`;
    const values = [userId, isDefault, name, defaultTimezone, JSON.stringify(defaultWeeklyHours)];

    db.query(insertQuery, values, (error, results) => {
      if (error) {
        console.log(error, 'Internal Server Error inside query');
        return res.json({ error });
      }

      const selectQuery = `SELECT id, userId, isDefault, name, timezone, weeklyhours FROM schedules WHERE id = ?`;
      db.query(selectQuery, [results.insertId], (selectError, selectResults) => {
        if (selectError) {
          console.log('Internal Server Error for select');
          return res.json({ error });
        }

        const schedule = selectResults[0];
        res.status(201).json(schedule);
      });
    });
  } catch (err) {
    console.error('Error in createSchedule:', err);
    return res.json({ error: err.message || "Internal server error" });
  }
};


const getScheduleById = (req, res) => {

  try {
    // TimeZone Function
    function convertTimeToTimezone(sourceTimezone, targetTimezone) {
      const sourceMoment = moment.tz(sourceTimezone);
      const convertedMoment = sourceMoment.clone().tz(targetTimezone);
      return {
        sourceTime: sourceMoment.format(),
        sourceTimezone,
        convertedTime: convertedMoment.format(),
        targetTimezone
      };
    }

    const scheduleId = req.params.id;
    const timezone = req.query.timezone;

    const sourceTimezone = timezone;
    const targetTimezone = 'Asia/Dubai';
    const result = convertTimeToTimezone(sourceTimezone, targetTimezone);
    console.log(`Source Time: ${result.sourceTime} ${result.sourceTimezone}`);
    console.log(`Converted Time: ${result.convertedTime} ${result.targetTimezone}`);

    const selectQuery = `SELECT userId, id, isDefault, timezone, weeklyhours FROM schedules WHERE id = ? AND timezone = ?`;
    const userId = req.authData.id;
    db.query(selectQuery, [scheduleId, timezone], (error, results) => {
      if (error) {
        console.error('Error in getScheduleById:', error);
        return res.json({ error });
      }
      if (results.length === 0) {
        return res.status(404).json({ error: 'Schedule not found' });
      }
      const schedule = results[0];
      if (schedule.userId !== userId) {
        return res.status(403).json({ error: "Schedule does not belong to the authenticated user." });
      }
      res.status(200).json(schedule);
    });
  } catch (error) {
    console.error('Error in try-catch block:', error);
    res.json({ error: 'Internal Server Error' });
  }
};

// Get All Schedules
const getAllSchedules = (req, res) => {
  try {
    const selectQuery = `SELECT userId, id, isDefault, timezone, weeklyhours FROM schedules `;

    db.query(selectQuery, (error, results) => {
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

// All userSchedule 
// const userSchedules = (req, res) => {
//   const userId = req.params.id;
//   try {
//     const selectQuery = `SELECT userId, id , name, isDefault, timezone, weeklyhours FROM schedules where userId = ? AND deletedAt IS NULL`;

//     db.query(selectQuery, [userId], (error, results) => {
//       if (error) {
//         console.log(error, 'Internal Server Error inside query');
//       } else {
//         const schedules = results.map(schedule => schedule);
//         res.status(200).json(schedules);
//       }
//     });
//   } catch (err) {
//     console.error('Error in getAllSchedules:', err);
//   }
// };

const userSchedules = (req, res) => {
  const userId = req.params.id;
  try {
    const selectQuery = `SELECT s.userId, s.id, s.name, s.isDefault, s.timezone, s.weeklyhours, m.id AS meetingId, m.guestname, m.guestemail, m.slotbooked 
                         FROM schedules AS s 
                         LEFT JOIN meeting AS m ON s.id = m.meetingSettingsId 
                         WHERE s.userId = ? AND s.deletedAt IS NULL AND m.deletedAt IS NULL`;

    db.query(selectQuery, [userId], (error, results) => {
      if (error) {
        console.log(error, 'Internal Server Error inside query');
        return res.status(500).json({ error });
      } else {
        const schedules = results.map(schedule => ({
          id: schedule.id,
          name: schedule.name,
          isDefault: schedule.isDefault,
          timezone: schedule.timezone,
          weeklyhours: schedule.weeklyhours,
          meeting: {
            id: schedule.meetingId,
            guestname: schedule.guestname,
            guestemail: schedule.guestemail,
            slotbooked: schedule.slotbooked
          }
        }));
        res.status(200).json(schedules);
      }
    });
  } catch (err) {
    console.error('Error in getAllSchedules:', err);
    return res.status(500).json({ error: err.message || "Internal server error" });
  }
};


// Update Schedule By ID
const updateScheduleById = (req, res) => {
  try {
    const scheduleId = req.params.id;
    const { name, timezone, weeklyhours } = req.body;
    const userId = req.authData.id;

    const updateFields = [];
    const updateValues = [];

    if (name) {
      updateFields.push('name = ?');
      updateValues.push(name);
    }

    if (timezone) {
      updateFields.push('timezone = ?');
      updateValues.push(timezone);
    }

    if (weeklyhours) {
      updateFields.push('weeklyhours = ?');
      updateValues.push(JSON.stringify(weeklyhours));
    }

    const updateQuery = `UPDATE schedules SET ${updateFields.join(', ')} WHERE id = ?`;
    const values = [...updateValues, scheduleId];

    db.query(updateQuery, values, (error, results) => {
      if (error) {
        console.log(error, 'Internal Server Error inside update query');
        return res.json({ error });
      }

      if (results.affectedRows === 0) {
        return res.status(404).json({ error: 'Schedule not found' });
      }

      const updatedFields = {};
      updateFields.forEach((field, index) => {
        updatedFields[field.split(' ')[0]] = updateValues[index];
      });

      res.json({
        message: 'Schedule details updated successfully',
        updatedFields
      });
    });
  } catch (err) {
    console.log('Internal server error about query', err);
    return res.json({ error });
  }
};

// Delete Schedule By Id
const deleteScheduleById = (req, res) => {
  try {
    const scheduleId = req.params.id;
    const userId = req.authData.id;

    // Check if the user created the schedule with the given ID
    const selectQuery = 'SELECT userId, deletedAt FROM schedules WHERE id = ?';
    db.query(selectQuery, [scheduleId], (selectError, selectResults) => {
      if (selectError) {
        console.log(selectError, 'Internal Server Error inside select query');
        return res.json({ error: selectError });
      }

      if (selectResults.length === 0) {
        return res.status(404).json({ error: 'Schedule not found' });
      }

      const scheduleUserId = selectResults[0].userId;
      const deletedAt = selectResults[0].deletedAt;

      if (scheduleUserId !== userId) {
        return res.status(403).json({ error: "Access forbidden. Schedule does not belong to the authenticated user." });
      }

      if (deletedAt) {
        return res.status(404).json({ error: 'Schedule already deleted' });
      }

      const updateQuery = 'UPDATE schedules SET deletedAt = CURRENT_TIMESTAMP() WHERE id = ?';
      db.query(updateQuery, [scheduleId], (updateError, updateResults) => {
        if (updateError) {
          console.log(updateError, 'Internal Server Error inside update query');
          return res.json({ error: updateError });
        }

        res.json({ status: "Schedule deleted successfully" });
      });
    });
  } catch (err) {
    console.log(err, 'Internal Server Error');
    return res.json({ error: err });
  }
};


module.exports = {
  createSchedule,
  getScheduleById,
  getAllSchedules,
  userSchedules,
  updateScheduleById,
  deleteScheduleById,
};

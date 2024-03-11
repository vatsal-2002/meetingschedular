SELECT * FROM meetingschedular.schedules;
describe schedules;

SELECT
    meeting.id,
    meeting.meetingSettingsId,
    meeting.guestname,
    meeting.guestemail,
    meeting.slotbooked,
    meeting.createdAt AS meetingCreatedAt,
    meeting.updatedAt AS meetingUpdatedAt,
    meeting.deletedAt AS meetingDeletedAt,
    
    meeting_settings.id AS meetingSettingsId,
    meeting_settings.userId,
    meeting_settings.scheduleId,
    meeting_settings.name AS meetingSettingsName,
    meeting_settings.duration,
    meeting_settings.location,
    meeting_settings.link,
    meeting_settings.createdAt AS meetingSettingsCreatedAt,
    meeting_settings.updatedAt AS meetingSettingsUpdatedAt,
    meeting_settings.deletedAt AS meetingSettingsDeletedAt,

    schedules.id AS scheduleId,
    schedules.userId AS scheduleUserId,
    schedules.isDefault,
    schedules.name AS scheduleName,
    schedules.timezone,
    schedules.weeklyhours,
    schedules.createdAt AS scheduleCreatedAt,
    schedules.updatedAt AS scheduleUpdatedAt,
    schedules.deletedAt AS scheduleDeletedAt

FROM
    meeting
JOIN
    meeting_settings ON meeting.meetingSettingsId = meeting_settings.id
JOIN
    schedules ON meeting_settings.scheduleId = schedules.id;
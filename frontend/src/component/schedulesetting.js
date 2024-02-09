import Schedulesettingsidebar from './schedulesettingsidebar';
import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

const Schedulesetting = () => {
  const [date, setDate] = useState(new Date());

  const onChange = (newDate) => {
    setDate(newDate);
  };

  const today = new Date();
  const [selectedDate, setSelectedDate] = useState(today);
  const [timezone] = useState([
    {
      userId: 32,
      id: 11,
      name: "Default",
      isDefault: 1,
      timezone: "Asia/Gaza",
      weeklyhours: [
        {
          day: 1,
          slots: [
            {
              end: {
                hour: "18",
                minute: "00",
              },
              start: {
                hour: "17",
                minute: "00",
              },
            },
            {
              end: {
                hour: "16",
                minute: "00",
              },
              start: {
                hour: "14",
                minute: "00",
              },
            },
          ],
        },
        {
          day: 2,
          slots: [
            {
              end: {
                hour: "18",
                minute: "00",
              },
              start: {
                hour: "17",
                minute: "00",
              },
            },
          ],
        },
        {
          day: 3,
          slots: [
            {
              end: {
                hour: "18",
                minute: "00",
              },
              start: {
                hour: "17",
                minute: "00",
              },
            },
          ],
        },
        {
          day: 4,
          slots: [
            {
              end: {
                hour: "18",
                minute: "00",
              },
              start: {
                hour: "17",
                minute: "00",
              },
            },
          ],
        },
        {
          day: 5,
          slots: [
            {
              end: {
                hour: "17",
                minute: "30",
              },
              start: {
                hour: "17",
                minute: "00",
              },
            },
          ],
        },

      ],
    },
    // Add more timezone data if needed
  ]);

  const timeDuration = 30; // Set the time duration in minutes

  const getWeeklyHoursForSelectedDay = () => {
    const selectedDay = selectedDate.getDay(); // 0 for Sunday, 1 for Monday, etc.
    const selectedTimeZone = timezone.find(
      (tz) => tz.weeklyhours && tz.weeklyhours.some((day) => day.day === selectedDay)
    );

    if (selectedTimeZone) {
      const selectedDayData = selectedTimeZone.weeklyhours.find((day) => day.day === selectedDay);
      if (selectedDayData) {
        const slots = selectedDayData.slots || [];
        return slots.map((slot) => {
          const startTime = new Date(selectedDate);
          startTime.setHours(parseInt(slot.start.hour), parseInt(slot.start.minute), 0);

          const endTime = new Date(selectedDate);
          endTime.setHours(parseInt(slot.end.hour), parseInt(slot.end.minute), 0);

          const timeSlots = [];
          let currentSlot = new Date(startTime);

          while (currentSlot < endTime) {
            timeSlots.push({
              start: {
                hour: currentSlot.getHours().toString().padStart(2, '0'),
                minute: currentSlot.getMinutes().toString().padStart(2, '0'),
              },
              end: {
                hour: currentSlot.getHours().toString().padStart(2, '0'),
                minute: '00',
              },
            });

            currentSlot.setMinutes(currentSlot.getMinutes() + timeDuration);
          }

          return timeSlots;
        }).flat(); // Flatten the array of arrays
      }
    }

    return [];
  };

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const tileContent = ({ date, view }) => {
    const currentDate = new Date();
    const isAfterToday = date >= currentDate;

    const day = date.getDay();
    const hasData =
      timezone &&
      timezone.some((tz) => tz.weeklyhours && tz.weeklyhours.some((d) => d.day === day));

    return hasData && isAfterToday && view === 'month' ? <div className="blue-dot"></div> : null;
  };

  const handleTileClick = ({ date, view }) => {
    if (!date) {
      return false; // Handle the case where date is undefined
    }

    const day = date.getDay();
    const hasData =
      timezone &&
      timezone.some((tz) => tz.weeklyhours && tz.weeklyhours.some((d) => d.day === day));

    if (!hasData || view !== 'month') {
      return false; // Disable click for days without data or outside the month view
    }

    // Your logic for handling the click on valid days
    setSelectedDate(date);
    // Additional logic if needed

    return true; // Enable click for days with data in the month view
  };


  return (
    <>
      <style>
        {`
          .blue-dot {
            width: 10px;
            height: 10px;
            background-color: blue;
            border-radius: 50%;
            margin: 0 auto;
            margin-top: 3px;
          }

          .disabled-dot {
            width: 10px;
            height: 10px;
            background-color: lightgray;
            border-radius: 50%;
            margin: 0 auto;
            margin-top: 3px;
          }
        `}
      </style>
      <div className="container-fuild">
        <row className="d-flex">
          <div className="col-3">
            <div className="page-wrapper toggled">
              <Schedulesettingsidebar />
            </div>
          </div>

          <div className="col-9 d-flex align-items-center bg-soft-secondary">
            <div className="container create-preview">
              <div className="row d-flex">
                <p>
                  This is a preview. To book an event, share the link with your
                  invitees.
                  <label>View live page</label>
                </p>

                <div className="col-5 d-flex flex-column p-4">
                  <label>VATSAL PRAJAPATI</label>
                  <h3>Event name here</h3>
                  <label>
                    <span className="mdi mdi-clock-time-five-outline"></span>
                    30 min
                  </label>
                  <label>
                    <span className="mdi mdi-map-marker"></span>Add a location
                    for it to show here
                  </label>
                </div>
                <div className="col-7 d-flex align-items-center justify-content-center h-550 preview-right">
                  <div>
                    <h4>Select Date & Times</h4>
                    <div className="d-flex">
                      <div>
                        <Calendar
                          onChange={handleDateChange}
                          value={selectedDate}
                          minDate={today} // Disable selection of dates before today
                          tileContent={tileContent}
                          onClickDay={handleTileClick} // Handle day click
                        />
                      </div>
                      <div>
                        <div className="days-slots d-flex flex-column">
                          {getWeeklyHoursForSelectedDay()
                            .sort((a, b) => {
                              // Convert start times to numbers for comparison
                              const timeA = parseInt(
                                `${a.start.hour}${a.start.minute}`,
                                10
                              );
                              const timeB = parseInt(
                                `${b.start.hour}${b.start.minute}`,
                                10
                              );
                              return timeA - timeB;
                            })
                            .map((slot, index) => (
                              <button
                                key={index}
                              >{`${slot.start.hour}:${slot.start.minute}`}</button>
                            ))}
                        </div>
                      </div>

                      {/* <h2>Weekly Hours for Selected Day:</h2>
        <pre>{JSON.stringify(getWeeklyHoursForSelectedDay(), null, 2)}</pre> */}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </row>
      </div>
    </>
  );

}

export default Schedulesetting
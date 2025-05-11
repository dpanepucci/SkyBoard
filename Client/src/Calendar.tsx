import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';

// User creates an event the chooses the date to add the event too

// User inputs EVENT name to calendar
const userEvent = FullCalendar

// User picks the DATE to add EVENT to.
const userDate = FullCalendar

const Calendar = () => {
  return (
    <div>
      <FullCalendar
        plugins={[dayGridPlugin]}
        initialView="dayGridMonth"
        events={[
          { title: `${userEvent}`, date: `${userDate}` },
        ]}
        height="auto"
      />
    </div>
  );
};

export default Calendar;

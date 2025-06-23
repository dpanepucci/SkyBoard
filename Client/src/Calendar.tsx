import { useState} from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import { v4 as uuidv4 } from 'uuid';

import WeatherSearch from './components/Weather';

const Calendar = () => {
  // User creates an event the chooses the date to add the event too
  const [ events, setEvent ] = useState<{ id: string; title: string; date: string }[]>([]);
  const [sideBar, setSideBar] = useState(true); // SideBar useState for when date is clicked
  const [ selectedDate, setSelectedDate ] = useState(null);
  const [ userEventTitle, setUserEventTitle ] = useState('');
  const [ userEventTime, setUserEventTime ] = useState('');

  // When date is clicked, sidebar opens
 const dateClicked = (info: any) => {
  setSelectedDate(info.dateStr);
  setSideBar(true);
 };


  const handleAddEvent = () => {
    if (userEventTitle && selectedDate) {
      setEvent([
        ...events,
        { id: uuidv4(), title: `${userEventTitle} at ${userEventTime}`, date: selectedDate },
      ]);
    }};

    const handleDeleteData =() => {
      if (userEventTitle && selectedDate) {
        setEvent(events.filter(
          event =>  !(event.title === `${userEventTitle} at ${userEventTime}` && event.date === selectedDate)
        ));
      }
    };


  return (
    <div style={{ display: 'flex' }}>
      {/* Calendar */}
      <div style={{ flex: 3 }}>
        <FullCalendar
          plugins={[dayGridPlugin, interactionPlugin]}
          initialView="dayGridMonth"
          events={events.map(event => ({ ...event, color: 'light blue' }))}
          dateClick={dateClicked}
          height="auto"
        />
      </div>

      {/* Sidebar */}
      {sideBar && (
        <div style={{ flex: 1, padding: '20px', borderLeft: '1px solid #ccc' }}>
          <h3>Add Event</h3>
          <p>Date: {selectedDate}</p>
          <input
            type="text"
            placeholder="Event Title"
            value={userEventTitle}
            onChange={(e) => setUserEventTitle(e.target.value)}
            style={{ width: '100%', marginBottom: '10px' }}
          />
          <input
            type="time"
            value={userEventTime}
            onChange={(e) => setUserEventTime(e.target.value)}
            style={{ width: '100%', marginBottom: '10px' }}
          />
          <button onClick={handleAddEvent} style={{ marginRight: '10px' }}>
            Add Event
          </button>
          <button onClick={handleDeleteData} style={{ marginRight: '10px'}}>
            Delete Event
          </button>
          <WeatherSearch/>
        </div>
      )}
    </div>
  );
};

export default Calendar;

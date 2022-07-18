import moment from 'moment'
import { Calendar, momentLocalizer } from 'react-big-calendar'
import { CalendarEvent } from './CalendarEvent'
import { Navbar } from '../ui/Navbar'
import { messages } from '../../helpers/calendar-es-messages'

import 'react-big-calendar/lib/css/react-big-calendar.css'
import 'moment/locale/es'
import { useState } from 'react'
import { CalendarModal } from './CalendarModal'

const localizer = momentLocalizer(moment)

moment.locale('es')

const events = [{
  title: 'Cumpleaños',
  start: moment().toDate(),
  end: moment().add(2, 'hours').toDate(),
  notes: 'comprar el pastel',
  user: {
    uid: 123,
    name: 'Jhon',
  }
}]

export const CalendarScreen = () => {

  const [lastView, setLastView] = useState(localStorage.getItem('lastView') || 'month')

  const onDoubleClick = (e) => {
    console.log(e)
  }

  const onSelect = (e) => {
    console.log(e)
  }

  const onViewChange = (e) => {
    setLastView(e)
    localStorage.setItem('lastView', e)
  }

  const eventStyleGetter = (event, start, end, isSelected) => {
    const style = {
      display: 'block',
      borderRadius: 0,
      backgroundColor: '#367cf7',
      opacity: 0.7,
      color: 'white',
    }

    return { style }
  }

  return (
    <>
      <Navbar />
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor='start'
        endAccessor='end'
        messages={messages}
        style={{ height: 500 }}
        eventPropGetter={eventStyleGetter}
        onDoubleClickEvent={onDoubleClick}
        onSelectEvent={onSelect}
        onView={onViewChange}
        view={lastView}
        components={{
          event: CalendarEvent
        }}
      />
      <CalendarModal />
    </>
  )
}

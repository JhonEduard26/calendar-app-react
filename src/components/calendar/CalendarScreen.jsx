import { useState } from 'react'
import moment from 'moment'
import { Calendar, momentLocalizer } from 'react-big-calendar'
import { useDispatch, useSelector } from 'react-redux'

import { CalendarEvent } from './CalendarEvent'
import { Navbar } from '../ui/Navbar'
import { messages } from '../../helpers/calendar-es-messages'
import { CalendarModal } from './CalendarModal'
import { setOpenModal } from '../../actions/ui'
import { eventSetActive } from '../../actions/events'
import { AddNewFab } from '../ui/AddNewFab'

import 'react-big-calendar/lib/css/react-big-calendar.css'

const localizer = momentLocalizer(moment)

export const CalendarScreen = () => {
  const dispatch = useDispatch()
  const { events } = useSelector(state => state.calendar)

  const [lastView, setLastView] = useState(localStorage.getItem('lastView') || 'month')

  const onDoubleClick = (e) => {
    dispatch(setOpenModal())
  }

  const onSelect = (e) => {
    dispatch(eventSetActive(e))
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
      <AddNewFab />
      <CalendarModal />
    </>
  )
}

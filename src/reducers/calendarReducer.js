import moment from "moment"
import { types } from "../types/types"

const initialState = {
  events: [
    {
      id: new Date().getTime(),
      title: 'Cumpleaños',
      start: moment().toDate(),
      end: moment().add(1, 'hours').toDate(),
      notes: 'comprar el pastel',
      user: {
        uid: 123,
        name: 'Jhon',
      }
    },
  ],
  activeEvent: null
}

export const calendarReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.eventSetActive:
      return {
        ...state,
        activeEvent: action.payload,
      }
    case types.eventAddNew:
      return {
        ...state,
        events: [...state.events, action.payload]
      }
    case types.eventClearActiveNote:
      return {
        ...state,
        activeEvent: null,
      }
    case types.eventUpdated:
      return {
        ...state,
        events: state.events.map(
          event => event.id === action.payload.id ? action.payload : event)
      }
    default:
      return state
  }
}
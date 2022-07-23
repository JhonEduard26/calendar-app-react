import { fetchWithToken } from "../helpers/fetch"
import { prepareEvents } from "../helpers/prepareEvents"
import { types } from "../types/types"

export const eventSetActive = (event) => ({
  type: types.eventSetActive,
  payload: event,
})

export const eventStartAddNew = (event) => {
  return async (dispatch, getState) => {

    const { uid, name } = getState().auth

    try {
      const resp = await fetchWithToken('/events', event, 'POST')
      const data = await resp.json()

      if (data.ok) {
        event.id = data.event.id
        event.user = {
          _id: uid,
          name,
        }
        dispatch(eventAddNew(event))
      }
    } catch (error) {
      console.log(error)
    }
  }
}

const eventAddNew = (event) => ({
  type: types.eventAddNew,
  payload: event,
})

export const eventClearActiveNote = () => ({
  type: types.eventClearActiveNote,
})

export const eventUpdated = (event) => ({
  type: types.eventUpdated,
  payload: event,
})

export const eventDeleted = () => ({
  type: types.eventDeleted,
})

export const eventStartLoading = () => {
  return async (dispatch) => {

    try {
      const resp = await fetchWithToken('events')
      const data = await resp.json()
      const events = prepareEvents(data.events)
      dispatch(loadEvents(events))
    } catch (error) {
      console.log(error)
    }
  }
}

const loadEvents = (events) => ({
  type: types.eventLoaded,
  payload: events
})
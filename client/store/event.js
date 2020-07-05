import axios from 'axios'
import history from '../history'

const GET_EVENTS = 'GET_EVENTS'
const GET_ONE_EVENT = 'GET_EVENT'
const ADD_EVENT = 'ADD_EVENT'

const getEvents = events => ({
  type: GET_EVENTS,
  events
})

const getEvent = event => ({
  type: GET_ONE_EVENT,
  event
})

export const fetchEvent = id => {
  return async dispatch => {
    try {
      const {data} = await axios(`/api/events/${id}`)
      dispatch(getEvent(data))
    } catch (err) {
      console.log(err)
    }
  }
}
export const createEvent = event => {
  return async dispatch => {
    try {
      const {data} = await axios.post('/api/events/add', event)
      dispatch(getEvent(data))
      history.push(`/events/${data.id}`)
    } catch (err) {
      console.log('ERROR', err)
    }
  }
}

const initialState = {
  events: [],
  currEvent: {}
}

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_ONE_EVENT: {
      return {...state, currEvent: action.event}
    }
    case ADD_EVENT: {
      return {...state, currEvent: action.event}
    }
    default:
      return state
  }
}

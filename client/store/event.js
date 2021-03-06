import axios from 'axios'
import history from '../history'

const GET_ONE_EVENT = 'GET_EVENT'
const ADD_EVENT = 'ADD_EVENT'
const GET_USER_EVENTS = 'GET_USER_EVENTS '
const GET_USER_EVENTS_AS_HOST = 'GET_USER_EVENTS_AS_HOST'
const GET_POSTS = 'GET_POSTS'

const getEvent = data => ({
  type: GET_ONE_EVENT,
  event: data.event,
  count: data.count
})

const getUserEvents = events => ({
  type: GET_USER_EVENTS,
  events
})

const getUserEventsAsHost = events => ({
  type: GET_USER_EVENTS_AS_HOST,
  events
})

const getPosts = posts => ({
  type: GET_POSTS,
  posts
})

export const updateUserAttendance = (eventId, dec) => async dispatch => {
  try {
    const decision = {
      decision: dec
    }
    const {data} = await axios.put(
      `/api/events/${eventId}/updateUser`,
      decision
    )
    dispatch(getEvent(data))
  } catch (err) {
    console.error(err)
  }
}

export const createInvites = (invitees, eventId) => {
  return async dispatch => {
    try {
      const {data} = await axios.post(`/api/events/invite`, invitees)
      dispatch(getEvent(data))
      history.push(`/events/${eventId}/guests`)
    } catch (err) {
      console.log(err)
    }
  }
}

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

export const deleteEvent = id => {
  return async dispatch => {
    try {
      const {data} = await axios.delete(`/api/events/${id}/delete`)
      dispatch(getUserEvents(data))
      dispatch(getUserEventsAsHost(data))
      history.push(`/`)
    } catch (err) {
      console.log(err)
    }
  }
}

export const updateEvent = (event, id) => {
  return async dispatch => {
    try {
      const {data} = await axios.put(`/api/events/${id}/edit`, event)
      // dispatch(getEvent(data))
      history.push(`/events/${id}/details`)
    } catch (err) {
      console.log(err)
    }
  }
}

export const fetchUserEvents = upcomingOrPast => {
  return async dispatch => {
    try {
      const {data} = await axios(`/api/users/me/${upcomingOrPast}`)
      dispatch(getUserEvents(data))
      dispatch(getUserEventsAsHost(data))
    } catch (err) {
      console.log(err)
    }
  }
}

export const createEvent = event => {
  return async dispatch => {
    try {
      const {data} = await axios.post('/api/events/add', event)
      // dispatch(getEvent(data))
      history.push(`/events/${data.id}`)
    } catch (err) {
      console.log('ERROR', err)
    }
  }
}

export const createPost = (post, eventId) => {
  return async dispatch => {
    try {
      const {data} = await axios.post(`/api/photos/upload/${eventId}`, post)
      dispatch(getPosts(data))
      history.push(`/events/${eventId}/photos`)
    } catch (err) {
      console.log('ERROR', err)
    }
  }
}

export const fetchPosts = eventId => {
  return async dispatch => {
    try {
      const {data} = await axios(`/api/photos/${eventId}`)
      dispatch(getPosts(data))
    } catch (err) {
      console.log(err)
    }
  }
}

export const createComment = (comment, postId, eventId) => {
  return async dispatch => {
    try {
      console.log('ID', comment, postId)
      const {data} = await axios.post(`/api/photos/${postId}/comments`, {
        comment,
        eventId
      })
      dispatch(getPosts(data))
    } catch (err) {
      console.log('ERROR', err)
    }
  }
}

export const deletePost = postId => {
  return async dispatch => {
    try {
      const {data} = await axios.delete(`/api/photos/${postId}/delete`)
      dispatch(getPosts(data))
    } catch (err) {
      console.log('ERROR', err)
    }
  }
}

const initialState = {
  events: [],
  myEvents: [],
  currEvent: {},
  invitees: [],
  RSVPCount: {},
  organizer: false,
  posts: [],
  tasksDone: 0
}

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_USER_EVENTS: {
      const eventGuest = []
      action.events.map(ev => {
        if (ev.isOrganizer !== true) {
          eventGuest.push({...ev})
        }
      })
      return {...state, events: eventGuest}
    }
    case GET_USER_EVENTS_AS_HOST: {
      const eventHost = []
      action.events.map(ev => {
        if (ev.isOrganizer === true) {
          eventHost.push({...ev})
        }
      })
      return {...state, myEvents: eventHost}
    }
    case GET_ONE_EVENT: {
      let isHost = false
      let tasksDone = 0
      let percentageDone = 0
      if (action.event.users_events[0].isOrganizer === true) {
        isHost = true
      }
      if (action.event.tasks.length) {
        action.event.tasks.forEach(task => {
          if (task.userId) {
            tasksDone++
          }
        })

        percentageDone = Math.round(tasksDone / action.event.tasks.length * 100)
      }
      return {
        ...state,
        currEvent: action.event,
        RSVPCount: action.count,
        organizer: isHost,
        tasksDone: percentageDone
      }
    }
    case ADD_EVENT: {
      return {...state, currEvent: action.event}
    }
    case GET_POSTS: {
      return {...state, posts: action.posts}
    }
    default:
      return state
  }
}

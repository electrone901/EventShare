import React, {useEffect} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {getMe, updateUserEvents} from '../store/user'
import {getAllNotifications} from '../store/notifications'
/**
 * COMPONENT
 */
import {
  Container,
  Button,
  Chip,
  List,
  ListItem,
  Divider,
  ListItemText,
  Box,
  Avatar,
  Typography,
  IconButton,
  Grid
} from '@material-ui/core'

export const UserHome = props => {
  useEffect(() => {
    props.getUser()
    props.getAllNotifications(1)
  }, [])

  const {firstName, lastName, email, profile_pic} = props.user
  const events = props.user.events || []
  const tasks = props.user.tasks || []
  return (
    <div>
      <div className="profile">
        <img className="profilePic" src={profile_pic} />
        <h4>
          {firstName} {lastName}
        </h4>
        <p>{email}</p>
        <Link to="/events/add">
          <button type="submit">Create Event</button>
        </Link>
      </div>
      <div>
        <Container maxWidth="sm">
          <Box pt={2} className="space-between">
            <Button color="primary">Events</Button>
          </Box>
          <Divider />
          <List className="task-list">
            {events.length > 0 ? (
              events.map(event => (
                <div key={event.id}>
                  <Link to={`/events/${event.id}`}>
                    <ListItem>
                      <ListItemText>{event.title}</ListItemText>
                    </ListItem>
                  </Link>
                </div>
              ))
            ) : (
              <p>You Have No Current Events</p>
            )}
          </List>
        </Container>
        <Container>
          <Box pt={2} className="space-between">
            <Button color="primary">Tasks</Button>
          </Box>
          <Divider />
          <List className="task-list">
            {tasks.length > 0 ? (
              tasks.map(task => (
                <div key={task.id}>
                  <ListItem>
                    <ListItemText>{task.title}</ListItemText>
                  </ListItem>
                </div>
              ))
            ) : (
              <p>You Have No Current Tasks</p>
            )}
          </List>
        </Container>
      </div>
    </div>
  )
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    user: state.user,
    events: state.user.events,
    tasks: state.user.tasks,
    notifications: state.notifications
  }
}

const mapDispatch = dispatch => {
  return {
    getUser: () => dispatch(getMe()),
    updateUserAttendance: (eventId, decision) =>
      dispatch(updateUserEvents(eventId, decision)),
    getAllNotifications: eventId => dispatch(getAllNotifications(eventId))
  }
}

export default connect(mapState, mapDispatch)(UserHome)

/**
 * PROP TYPES
 */
UserHome.propTypes = {
  email: PropTypes.string
}

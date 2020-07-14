import React from 'react'
import {connect} from 'react-redux'
import {withRouter, Link as RouterLink} from 'react-router-dom'
import {fetchEvent, deleteEvent} from '../store/event'
import DropMenuList from './AdditionalForms/DropDownMenu'
import AppBar from '@material-ui/core/AppBar'
import Tab from '@material-ui/core/Tab'
import Typography from '@material-ui/core/Typography'
import TabContext from '@material-ui/lab/TabContext'
import TabList from '@material-ui/lab/TabList'
import TabPanel from '@material-ui/lab/TabPanel'
import {Box} from '@material-ui/core/'

class EventTabs extends React.Component {
  state = {
    value: '1'
  }

  handleChange(event, newValue) {
    this.setState({value: newValue})
  }

  componentDidMount() {
    this.props.getEvent(this.props.match.params.id)
  }
  render() {
    const eventId = this.props.match.params.id

    return (
      <div className="">
        <Typography
          align="center"
          component="h1"
          variant="h5"
          color="secondary"
          className="eventTitle"
        >
          {this.props.currEvent.title}🎉
        </Typography>
        <Box align="center" className="dropDownMenu">
          <DropMenuList
            eventId={this.props.currEvent.id}
            eventLink="/edit"
            delete={this.props.deleteEvent}
          />
        </Box>
        <TabContext value={this.state.value}>
          <AppBar position="static" color="secondary" style={{zIndex: 3000}}>
            <TabList
              onChange={this.handleChange.bind(this)}
              aria-label="simple tabs example"
            >
              <Tab
                label="Details"
                value="1"
                component={RouterLink}
                to={`/events/${eventId}/details`}
              />
              <Tab
                label="Guests"
                value="2"
                component={RouterLink}
                to={`/events/${eventId}/guests`}
              />
              <Tab
                label="Tasks"
                value="3"
                component={RouterLink}
                to={`/events/${eventId}/tasks`}
              />
              <Tab label="Polls" value="4" component={RouterLink} to="/vote" />
              <Tab
                label="Invite"
                value="5"
                component={RouterLink}
                to={`/events/${eventId}/invite`}
              />
            </TabList>
          </AppBar>
          {/* <TabPanel value="1">
            <EventDetails  component={Link}
            to="/events/:id/invite" />
          </TabPanel> */}
          {/* <TabPanel value="2">
            <GuestList eventId={eventId} />
          </TabPanel> */}
          {/* <TabPanel value="3">
            <TaskList /> */}
          {/* </TabPanel> */}
          <TabPanel value="4">
            Polls goes here whenever it is ready import the component and added
            here
          </TabPanel>
          {/* <TabPanel value="5">
            <InviteForm eventId={eventId} />
          </TabPanel> */}
        </TabContext>
      </div>
    )
  }
}

const mapState = state => {
  return {
    user: state.user,
    currEvent: state.events.currEvent,
    isOrganizer: state.events.organizer
  }
}

const mapDispatch = dispatch => {
  return {
    getEvent: id => dispatch(fetchEvent(id)),
    deleteEvent: eventId => dispatch(deleteEvent(eventId))
  }
}

export default withRouter(connect(mapState, mapDispatch)(EventTabs))

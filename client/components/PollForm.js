import React from 'react'
import {connect} from 'react-redux'
import {createPoll} from '../store/poll'

import {
  TextField,
  FormControl,
  Container,
  FormGroup,
  Button,
  Select,
  InputLabel,
  MenuItem,
  FormHelperText
} from '@material-ui/core'

export class PollForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      options: [],
      title: '',
      currentOption: ''
    }

    this.handleChange = this.handleChange.bind(this)
    this.handleAddOption = this.handleAddOption.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  handleAddOption(event) {
    event.preventDefault()
    const option = this.state.currentOption

    this.setState({
      currentOption: ' ',
      options: [...this.state.options, option]
    })
  }

  handleSubmit(event) {
    event.preventDefault()
    const newPoll = {
      title: this.state.title,
      options: this.state.options,
      eventId: this.props.match.params.id
    }
    this.props.createPoll(newPoll)
  }

  render() {
    return (
      <Container maxWidth="sm">
        <form
          onSubmit={this.handleSubmit}
          className="addTask-form"
          noValidate
          autoComplete="off"
        >
          <h2 align="center">Create A Poll For Your Event</h2>
          <FormGroup>
            <InputLabel id="demo-simple-select-filled-label">
              Poll Questions
            </InputLabel>
            <FormControl>
              <TextField
                type="text"
                name="title"
                label="question"
                variant="outlined"
                value={this.state.value}
                onChange={this.handleChange}
              />
            </FormControl>
            <InputLabel id="demo-simple-select-filled-label">
              Write Your Options
            </InputLabel>
            <FormControl>
              <TextField
                type="text"
                name="currentOption"
                label="option"
                variant="outlined"
                value={this.state.currentOption}
                onChange={this.handleChange}
              />
            </FormControl>
          </FormGroup>

          <Button
            className="btn-theme"
            type="button"
            variant="contained"
            color="secondary"
            onClick={this.handleAddOption}
          >
            Add Options
          </Button>
          <div className="poll-form-yourOption">
            <h4>Your Options: </h4>
            {this.state.options.map((option, i) => {
              return <p key={i}>{option}</p>
            })}
          </div>
          <Button
            className="btn-theme btn-create"
            type="submit"
            variant="contained"
            color="secondary"
            onClick={this.handleSubmit}
          >
            Create Poll
          </Button>
        </form>
      </Container>
    )
  }
}

const mapDispatchToProps = dispatch => ({
  createPoll: event => dispatch(createPoll(event))
})

export default connect(null, mapDispatchToProps)(PollForm)

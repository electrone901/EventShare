import React from 'react'
import {makeStyles} from '@material-ui/core/styles'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import Container from '@material-ui/core/Icon'
import SendIcon from '@material-ui/icons/Send'
import Typography from '@material-ui/core/Typography'

const useStyles = makeStyles(theme => ({
  root: {
    '& > *': {
      //margin: theme.spacing(),
      width: '28ch',
      display: 'flex',
      flexDirection: 'column',
      margin: 'auto'
    },
    button: {
      margin: theme.spacing(1)
    }
    // Container: {
    //   margin: 'auto'
    // }
  }
}))

export default function FeedbackForm() {
  const classes = useStyles()

  return (
    <Container maxWidth="" className={classes.Container}>
      {/* <Typography variant="h4" component="h2" className='feedback-title' > */}
      <h4 className="feedback-title">How are we doing ?</h4>
      {/* </Typography> */}
      <form className={classes.root} noValidate autoComplete="off">
        <p className="feedback-paragraph">
          We are always working to improve the Event-Share experience, so we'd
          love to hear what's working and how can we do better.
        </p>

        <TextField
          id="filled-basic"
          label="I am using Event-Share for"
          variant="filled"
        />
        <TextField
          id="filled-basic"
          label="What's your feedback about?"
          variant="filled"
        />
        <TextField
          id="outlined-basic"
          label="Tell us alittle bit more"
          variant="outlined"
        />
      </form>
      <div className="feed-back-form-submit-button">
        <Button
          variant="contained"
          color="primary"
          style={{backgroundColor: 'black'}}
          className={classes.button}
          endIcon={<SendIcon />}
          className="btn-submit"
        >
          Submit
        </Button>
      </div>
    </Container>
  )
}

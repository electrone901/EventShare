import React from 'react'
import {Link} from 'react-router-dom'
import {makeStyles} from '@material-ui/core/styles'
import {
  Container,
  Paper,
  Grid,
  Box,
  Button,
  Typography
} from '@material-ui/core'

const useStyles = makeStyles(() => ({
  subTitle: {
    marginTop: '1.5rem'
  },
  heroBackground: {
    height: '50vh',
    backgroundImage: `url(https://www.cdacasino.com/wp-content/uploads/2020/02/CDA-2837-Website-Sizes-March-2020-1120x680-7.jpg)`,
    backgroundPosition: 'left',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    padding: '3rem 2rem'
  },
  ctaBtn: {
    marginBottom: '.5rem'
  }
}))

const Home = () => {
  const classes = useStyles()
  return (
    <>
      <Paper className={classes.heroBackground} elevation={3}>
        <Typography
          className="title"
          variant="h5"
          component="h1"
          gutterBottom
          align="center"
        >
          Everything your team needs to create an event in one platform.
        </Typography>

        <Box className="ctaBtn" mt="7rem" mb={2} mr={1}>
          <Button
            className={classes.ctaBtn}
            style={{backgroundColor: '#000000', spacing: 5}}
            color="secondary"
            component={Link}
            to="/signup"
            variant="contained"
            size="large"
            mr={8}
          >
            Get Started
          </Button>

          <Button
            className={classes.ctaBtn}
            style={{backgroundColor: '#000000', spacing: 8}}
            color="primary"
            component={Link}
            to="/Login"
            variant="contained"
            size="large"
            mr={8}
          >
            Login
          </Button>
        </Box>
      </Paper>

      {/* <Container> */}
      <Container className="bt">
        {/* NOT FINAL VIDEO, OPEN TO SUGGESTIONS */}
        <img
          src="https://media.giphy.com/media/J1j9YNrbnDM2Ctzv3D/giphy.gif"
          width="100%"
          height="100%"
        />
      </Container>
    </>
  )
}

export default Home

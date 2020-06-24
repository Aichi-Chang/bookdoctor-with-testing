import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import Container from '@material-ui/core/Container'
// import Typography from '../Components/Typography'
import Typography from '@material-ui/core/Typography'

const styles = (theme) => ({
  root: {
    display: 'flex',
    overflow: 'hidden',
    backgroundColor: '#faf6ef'
  },
  container: {
    marginTop: theme.spacing(15),
    marginBottom: theme.spacing(30),
    display: 'flex',
    position: 'relative'
  },
  item: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: theme.spacing(0, 5)
  },
  image: {
    height: 55
  },
  title: {
    marginTop: theme.spacing(5),
    marginBottom: theme.spacing(5)
  },
  curvyLines: {
    pointerEvents: 'none',
    position: 'absolute',
    top: -180
  }
})

function ProductValues(props) {
  const { classes } = props

  return (
    <section className={classes.root}>
      <Container className={classes.container}>
        {/* <img
          src="https://i.imgur.com/CXFUK5z.png"
          className={classes.curvyLines}
          alt="curvy lines"
        /> */}
    

        <Grid container spacing={5}>
          <Grid item xs={12} md={4}>
            <div className={classes.item}>
              <img
                className={classes.image}
                src="https://i.imgur.com/xFXDCxp.png"
                alt="doctor"
              />
              <Typography variant="h6" className={classes.title}>
                Connect With your GP
              </Typography>
              <Typography variant="h5">
                {'Connect with your GPs directly'}
                {' and learn more about the advice and services the NHS can offer you and your family.'}
              </Typography>
            </div>
          </Grid>
          <Grid item xs={12} md={4}>
            <div className={classes.item}>
              <img
                className={classes.image}
                src="https://i.imgur.com/VjuCZ8P.png"
                alt="graph"
              />
              <Typography variant="h6" className={classes.title}>
                Free Information Hub
              </Typography>
              <Typography variant="h5">
                {'An information hub, advice, tips and tools to help you make the best choices about'}
                {' your health and wellbeing.'}
              </Typography>
            </div>
          </Grid>
          <Grid item xs={12} md={4}>
            <div className={classes.item}>
              <img
                className={classes.image}
                src="https://i.imgur.com/fnM5qV4.png"
                alt="clock"
              />
              <Typography variant="h6" className={classes.title}>
                Track Your Health
              </Typography>
              <Typography variant="h5">
                {'By registering, you will access your GP\'s availability and book an appointment '}
                {'or book a chat and healthy history.'}
              </Typography>
            </div>
          </Grid>
        </Grid>
      </Container>
    </section>
  )
}

ProductValues.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(ProductValues)
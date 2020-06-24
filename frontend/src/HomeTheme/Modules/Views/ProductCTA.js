import React from 'react'
import { Link } from 'react-router-dom'
import { withStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import Hidden from '@material-ui/core/Hidden'
import Container from '@material-ui/core/Container'
import Typography from '../Components/Typography'



const styles = (theme) => ({
  root: {
    marginTop: theme.spacing(20),
    marginBottom: 0,
    display: 'flex',
  },
  card: {
    display: 'flex',
    justifyContent: 'center',
    backgroundColor: '#E8EDEE',
    padding: theme.spacing(8, 3),
  },
  cardContent: {
    maxWidth: 400,
  },
  textField: {
    width: '100%',
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(2),
  },
  imagesWrapper: {
    position: 'relative',
  },
  imageDots: {
    position: 'absolute',
    top: -67,
    left: -67,
    right: 0,
    bottom: 0,
    width: '100%',
    // background: 'url(/static/onepirate/productCTAImageDots.png)',
  },
  image: {
    position: 'absolute',
    top: -100,
    left: 0,
    right: 0,
    bottom: 0,
    width: '100%',
    maxWidth: 600,
  },
})

function ProductCTA(props) {
  const { classes } = props
  const [open, setOpen] = React.useState(false)

  const handleSubmit = (event) => {
    event.preventDefault()
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  return (
    <Container className={classes.root} component="section">
      <Grid container>

        <Grid item xs={12} md={6} className='cardWrapper'>
          <div className={classes.card}>
            <form onSubmit={handleSubmit} className={classes.cardContent}>
              <Typography variant="h2" component="h2" gutterBottom>
                Book your appointment
              </Typography>
              <Typography variant="h5">
                Check the available time
              </Typography>
              {/* <TextField noBorder className={classes.textField} placeholder="Search for your GP" /> */}
              <Link to='/appointment' className='button'>
                Go to Booking Page
              </Link>
            </form>
          </div>
        </Grid>

        <Grid item xs={12} md={6} className={classes.imagesWrapper}>
          <Hidden smDown>
            <div className={classes.imageDots} />
            <img
              src='https://i.imgur.com/oha3yLB.jpg'
              alt="wellbeing"
              className={classes.image}
            />
          </Hidden>
        </Grid>
      
      </Grid>


    </Container>
  )
}

// ProductCTA.propTypes = {
//   classes: PropTypes.object.isRequired
// }

export default withStyles(styles)(ProductCTA)
import React from 'react'
import PropTypes from 'prop-types'
import Container from '@material-ui/core/Container'
import { withStyles } from '@material-ui/core/styles'
import ContactSupportIcon from '@material-ui/icons/ContactSupport'


const styles = (theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginTop: theme.spacing(20),
    marginBottom: theme.spacing(12)
  },
  link: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3)
  }
})


function ProductSmokingHero(props) {
  const { classes } = props

  return (
    <Container className={classes.root} component="section">
      <h1 className='homeTitle'>
        Got any questions? We are here to help!
      </h1>
      <p className='homeContent'>
        Click here to contact us via email
      </p>
  
      <a href="mailto: bookdoctorappointments@gmail.com" >
        <ContactSupportIcon style={{ fontSize: '60px' }}  />
        {/* <img src="https://i.imgur.com/GQBnuem.png" className={classes.buoy} alt="buoy" /> */}
      </a>
    </Container>
  )
}

ProductSmokingHero.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(ProductSmokingHero)
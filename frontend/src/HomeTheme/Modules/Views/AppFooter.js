import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import Link from '@material-ui/core/Link'
import Container from '@material-ui/core/Container'
// import Typography from '../Components/Typography'
import Typography from '@material-ui/core/Typography'

// import TextField from '../Components/TextField'


const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    backgroundColor: '#faf6ef'
  },
  container: {
    marginTop: theme.spacing(8),
    marginBottom: theme.spacing(8)
  },
  iconsWrapper: {
    height: 120
  },
  icon: {
    width: 28,
    height: 28,
    display: 'flex',
    alignItems: 'center',
    // backgroundColor: theme.palette.warning.main,
    marginRight: theme.spacing(1),
    '&:hover': {
      // backgroundColor: theme.palette.warning.dark,
    }
  },
  list: {
    margin: 0,
    listStyle: 'none',
    padding: 0
  },
  listItem: {
    paddingTop: theme.spacing(0.5),
    paddingBottom: theme.spacing(0.5)
  },
  language: {
    marginTop: theme.spacing(1),
    width: 150
  }
}))



export default function AppFooter() {
  const classes = useStyles()

  return (
    <Typography component="footer" className={classes.root}>
      <Container className={classes.container}>

        <Grid container spacing={3}>
          <Grid item xs={6} sm={8} md={4}>
            <Typography variant="h6" marked="left" gutterBottom>
            Contact
            </Typography>
            <ul className={classes.list}>
              <li className={classes.listItem}>
                <Link href="https://www.linkedin.com/in/aichi-chang/">Aichi Chang</Link>
              </li>
              <li className={classes.listItem}>
                <Link href="https://www.linkedin.com/in/denisa-tanase/">Denisa Mihaela</Link>
              </li>
              <li className={classes.listItem}>
                <Link href="https://www.linkedin.com/in/sonia-k-choudhury/">Sonia Choudhury</Link>
              </li>
            </ul>
          </Grid>
        
          <Grid item xs={6} sm={8} md={4}>
            <Typography variant="h6" marked="left" gutterBottom>
              Other Services            
            </Typography>
            <ul className={classes.list}>
              <li className={classes.listItem}>
                <Link href="https://www.nhs.uk/">NHS</Link>
              </li>
              <li className={classes.listItem}>
                <Link href="https://www.nhs.uk/service-search/other-services/Urgent-Care/LocationSearch/1824">Urgent Care Services</Link>
              </li>
            </ul>
          </Grid>

          <Grid item xs={6} sm={4} md={2}>
            <Typography variant="h6" marked="left" gutterBottom>
              Media
            </Typography>
            <ul className={classes.list}>
              <li className={classes.listItem}>
                <a id="" className={classes.icon}>
                  <img src="https://i.imgur.com/H2XF43d.png" alt="Facebook" />
                </a>
              </li>
              <li className={classes.listItem}>
                <a id="" className={classes.icon}>
                  <img src="https://i.imgur.com/dDElfmP.png" alt="Twitter" />
                </a>
              </li>
            </ul>
          </Grid>
          
          <Grid item xs={6} md={10}>
            <Typography variant="caption">
              {'Created by Aichi Chang, Denisa Mihaela and Sonia Choudhury with 💙'}
              {' - GA Grads 2020'}
            </Typography>
          </Grid>
        </Grid>


      </Container>
    </Typography>
  )
}
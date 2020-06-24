import React, { useState } from 'react'  
import { Link } from 'react-router-dom'  
import Avatar from '@material-ui/core/Avatar'  
import CssBaseline from '@material-ui/core/CssBaseline'  
import TextField from '@material-ui/core/TextField'  
import Box from '@material-ui/core/Box'  
import Grid from '@material-ui/core/Grid'  
import AssignmentTurnedInIcon from '@material-ui/icons/AssignmentTurnedIn'  
import { makeStyles } from '@material-ui/core/styles'  
import Select from '@material-ui/core/Select'
import InputLabel from '@material-ui/core/InputLabel'
import FormControl from '@material-ui/core/FormControl'

import axios from 'axios'
import Auth from '../lib/auth'



const useStyles = makeStyles((theme) => ({
  root: {
    height: '100vh'
  },
  cssOutlinedInput: {
    '&$cssFocused $notchedOutline': {
      borderColor: '#005EB8'
    }
  },
  notchedOutline: {},
  cssFocused: {},
  image: {
    backgroundImage: 'url(https://images.unsplash.com/photo-1588784434842-697ea91ac4f1?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1100&q=80)',
    backgroundRepeat: 'no-repeat',
    backgroundColor:
      theme.palette.type === 'light' ? theme.palette.grey[50] : theme.palette.grey[900],
    backgroundSize: 'cover',
    backgroundPosition: 'center'
  },
  paper: {
    margin: theme.spacing(8, 4),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: '#AE2573'
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1)
  },
  submit: {
    margin: theme.spacing(3, 0, 2)
  }
}))  



export default function Login(props) {
  const classes = useStyles()  

  const [loginInfo, setLoginInfo] = useState({
    email: '',
    password: '',
    role: ''
  })
  const [errors, setErrors] = useState('')


  function handleChange(e) {
    e.persist()
    setLoginInfo({ ...loginInfo, [e.target.name]: e.target.value })
  }


  function handleSubmit(e) {
    e.preventDefault()
    axios.post('/api/login', loginInfo)
      .then(res => {
        Auth.setToken(res.data.token)
        Auth.setUser(res.data.user)
        if (errors === '') {
          props.history.push('/')
          window.location.reload()
        }
        
      })
      .catch(err => setErrors(err.response.data))
  }

  




  return (
    <Grid container component="main" className={classes.root}>
      <CssBaseline />
      <Grid item xs={false} sm={4} md={7} className={classes.image} />
      <Grid item xs={12} sm={8} md={5} elevation={6} square='true'>
        <div className={classes.paper}>

          <Avatar className={classes.avatar}>
            <AssignmentTurnedInIcon /> 
          </Avatar>
          
          <h1 className='formTitle'>Login</h1>

          <form className='formStyle' onSubmit={(e) => handleSubmit(e)}>
            
            <TextField
              onChange={(e) => handleChange(e)}
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              InputProps={{
                classes: {
                  root: classes.cssOutlinedInput,
                  focused: classes.cssFocused,
                  notchedOutline: classes.notchedOutline
                }
              }}
            />
            {/* {errors.username && <small>{errors.username.message}</small>} */}
            <TextField
              onChange={(e) => handleChange(e)}
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              InputProps={{
                classes: {
                  root: classes.cssOutlinedInput,
                  focused: classes.cssFocused,
                  notchedOutline: classes.notchedOutline
                }
              }}
            />
            <FormControl variant="outlined" >
              <InputLabel className='selectInput' htmlFor="outlined-age-native-simple">Login as</InputLabel>
              <Select
                className='selectInput'
                native
                onChange={(e) => handleChange(e)}
                label='login as..'
                name='role'
              >
                <option aria-label="None" value="" />
                <option value='patient'>Patient</option>
                <option value='doctor'>Doctor</option>
              </Select>
            </FormControl>
            
            

            <button className='button' >
              Sign In
            </button>

          </form>
            
          <Link to="/register" className='links'>Don't have an account? Sign up</Link>

          <Box mt={5}>
          <div>Copyright © <a target='blank' className='links' href="https://github.com/Aichi-Chang/bookdoctor">bookdoctor</a>{' '}{new Date().getFullYear()}</div>
          </Box>

        </div>

      </Grid>
    </Grid>
  )  
}
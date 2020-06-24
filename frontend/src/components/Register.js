import React, { useState, useEffect } from 'react' 
import { Link } from 'react-router-dom' 
import Avatar from '@material-ui/core/Avatar'  
import CssBaseline from '@material-ui/core/CssBaseline'  
import TextField from '@material-ui/core/TextField'   
import Box from '@material-ui/core/Box'  
import Grid from '@material-ui/core/Grid'  
import AssignmentIcon from '@material-ui/icons/Assignment'  
import { makeStyles } from '@material-ui/core/styles'  

import axios from 'axios'


const useStyles = makeStyles((theme) => ({
  root: {
    // height: '100vh',
    overFlow: 'hidden'
  },
  cssOutlinedInput: {
    '&$cssFocused $notchedOutline': {
      borderColor: '#005EB8'
    }
  },
  notchedOutline: {},
  cssFocused: {},
  image: {
    backgroundImage: 'url(https://images.unsplash.com/photo-1588775005506-cc9c22cdef84?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1100&q=80)',
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
  },
  box: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  }
}))  

export default function Register(props) {


  const classes = useStyles()  
  const [registerInfo, setRegisterInfo] = useState({
    username: '',
    email: '',
    password: '',
    passwordConfirmation: ''
  })

  const [errors, setErrors] = useState({
    username: '',
    email: '',
    password: '',
    passwordConfirmation: ''
  })


  function handleChange(e) {
    e.persist()
    setRegisterInfo({ ...registerInfo, [e.target.name]: e.target.value })
  }




  const handleSubmit = (e) => {
    e.preventDefault()
    axios.post('/api/register', registerInfo)
      .then(() => {
        if (errors.username === '' && errors.email === '' && errors.password === '' && errors.passwordConfirmation === '') {
          props.history.push('/login')
        }
      })
      .catch(err => {
        setErrors({ ...errors, ...err.response.data })
        window.location.reload()
      })
  }




  return (
    <Grid container component="main" className={classes.root}>
      <CssBaseline />
      <Grid item xs={false} sm={4} md={7} className={classes.image} />
      <Grid item xs={12} sm={8} md={5} elevation={6} square='true'>
        <div className={classes.paper}>

          <Avatar className={classes.avatar}>
            <AssignmentIcon /> 
          </Avatar>
          
          <h1 className='formTitle'>Sign Up</h1>

          <form className='formStyle' onSubmit={(e) => handleSubmit(e)}>
            <TextField
              onChange={(e) => handleChange(e)}
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="username"
              label="Username"
              id="username"
              InputProps={{
                classes: {
                  root: classes.cssOutlinedInput,
                  focused: classes.cssFocused,
                  notchedOutline: classes.notchedOutline
                }
              }}
            />
            {errors.username && <small style={{ color: 'red' }}>{errors.username.message}</small>}
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
            {errors.email && <small style={{ color: 'red' }}>{errors.email.message}</small>}
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
            {errors.password && <small style={{ color: 'red' }}>{errors.password.message}</small>}
            <TextField
              onChange={(e) => handleChange(e)}
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="passwordConfirmation"
              label="Password Confirmation"
              type="password"
              id="passwordConfirmation"
              InputProps={{
                classes: {
                  root: classes.cssOutlinedInput,
                  focused: classes.cssFocused,
                  notchedOutline: classes.notchedOutline
                }
              }}
            />
            {errors.passwordConfirmation && <small style={{ color: 'red' }}>{errors.passwordConfirmation.message}</small>}
            <button className='button' >
              Sign In
            </button>

          </form>
            
          <Link to="/login" className='links'>Already have an account? Login</Link>

          <Box mt={5} className={classes.box}>
            <small style={{ color: 'red', textAlign: 'center', marginBottom: '20px' }}>By registering, I agree to bookdoctor saving and processing my data for demonstration purposes.</small>
            <div>Copyright © <a target='blank' className='links' href="https://github.com/Aichi-Chang/bookdoctor">bookdoctor</a>{' '}{new Date().getFullYear()}</div>
          </Box>
        </div>
      </Grid>
    </Grid>
  )  
}
import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import Avatar from '@material-ui/core/Avatar'
import CssBaseline from '@material-ui/core/CssBaseline'
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper' 
import AssignmentIndIcon from '@material-ui/icons/AssignmentInd'
import { makeStyles } from '@material-ui/core/styles'
import TextField from '@material-ui/core/TextField'  
import 'date-fns'
import DateFnsUtils from '@date-io/date-fns'
import { MuiPickersUtilsProvider,KeyboardDatePicker } from '@material-ui/pickers'
import SelectPatients from './SelectPatients'
import SelectMedicines from './SelectMedicines'
import Navbar from './Navbar'
import Auth from '../lib/auth'
import Picker from './Picker'
import zIndex from '@material-ui/core/styles/zIndex'




const useStyles = makeStyles((theme) => ({
  root: {
    height: '100vh',
    backgroundColor: '#E8EDEE',
    backgroundImage: "url('https://66.media.tumblr.com/db4695b73f74690c83cbfbee3a7aa571/tumblr_njt2v19H9l1tf8vylo1_1280.png')",
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center center',
    backgroundSize: 'cover',
    backgroundAttachment: 'fixed'
  },
  grid: {
    marginLeft: 'auto',
    marginRight: 'auto'
  },
  paper: {
    margin: theme.spacing(10, 1),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  avatar: {
    margin: theme.spacing(3),
    backgroundColor: '#AE2573'
  },
  form: {
    width: '100%', 
    marginTop: theme.spacing(1)
  },
  submit: {
    margin: theme.spacing(3, 0, 2)
  }
}))




//connect frontend and backend
export default function BookApp(props) {
  const classes = useStyles()

  const [selectedDate, setSelectedDate] = useState({ date: new Date() })
  const [data, setData] = useState({
    date: selectedDate.date.toLocaleDateString(),
    patient: '',
    content: '',
    prescription: ''
  })
  const today = new Date()
  const [error, setError] = useState('')



  const handleDateChange = (date) => {
    setSelectedDate({ date: date })
    setData({ ...data, date: date.toLocaleDateString() })
  }

  function handleChange(e) {
    e.persist()
    setData({ ...data, [e.target.name]: e.target.value })
  }

  
  const handleSubmit = (e) => {
    if (data.patient === '' || data.content === '') alert('Please fill in required sections')
    e.preventDefault()
    axios
      .post('/api/history', data, {
        headers: { Authorization: `Bearer ${Auth.getToken()}` }
      })
      .then(() => {
        if (error === '') {
          props.history.push('/')
        }
      })
      .catch((err) => setError(err.response.data))
  }




  if (error) {
    alert(error.message)
    window.location.reload()
  }
  
  function disableWeekends(date) {
    return date.getDay() === 0 || date.getDay() === 6
  }


  return (

    <Grid container className={classes.root}>
      <CssBaseline />
      <Navbar />
      {Auth.isAuthenticated() && Auth.getUser().role === 'doctor' ? 

        <Grid item xs={false} sm={8} md={6} elevation={6} square="true" className={classes.grid}>

          <Paper className={classes.paper}>
            <Avatar className={classes.avatar}><AssignmentIndIcon /></Avatar>
            
            <h1 className='formTitle'>Create Patient History</h1>
            <p className='calendarTitle'>Your patient will be able to see this history once created</p>
            
            <form
              className='formStyle'
              noValidate
              onSubmit={(e) => handleSubmit(e)}
            >

              <SelectPatients
                update={setData}
                data={data}
              />

              <MuiPickersUtilsProvider utils={DateFnsUtils} >
                <KeyboardDatePicker
                  name='date'
                  required
                  fullWidth
                  margin="dense"
                  id="date"
                  label="Date"
                  format="MM/dd/yyyy"
                  value={selectedDate.date}
                  onChange={(e) => handleDateChange(e)}
                  shouldDisableDate={date => disableWeekends(date)}
                  KeyboardButtonProps={{
                    'aria-label': 'change date'
                  }}
                />
              </MuiPickersUtilsProvider>

              <TextField
                onChange={(e) => handleChange(e)}
                // variant="outlined"
                margin="normal"
                required
                fullWidth
                name="content"
                label="Content"
                type="text"
                id="content"
                InputProps={{
                  classes: {
                    root: classes.cssOutlinedInput,
                    focused: classes.cssFocused,
                    notchedOutline: classes.notchedOutline
                  }
                }}
              />

              <SelectMedicines 
                update={setData}
                data={data}
              />

              <button className='button' >
                Submit
              </button>    

            </form>

          </Paper>
          <div style={{ textAlign: 'center' }}>Copyright © <a target='blank' className='links' href="https://github.com/Aichi-Chang/bookdoctor">bookdoctor</a>{' '}{new Date().getFullYear()}</div>        
        </Grid>
        
        : 
      
        <div className='bookPageFlex'>
          <img className='imageStyle' src='https://i.imgur.com/Qj84uzw.png' />
          <div>
            <p className='bookPageLogin'>Oops, seems like you don't have access to visit this page</p>
            <Link to='/' className='button'>Take Me Back</Link>
          </div>
          
        </div>
      }

    </Grid>
        
    
  )
}
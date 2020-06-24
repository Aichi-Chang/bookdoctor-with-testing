import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import Avatar from '@material-ui/core/Avatar'
import CssBaseline from '@material-ui/core/CssBaseline'
import Grid from '@material-ui/core/Grid'
import AssignmentIndIcon from '@material-ui/icons/AssignmentInd'
import { makeStyles } from '@material-ui/core/styles'
import TextField from '@material-ui/core/TextField'  
import 'date-fns'
import DateFnsUtils from '@date-io/date-fns'
import { MuiPickersUtilsProvider,KeyboardTimePicker,KeyboardDatePicker, Day } from '@material-ui/pickers'
import SelectDoc from './SelectDoc'
import Navbar from './Navbar'
import Auth from '../lib/auth'
import Picker from './Picker'




const useStyles = makeStyles((theme) => ({
  root: {
    height: '100vh'
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

  const [doctorProfile, setDoctorProfile] = useState()
  const [selectedDate, setSelectedDate] = useState({ date: new Date() })
  const [data, setData] = useState({
    date: selectedDate.date.toLocaleDateString(),
    time: '',
    reason: '',
    doctor: ''
  })
  const today = new Date()
  const [error, setError] = useState('')


  useEffect(() => {
    if (data) {
      axios.get('/api/doctors', {
        headers: { Authorization: `Bearer ${Auth.getToken()}` }
      })
        .then(res => setDoctorProfile(res.data))
        .catch(err => console.log(err.response.data))
    }
  },[data])


  const selectedDoc = doctorProfile ? doctorProfile.filter(select => {
    if (data.doctor) {
      return select.username === data.doctor
    }
  }) : null



  const handleDateChange = (date) => {
    setSelectedDate({ date: date })
    setData({ ...data, date: date.toLocaleDateString() })
  }

  function handleChange(e) {
    e.persist()
    setData({ ...data, [e.target.name]: e.target.value })
  }

  
  const handleSubmit = (e) => {
    if (data.doctor === '' || data.reason === '' || data.time === '') alert('Please fill in all sections')
    e.preventDefault()
    axios
      .post('/api/appointment', data, {
        headers: { Authorization: `Bearer ${Auth.getToken()}` }
      })
      .then(() => {
        if (error === '') {
          props.history.push('/dashboard')
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
      {Auth.isAuthenticated() ? <div className='bookPage'>

        <Grid  elevation={6} square="true" className='calendarBooking'>
          {selectedDoc && selectedDoc[0] && <p className='doctorInfo'>Doctor:  <span style={{ color: '#41B6E6' }}>{selectedDoc[0].username}</span></p>}
          {selectedDoc && selectedDoc[0] && <p className='doctorInfo'>Expertise:  <span style={{ color: '#41B6E6' }}>{selectedDoc[0].expertise}</span></p>}

          <MuiPickersUtilsProvider utils={DateFnsUtils} >
            <Picker 
              url={`/api/appointment/doc/${data.doctor ? data.doctor : null}`}
            />
          </MuiPickersUtilsProvider>
        </Grid>
        

        <Grid item xs={6} sm={8} md={5} elevation={6} square="true">

          <div className={classes.paper}>
            <Avatar className={classes.avatar}><AssignmentIndIcon /></Avatar>
            
            <h1 className='formTitle'>Book your Appointment</h1>
            <p className='calendarTitle'>Select Your Doctor and Check Their Available Time</p>
            
            <form
              className='formStyle'
              noValidate
              onSubmit={(e) => handleSubmit(e)}
            >

              <SelectDoc 
                update={setData}
                data={data}
              />

              <MuiPickersUtilsProvider utils={DateFnsUtils} >

                <KeyboardDatePicker
                  minDate={today}
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
                margin="normal"
                required
                fullWidth
                name="reason"
                label="Reason"
                type="text"
                id="reason"
                InputProps={{
                  classes: {
                    root: classes.cssOutlinedInput,
                    focused: classes.cssFocused,
                    notchedOutline: classes.notchedOutline
                  }
                }}
              />

              <button className='button' >
                Submit
              </button>    

            </form>

            <div>Copyright © <a target='blank' className='links' href="https://github.com/Aichi-Chang/bookdoctor">bookdoctor</a>{' '}{new Date().getFullYear()}</div>

          </div>


        </Grid>

      </div> : 

        <div className='bookPageFlex'>
          <img className='imageStyle' src='https://i.imgur.com/Qj84uzw.png' />
          <div>
            <p className='bookPageLogin'>To book your GP appointment, please login here</p>
            <Link to='/login' className='button'>Login</Link>
          </div>
  
        </div>
      }

    </Grid>
        
    
  )
}

import React, { useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import InputLabel from '@material-ui/core/InputLabel'
import FormControl from '@material-ui/core/FormControl'
import Select from '@material-ui/core/Select'
import axios from 'axios'
import Auth from '../lib/auth'


const useStyles = makeStyles((theme) => ({
  formControl: {
    width: '100%',
    margin: theme.spacing(1, 0, 2),
    minWidth: 450
  },
  cssOutlinedInput: {
    '&$cssFocused $notchedOutline': {
      borderColor: '#005EB8'
    }
  },
  notchedOutline: {},
  cssFocused: {},
  selectEmpty: {
    marginTop: theme.spacing(2),
  }
}))

export default function SimpleSelect({ update, data }) {
  const classes = useStyles()

  const [doctor, setDoctor] = useState()
  const [select, setSelect] = useState()

  useEffect(() => {
    axios.get('/api/doctors', {
      headers: { Authorization: `Bearer ${Auth.getToken()}` }
    })
      .then(res => {
        setDoctor(res.data)
      })
      .catch(err => console.log(err))
  },[])


  function handleChange(e) {
    setSelect({ [e.target.name]: e.target.value })
    update({ ...data, [e.target.name]: e.target.value })
  }




  return (
    <div>
      <FormControl required className={classes.formControl} >
        <InputLabel className='selectedInput'>Doctor</InputLabel>
        <Select
          className='selectInput'
          native
          onChange={(e) => handleChange(e)}
          label='Your GP'
          name='doctor'
        >
          <option aria-label="None" value="" />
          { doctor && doctor.map((doc) => {
            return <option key={doc.id}>
              {doc.username}
            </option>
          })}

        </Select>
      </FormControl>
      
      <FormControl required className={classes.formControl} >
        <InputLabel className='selectedInput'>Time</InputLabel>
        <Select
          className='selectInput'
          native
          onChange={(e) => handleChange(e)}
          label='Time'
          name='time'
        >
          <option aria-label="None" value="" />
          <option value='9:00AM'>9:00AM</option>
          <option value='9:30AM'>9:30AM</option>
          <option value='10:00AM'>10:00AM</option>
          <option value='10:30AM'>10:30AM</option>
          <option value='11:00AM'>11:00AM</option>
          <option value='11:30AM'>11:30AM</option>
          <option value='12:00PM'>12:00PM</option>
          <option value='13:30PM'>13:30PM</option>
          <option value='14:00PM'>14:00PM</option>
          <option value='14:30PM'>14:30PM</option>
          <option value='15:00PM'>15:00PM</option>
          <option value='15:30PM'>15:30PM</option>
          <option value='16:00PM'>16:00PM</option>
          <option value='16:30PM'>16:30PM</option>
          <option value='17:00PM'>17:00PM</option>
          <option value='17:30PM'>17:30PM</option>
        </Select>
      </FormControl>
        
      
    </div>
  )
}

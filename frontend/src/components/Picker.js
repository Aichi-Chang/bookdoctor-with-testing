import React, { useState, useEffect } from 'react'
import { DatePicker } from '@material-ui/pickers'
import { createMuiTheme, Badge } from '@material-ui/core'
import { ThemeProvider } from '@material-ui/styles'

import axios from 'axios'
import Auth from '../lib/auth'



export default function Picker({ url }) {

  
  const [selectedDates, setSelectedDates] = useState()
  const [selectedDays, setSelectedDays] = useState([])
  // const [errors, setErrors] = useState()

  useEffect(() => {
    axios.get(url, {
      headers: { Authorization: `Bearer ${Auth.getToken()}` }
    })
      .then(res => setSelectedDays(res.data))
      // .catch(err => setErrors({ ...errors, errors: err.response.data }))
  }, [url])


  // console.log(selectedDays)


  function handleChange(e) {
    setSelectedDates(e)
    // updateDate(e)
  }


  const materialTheme = createMuiTheme({
    overrides: {
      MuiPickersToolbar: {
        toolbar: {
          backgroundColor: '#005EB8'
        }
      },
      MuiPickersCalendarHeader: {
        iconButton: {
          backgroundColor: '#fff'
        }
      },
      MuiPickersBasePicker: {
        pickerViewLandscape: {
          backgroundColor: '#fff'
        }
      },
      MuiPickersDay: {
        daySelected: {
          backgroundColor: '#005EB8'
        }
      }

    }
  })

  function disableWeekends(date) {
    return date.getDay() === 0 || date.getDay() === 6
  }



  return (

    <div className='calendar'>

      <ThemeProvider theme={materialTheme}>
        <DatePicker
          shouldDisableDate={date => disableWeekends(date)}
          autoOk
          orientation="landscape"
          variant="static"
          openTo="date"
          value={selectedDates} 
          onChange={(e) => handleChange(e)}
          renderDay={(date, selectedDate, isIncurrentMonth, dayComponent) => {
            const days = selectedDays.map(day => {
              return day.date
            })
            const isSelected = isIncurrentMonth && days.includes(date.toLocaleDateString())
            const length = days.map(day => {
              return day === date.toLocaleDateString()
            }).filter(trues => {
              return trues === true
            }).length
            return <Badge color={isSelected ? 'error' : undefined} overlap="circle" badgeContent={isSelected ? length : undefined} >{dayComponent}</Badge>
          }}
        />
      </ThemeProvider>
    </div>
  )
}
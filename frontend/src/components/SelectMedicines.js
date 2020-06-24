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

export default function SelectMedicine({ update, data }) {
  const classes = useStyles()

  const [formData, setFormData] = useState()
  const [select, setSelect] = useState()

  useEffect(() => {
    axios.get('/api/medicines', {
      headers: { Authorization: `Bearer ${Auth.getToken()}` }
    })
      .then(res => {
        setFormData(res.data)
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
        <InputLabel className='selectedInput'>Prescription</InputLabel>
        <Select
          className='selectInput'
          native
          onChange={(e) => handleChange(e)}
          label='Prescription'
          name='prescription'
        >
          <option aria-label="None" value="" />
          { formData && formData.map(meds => {
            return <option key={meds._id}>
              {meds.name}
            </option>
          })}

        </Select>
      </FormControl>
        
      
    </div>
  )
}
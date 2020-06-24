import React from 'react'
import axios from 'axios'
import Auth from '../lib/auth'
import DeleteForeverIcon from '@material-ui/icons/DeleteForever'

export default function DeleteAppointment({ id }) {

  async function handleDelete() {
    try {
      let res = await axios.delete(`/api/appointment/${id}`, {
        headers: { Authorization: `Bearer ${Auth.getToken()}` }
      })
      if (res.status === 200) {
        window.location.reload()
      }
    } catch (err) {
      console.log(err)
    }
    
  }





  return (
    <a style={{ margin: '0 20px 20px 20px' }} id='' onClick={() => handleDelete()}><DeleteForeverIcon /></a>
  )
}

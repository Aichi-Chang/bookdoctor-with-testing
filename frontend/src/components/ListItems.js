import React from 'react'
import { Link } from 'react-router-dom'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import NoteAddIcon from '@material-ui/icons/NoteAdd'
import HomeIcon from '@material-ui/icons/Home'
import AddCircleIcon from '@material-ui/icons/AddCircle'
import ExitToAppIcon from '@material-ui/icons/ExitToApp'
import HighlightOffIcon from '@material-ui/icons/HighlightOff'
import Avatar from './Avatar'

import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'

import axios from 'axios'
import Auth from '../lib/auth'



export default function ListItems({ open, props }) {

  function handleLogout() {
    Auth.logOut()
  }

  async function handleDelete() {
    try {
      let res = await axios.delete('/api/user', {
        headers: { Authorization: `Bearer ${Auth.getToken()}` }
      })
      if (res.status === 200) {
        Auth.logOut()
        props.history.push('/')
      }
    } catch (err) {
      alert(err)
    } 
  }

  const [openDialog, setOpenDialog] = React.useState(false)

  const handleClickOpen = () => {
    setOpenDialog(true)
  }

  const handleClose = () => {
    setOpenDialog(false)
  }


  return (
    <div>
      <div className='navFlexBox'>
        <Avatar />
        {open ? <h1 style={{ marginLeft: '10px' }}>{`${Auth.getUser().username}`}</h1> : null}
      </div>


      <ListItem button>
        <Link to={'/'}>
          <ListItemIcon>
            <HomeIcon />
          </ListItemIcon>
        </Link>
        <Link to={'/'}>
          <ListItemText primary="Home" />
        </Link>
      </ListItem>
    
      {Auth.getUser().role === 'patient' && <ListItem button>
        <Link to={'/appointment'}>
          <ListItemIcon>
            <AddCircleIcon />
          </ListItemIcon>
        </Link>
        <Link to={'/appointment'}>
          <ListItemText primary="Book Appointment"/> 
        </Link>
      </ListItem>}

      {Auth.getUser().role === 'doctor' && <ListItem button>
        <Link to={'/history'}>
          <ListItemIcon>
            <NoteAddIcon />
          </ListItemIcon>
        </Link>
        <Link to={'/history'}>
          <ListItemText primary="Patient History"/> 
        </Link>
      </ListItem>}
    
      <ListItem button>
        <a href='/' onClick={() => handleLogout()}>
          <ListItemIcon>
            <ExitToAppIcon />
          </ListItemIcon>
        </a>
        <a href='/' onClick={() => handleLogout()}>
          <ListItemText primary="Log Out"/> 
        </a>
      </ListItem>




      <ListItem button >
        <a id='' onClick={() => handleClickOpen()}>
          <ListItemIcon>
            <HighlightOffIcon />
          </ListItemIcon>
        </a>
        <a id='' onClick={() => handleClickOpen()}>
          <ListItemText primary="Delete Account"/> 
        </a>
        <div>
          <Dialog
            open={openDialog}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle id="alert-dialog-title">{'Delete Account?'}</DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-description">
                Sure you want to leave us?
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <a id='' className='naV' onClick={handleClose} color="primary">
                Let me think about it
              </a>
              <a id='' className='naV' onClick={handleDelete} color="primary" autoFocus>
                Yes
              </a>
            </DialogActions>
          </Dialog>
        </div>
      </ListItem>
    </div>
  )

} 


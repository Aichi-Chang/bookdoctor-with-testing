import React from 'react'
import { Link } from 'react-router-dom'
import 'bulma'

import Auth from '../lib/auth'


const Navbar = () => {

  const [navClassName, setNavClassName] = React.useState('navbar-menu')

  const clickBurger = () => {
    if (navClassName === 'navbar-menu') {
      setNavClassName('navbar-menu is-active')
    } else {
      setNavClassName('navbar-menu')
    }
  }


  function handleLogout() {
    Auth.logOut()
    window.location.reload()
  }



  return (
    <div className="navbar">

      <div className="navbar-brand">
        <Link className="navbar-item" to="/">
          <img className="logo" src=''/></Link>

        <a role="button" className="navbar-burger burger" aria-label="menu" aria-expanded="false" data-target="navbarExampleTransparentExample" onClick={clickBurger}>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
        </a>

      </div>


      <div className={navClassName}>

        <div className="navbar-end">
          <div className="navbar-item">
            <Link className='naV' to={'/'}>Home</Link>
          </div>
          <div className="navbar-item">
            <Link className='naV' to={'/about'}>About</Link>
          </div>
          {Auth.isAuthenticated() && Auth.getUser().role === 'doctor' && 
            <div className="navbar-item">
              <Link className='naV' to={'/history'}>Patient History</Link>
            </div>}
          {Auth.isAuthenticated() && Auth.getUser().role === 'patient' && 
            <div className="navbar-item">
              <Link className='naV' to={'/appointment'}>Book Appointment</Link>
            </div>}
          {Auth.isAuthenticated() && <div className='navFlexBox'>
            <div className="navbar-item">
              <Link className='naV' to={'/dashboard'}>Dashboard</Link>
            </div>
            <div className="navbar-item" onClick={() => handleLogout()}>
              <a id='' className='naV'>LogOut</a>
            </div>
          </div>}
          
          {!Auth.isAuthenticated() && <div className='navFlexBox'>
            <div className="navbar-item">
              <Link className='naV' to={'/login'}>Login</Link>
            </div>
            <div className="navbar-item">
              <Link className='naV' to={'/register'}>Register</Link>
            </div>
          </div>}
        </div>
      </div>
    </div>

  )
}

export default Navbar



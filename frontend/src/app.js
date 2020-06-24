import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import ReactDOM from 'react-dom'
import 'core-js/stable'
import 'regenerator-runtime/runtime'

//Components
//user focused
import Register from './components/Register'
import Login from './components/Login'
import BookAppointment from './components/BookAppointment'
import History from './components/History'
import Dashboard from './components/Dashboard'
//pages
import Home from './HomeTheme/Home'
import About from './components/About'

import NotFound from './components/NotFound'

import 'bulma'
import './css/style.css'


const App = () => (
  <BrowserRouter>

    <Switch>
      <Route exact path= '/' component={Home} /> 
      <Route path="/about" component={About} />
      <Route path="/register" component={Register} />
      <Route path="/login" component={Login} />
      <Route path="/dashboard" component={Dashboard} />
      <Route path="/history" component={History} />
      <Route path="/appointment" component={BookAppointment} />

      <Route exact path= '/notfound' component={NotFound} />    

    </Switch>

  </BrowserRouter>
)


ReactDOM.render(
  <App />,
  document.getElementById('root')
)
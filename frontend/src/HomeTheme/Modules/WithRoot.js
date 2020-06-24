import React from 'react'
import { ThemeProvider } from '@material-ui/core/styles'
import CssBaseline from '@material-ui/core/CssBaseline'
import Theme from './Theme'

export default function withRoot(Component) {
  function WithRoot(props) {
    return (
      <ThemeProvider theme={Theme}>
        <CssBaseline />
        <Component {...props} />
      </ThemeProvider>
    )
  }

  return WithRoot
}
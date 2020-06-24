import withRoot from './Modules/withRoot'
// --- Post bootstrap -----
import React from 'react'
import Container from '@material-ui/core/Container'
import Box from '@material-ui/core/Box'
import Markdown from './Modules/Components/Markdown'
import Typography from './Modules/Components/Typography'
import AppAppBar from './Modules/views/AppAppBar'
import terms from './Modules/views/terms.md'
import AppFooter from './Modules/views/AppFooter'

function Terms() {
  return (
    <React.Fragment>
      <AppAppBar />
      <Container>
        <Box mt={7} mb={12}>
          <Typography variant="h3" gutterBottom marked="center" align="center">
            Terms
          </Typography>
          <Markdown>{terms}</Markdown>
        </Box>
      </Container>
      <AppFooter />
    </React.Fragment>
  )
}

export default withRoot(Terms)
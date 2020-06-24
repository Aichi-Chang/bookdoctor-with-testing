import React from 'react'
import ReactDOM from 'react-dom'
// import { createMemoryHistory } from 'history'
import { MemoryRouter } from 'react-router-dom'
import { render } from '@testing-library/react'

import Register from '../components/Register'



test('render the ui', () => {
  // const history = createMemoryHistory()
  const { getByText, debug } = render(<Register />, { wrapper: MemoryRouter })
  const signIn = getByText(/sign in/i)
  expect(signIn).toBeInTheDocument()
  // debug()
})
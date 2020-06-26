import React from 'react'
import ReactDOM from 'react-dom'
// import { createMemoryHistory } from 'history'
import { MemoryRouter } from 'react-router-dom'
import { axe } from 'jest-axe'
import { render, fireEvent } from '@testing-library/react'
import user from '@testing-library/user-event'

import Register from '../components/Register'


test('the sign up button is rendered', () => {
  // const history = createMemoryHistory()
  const { getByRole } = render(<Register />, { wrapper: MemoryRouter })
  const signUp = getByRole('button', {name: /sign up/i})
  expect(signUp).toHaveAttribute('name', 'submit')
})


test('enter a valid value for username in register form', () => {
  const {getByLabelText} = render(<Register />, { wrapper: MemoryRouter })
  const usernameField = getByLabelText(/username/i)
  user.type(usernameField, 'phoebe')
  expect(usernameField).toHaveValue('phoebe')
})


test('the username field is accessible', async () => {
  const {getByLabelText} = render(<Register />, { wrapper: MemoryRouter })
  const usernameField = await axe(getByLabelText(/username/i))
  expect(usernameField).toHaveNoViolations()
})

// test('check if the form is submitted when clicked', () => {
//   const onSubmit = jest.fn()
//   const {getByRole} = render(<Register />, {wrapper: MemoryRouter})
//   const registerForm = getByRole('form', {name: ''})
//   // console.log(registerForm)
//   user.click(registerForm)
//   expect(onSubmit).toBeCalled()
// })
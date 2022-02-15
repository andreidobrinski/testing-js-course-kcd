import * as React from 'react'
import {render, screen, waitFor} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
// use alias to make it more clear that it's a mock
import {loadGreeting as mockLoadGreeting} from '../api'
import {GreetingLoader} from '../greeting-loader-01-mocking'

// replaces all exported functions with jest mock functions
jest.mock('../api')

test('loads greetings on click', async () => {
  const testGreeting = 'TEST_GREETING'
  // mocks API return
  mockLoadGreeting.mockResolvedValueOnce({data: {greeting: testGreeting}})
  render(<GreetingLoader />)
  const nameInput = screen.getByLabelText(/name/i)
  const loadButton = screen.getByText(/load/i)
  userEvent.type(nameInput, 'Mary')
  userEvent.click(loadButton)
  // if a function is being mocked, it's good practice to:
  // test that it's been called with the correct arg and
  // test that it's been called (only) once
  expect(mockLoadGreeting).toHaveBeenCalledWith('Mary')
  expect(mockLoadGreeting).toHaveBeenCalledTimes(1)
  await waitFor(() =>
    expect(screen.getByLabelText(/greeting/i)).toHaveTextContent(testGreeting),
  )
})

// imports a polyfill just for the test, polyfills fetch
import 'whatwg-fetch'
import * as React from 'react'
import {render, screen, waitFor} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import {rest} from 'msw'
import {setupServer} from 'msw/node'
import {GreetingLoader} from '../greeting-loader-01-mocking'

// intercepts and mocks http request
const server = setupServer(
  rest.post('/greeting', (req, res, ctx) => {
    return res(ctx.json({data: {greeting: `Hello ${req.body.subject}`}}))
  }),
)

// needed for mocking with msw
beforeAll(() => server.listen({onUnhandledRequest: 'error'}))
afterAll(() => server.close())
afterEach(() => server.resetHandlers())

test('loads greetings on click', async () => {
  render(<GreetingLoader />)
  const nameInput = screen.getByLabelText(/name/i)
  const loadButton = screen.getByText(/load/i)
  userEvent.type(nameInput, 'Mary')
  userEvent.click(loadButton)
  await waitFor(() =>
    expect(screen.getByLabelText(/greeting/i)).toHaveTextContent('Hello Mary'),
  )
})

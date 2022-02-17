import * as React from 'react'
import {render, act} from '@testing-library/react'
import {Countdown} from '../countdown'

beforeAll(() => {
  jest.spyOn(console, 'error').mockImplementation(() => {})
})

afterAll(() => {
  console.error.mockRestore()
})

afterEach(() => {
  jest.clearAllMocks()
  // counteracts jest.useFakeTimers
  jest.useRealTimers()
})

test('does not attempt to set state when unmounted (to prevent memory leaks)', () => {
  jest.useFakeTimers()
  const {unmount} = render(<Countdown />)
  unmount()
  // use act when using jest fake timers
  act(() => jest.runOnlyPendingTimers())
  expect(console.error).not.toHaveBeenCalled()
})

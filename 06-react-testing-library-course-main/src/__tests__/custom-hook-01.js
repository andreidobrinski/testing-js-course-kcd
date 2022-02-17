import * as React from 'react'
import {render, act} from '@testing-library/react'
import {useCounter} from '../use-counter'

test('exposes the count and increment/decrement functions', () => {
  // declare result here so that it can be accesible outside of the TestComponent
  let result
  function TestComponent() {
    result = useCounter()
    return null
  }
  render(<TestComponent />)
  expect(result.count).toBe(0)
  // normally you won't need to use act manually since everything is wrapped in act already
  // this is necessary since we're reaching in to call increment directly
  act(() => result.increment())
  expect(result.count).toBe(1)
  act(() => result.decrement())
  expect(result.count).toBe(0)
})

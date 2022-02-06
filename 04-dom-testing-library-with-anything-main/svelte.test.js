import '@testing-library/jest-dom/extend-expect'
import {userEventAsync} from './user-event-async'
import {getQueriesForElement} from '@testing-library/dom'
import Counter from './counter.svelte'

function render(Component) {
  const container = document.createElement('div')

  // initialize the component,
  // effectively mounts component to container
  new Component({target: container})

  return {
    container,
    ...getQueriesForElement(container),
  }
}

test('counter increments', async () => {
  const {getByText} = render(Counter)
  const counter = getByText('0')
  // also uses async for testing
  await userEventAsync.click(counter)
  expect(counter).toHaveTextContent('1')

  await userEventAsync.click(counter)
  expect(counter).toHaveTextContent('2')
})

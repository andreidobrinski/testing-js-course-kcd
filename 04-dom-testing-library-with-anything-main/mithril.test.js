import '@testing-library/jest-dom/extend-expect'
import m from 'mithril'
import {getQueriesForElement, waitFor} from '@testing-library/dom'
import userEvent from '@testing-library/user-event'

const Counter = () => {
  let count = 0
  return {
    view: () =>
      m(
        'button',
        {
          onclick: () => {
            count++
          },
        },
        count,
      ),
  }
}

function render(component) {
  // create a dom node to query
  const container = document.createElement('div')
  // mount to dom node
  m.mount(container, component)
  return {
    container,
    ...getQueriesForElement(container),
  }
}

// tests:
test('counter increments', async () => {
  const {getByText} = render(Counter)
  const counter = getByText('0')
  // cant use userEventAsycn utility
  userEvent.click(counter)
  // need to use waitFor with callback, so it can continuously check assertion until it passes
  await waitFor(() => expect(counter).toHaveTextContent('1'))

  userEvent.click(counter)
  await waitFor(() => expect(counter).toHaveTextContent('2'))
})

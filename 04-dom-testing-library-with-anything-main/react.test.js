import '@testing-library/jest-dom/extend-expect'
import * as React from 'react'
import ReactDOM from 'react-dom'
import {getQueriesForElement} from '@testing-library/dom'
import userEvent from '@testing-library/user-event'

function Counter() {
  const [count, setCount] = React.useState(0)
  const increment = () => setCount(c => c + 1)
  return (
    <div>
      <button onClick={increment}>{count}</button>
    </div>
  )
}

// create similar render fn as from react testing library
function render(ui) {
  const container = document.createElement('div')
  ReactDOM.render(ui, container)
  // react binds listeners to document.body, so we need to append the container to the document
  document.body.appendChild(container)
  return {
    ...getQueriesForElement(container),
    container,
    cleanup() {
      // optimizations for cleanup
      ReactDOM.unmountComponentAtNode(container)
      document.body.removeChild(container)
    },
  }
}

test('renders a counter', () => {
  const {getByText, cleanup} = render(<Counter />)
  const counter = getByText('0')
  userEvent.click(counter)
  expect(counter).toHaveTextContent('1')

  userEvent.click(counter)
  expect(counter).toHaveTextContent('2')
  // cleans up document.body between running tests
  cleanup()
})

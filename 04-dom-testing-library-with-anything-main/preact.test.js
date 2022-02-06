/** @jsx Preact.h */
import '@testing-library/jest-dom/extend-expect'
import * as Preact from 'preact'
import {getQueriesForElement, waitFor} from '@testing-library/dom'
import userEvent from '@testing-library/user-event'
import { userEventAsync } from './user-event-async';

class Counter extends Preact.Component {
  state = {count: 0}
  increment = () => this.setState(({count}) => ({count: count + 1}))
  render() {
    return (
      <div>
        <button onClick={this.increment}>{this.state.count}</button>
      </div>
    )
  }
}

function render(ui) {
  const container = document.createElement('div')
  Preact.render(ui, container)
  return {
    container,
    ...getQueriesForElement(container),
  }
}

test('renders a counter', async () => {
  const {getByText} = render(<Counter />)
  const counter = getByText('0')
  userEvent.click(counter)
  // preact does not render synchronously like react does
  await waitFor(() => expect(counter).toHaveTextContent('1'))

  // can also import and use userEventAsync to wrap the wait
  userEventAsync.click(counter)
  await waitFor(() => expect(counter).toHaveTextContent('2'))
})

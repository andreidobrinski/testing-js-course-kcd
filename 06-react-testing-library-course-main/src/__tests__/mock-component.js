import * as React from 'react'
import {render, screen} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import {HiddenMessage} from '../hidden-message'

// mock animation library to save testing run time
jest.mock('react-transition-group', () => {
  // props.in is what tells the component to render its children
  return {
    CSSTransition: (props) => (props.in ? props.children : null),
  }
})

test('shows hidden message when toggle is clicked', () => {
  const myMessage = 'hello world'
  render(<HiddenMessage>{myMessage}</HiddenMessage>)
  const toggleButton = screen.getByText(/toggle/i)
  expect(screen.queryByText(myMessage)).not.toBeInTheDocument()
  userEvent.click(toggleButton)
  expect(screen.getByText(myMessage)).toBeInTheDocument()
  userEvent.click(toggleButton)
  expect(screen.queryByText(myMessage)).not.toBeInTheDocument()
})

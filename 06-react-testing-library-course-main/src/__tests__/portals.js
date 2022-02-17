import * as React from 'react'
import {render, within} from '@testing-library/react'
import {Modal} from '../modal'

test('modal shows the children', () => {
  render(
    <Modal>
      <div data-testid="test" />
    </Modal>,
  )
  // limits queries to just what it passed to within
  const {getByTestId} = within(document.getElementById('modal-root'))
  expect(getByTestId('test')).toBeInTheDocument()
})

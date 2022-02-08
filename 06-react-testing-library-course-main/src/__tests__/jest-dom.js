import * as React from 'react'
import ReactDOM from 'react-dom'
import {FavoriteNumber} from '../favorite-number'

// intead of this
import { toHaveAttribute, toHaveTextContent } from '@testing-library/jest-dom'
expect.extend({
  toHaveAttribute,
  toHaveTextContent
})

// we can do this
import '@testing-library/jest-dom/extend-expect';

// or add the above line to the jest config to automatically have the extends on every test

test('renders a number input with a label "Favorite Number"', () => {
  const div = document.createElement('div')
  ReactDOM.render(<FavoriteNumber />, div)
  expect(div.querySelector('input')).toHaveAttribute('type', 'number')
  expect(div.querySelector('label')).toHaveTextContent('Favorite Number')
})

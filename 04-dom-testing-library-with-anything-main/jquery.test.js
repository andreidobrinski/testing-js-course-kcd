import '@testing-library/jest-dom/extend-expect'
import $ from 'jquery'
import {getQueriesForElement} from '@testing-library/dom'
import userEvent from '@testing-library/user-event'

$.fn.countify = function countify() {
  this.html(`
    <div>
      <button>0</button>
    </div>
  `)
  const $button = this.find('button')
  $button._count = 0
  $button.click(() => {
    $button._count++
    $button.text($button._count)
  })
}

// tests:
test('counter increments', () => {
  const div = document.createElement('div')
  // treating the library as a jQuery plugin
  // no need to create a render method
  $(div).countify()
  const {getByText} = getQueriesForElement(div)
  const counter = getByText('0')
  userEvent.click(counter)
  expect(counter).toHaveTextContent('1')

  userEvent.click(counter)
  expect(counter).toHaveTextContent('2')
})

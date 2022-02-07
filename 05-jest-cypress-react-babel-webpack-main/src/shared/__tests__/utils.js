import {getFormattedValue} from '../utils'

// jest will pick this file up automatically
test('formats the value', () => {
  expect(getFormattedValue('1234.0')).toBe('1,234.0')
})

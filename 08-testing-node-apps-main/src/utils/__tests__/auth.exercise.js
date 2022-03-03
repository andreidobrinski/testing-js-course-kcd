// Testing Pure Functions

import cases from 'jest-in-case'
import {isPasswordAllowed} from '../auth'

// 🐨 write tests for valid and invalid passwords
// 💰 here are some you can use:
//
// valid:
// - !aBc123
//
// invalid:
// - a2c! // too short
// - 123456! // no alphabet characters
// - ABCdef! // no numbers
// - abc123! // no uppercase letters
// - ABC123! // no lowercase letters
// - ABCdef123 // no non-alphanumeric characters

// Solution 1 below:

test('isPasswordAllowed return true for valid passwords', () => {
  const validPassword = '!aBc123'
  expect(isPasswordAllowed(validPassword)).toBe(true)
})

test('isPasswordAllowed returns false for invalid passwords', () => {
  expect(isPasswordAllowed('a2c!')).toBe(false)
  expect(isPasswordAllowed('123456!')).toBe(false)
  expect(isPasswordAllowed('ABCdef!')).toBe(false)
  expect(isPasswordAllowed('abc123!')).toBe(false)
  expect(isPasswordAllowed('ABC123!')).toBe(false)
  expect(isPasswordAllowed('ABCdef123')).toBe(false)
})

// Solution 2: refactored for better error messages

describe('isPasswordAllowed only allows some passwords', () => {
  const allowedPasswords = ['!aBc123']
  const disallowedPasswords = [
    'a2c!',
    '123456!',
    'ABCdef!',
    'abc123!',
    'ABC123!',
    'ABCdef123',
  ]

  allowedPasswords.forEach(password => {
    test(`allows ${password}`, () => {
      expect(isPasswordAllowed(password)).toBe(true)
    })
  })

  disallowedPasswords.forEach(password => {
    test(`disallows ${password}`, () => {
      expect(isPasswordAllowed(password)).toBe(false)
    })
  })
})

// Solution 3: jest-in-case

cases(
  'isPasswordAllowed: valid passwords',
  (options) => {
    expect(isPasswordAllowed(options.password)).toBe(true)
  },
  {
    'validPassword': {
      password: '!aBc123'
    }
  }
)

cases(
  'isPasswordAllowed: invalid passwords',
  (options) => {
    expect(isPasswordAllowed(options.password)).toBe(false)
  },
  {
    'too short': {
      password: 'a2c!',
    },
    'no letters': {
      password: '123456!',
    },
    'no numbers': {
      password: 'ABCdef!',
    },
    'no uppercase letters': {
      password: 'abc123!',
    },
    'no lowercase letters': {
      password: 'ABC123!',
    },
    'no non-alphanumeric characters': {
      password: 'ABCdef123',
    },
  }
)

// Solution 4: refactor jest-in-case for better error messages

function casify(obj) {
  return Object.entries(obj).map(([name, password]) => {
    return {
      name: `${password} - ${name}`,
      password,
    }
  })
}

cases(
  'isPasswordAllowed: valid passwords',
  (options) => {
    expect(isPasswordAllowed(options.password)).toBe(true)
  },
  casify({
    'validPassword':'!aBc123',
  })
)

cases(
  'isPasswordAllowed: invalid passwords',
  (options) => {
    expect(isPasswordAllowed(options.password)).toBe(false)
  },
  casify({
    'too short':'a2c!',
    'no letters':'123456!',
    'no numbers':'ABCdef!',
    'no uppercase letters':'abc123!',
    'no lowercase letters':'ABC123!',
    'no non-alphanumeric characters':'ABCdef123',
  })
)
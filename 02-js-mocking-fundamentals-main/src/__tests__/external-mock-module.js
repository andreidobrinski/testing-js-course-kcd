const thumbWar = require('../thumb-war')
const utilsMock = require('../utils')

// jest looks in the __mocks__ directory,
// finds a file with the same name
// and uses that implementation instead
jest.mock('../utils')

test('returns winner', () => {
  const winner = thumbWar('Kent C. Dodds', 'Ken Wheeler')
  expect(winner).toBe('Kent C. Dodds')
  expect(utilsMock.getWinner.mock.calls).toEqual([
    ['Kent C. Dodds', 'Ken Wheeler'],
    ['Kent C. Dodds', 'Ken Wheeler']
  ])

  // cleanup
  utilsMock.getWinner.mockReset()
})

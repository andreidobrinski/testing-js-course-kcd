const thumbWar = require('../thumb-war')
const utils = require('../utils')

test('returns winner', () => {
  const originalGetWinner = utils.getWinner
  utils.getWinner = jest.fn((p1, p2) => p1)

  const winner = thumbWar('Kent C. Dodds', 'Ken Wheeler')
  expect(winner).toBe('Kent C. Dodds')
  
  // method 1
  expect(utils.getWinner.mock.calls).toEqual([
    ['Kent C. Dodds', 'Ken Wheeler'],
    ['Kent C. Dodds', 'Ken Wheeler']
  ])

  // method 2
  // expects fn to be called twice
  expect(utils.getWinner).toHaveBeenCalledTimes(2)
  // expects args on first call
  expect(utils.getWinner).toHaveBeenNthCalledWith(
    1,
    'Kent C. Dodds',
    'Ken Wheeler'
  )
  // expects same args on second call
  expect(utils.getWinner).toHaveBeenNthCalledWith(
    2,
    'Kent C. Dodds',
    'Ken Wheeler'
  )

  // cleanup
  utils.getWinner = originalGetWinner
})

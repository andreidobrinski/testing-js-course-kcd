// Testing Controllers

import {
  buildReq,
  buildRes,
  buildUser,
  buildBook,
  buildListItem,
  buildNext,
} from 'utils/generate'

import * as booksDB from '../../db/books'
import * as listItemsController from '../list-items-controller'

jest.mock('../../db/books')

beforeEach(() => {
  jest.clearAllMocks()
})

test('getListItem returns the req.listItem', async () => {
  const user = buildUser()
  const book = buildBook()

  const listItem = buildListItem({ownerId: user.id, bookId: book.id})
  
  booksDB.readById.mockResolvedValueOnce(book)

  const req = buildReq({ user, listItem })
  const res = buildRes()

  await listItemsController.getListItem(req, res)
  
  expect(booksDB.readById).toHaveBeenCalledWith(book.id)
  expect(booksDB.readById).toHaveBeenCalledTimes(1)

  expect(res.json).toHaveBeenCalledWith({
    listItem: { ...listItem, book }
  })
  expect(res.json).toHaveBeenCalledTimes(1)
})

test('createListItem returns a 400 error if no bookId is provided', async () => {
  const req = buildReq()
  const res = buildRes()

  await listItemsController.createListItem(req, res)

  expect(res.status).toHaveBeenCalledWith(400)
  expect(res.status).toHaveBeenCalledTimes(1)
  expect(res.json).toHaveBeenCalledWith({ message: 'No bookId provided' })
  // above is the same as
  expect(res.json.mock[0][0]).toEqual({ message: 'No bookId provided' })
  // also the same as
  expect(res.json.mock.calls[0]).toMatchInlineSnapshot(`
    // snapshot generated
  `)
  // above is useful for error messages
  expect(res.json).toHaveBeenCalledTimes(1)
})

import * as listItemsDB from '../../db/list-items'

jest.mock('../../db/list-items')

test('setListItem sets the list item on the req', async () => {
  const user = buildUser()
  const listItem = buildListItem({ ownerId: user.id })

  listItemsDB.readById.mockResolvedValueOnce(listItem)

  const req = buildReq({
    user,
    params: {
      id: listItem.id
    }
  })
  const res = buildRes()
  const next = buildNext()

  await listItemsController.setListItem(req, res, next)

  expect(listItemsDB.readById).toHaveBeenCalledWith(listItem.id)
  expect(listItemsDB.readById).toHaveBeenCalledTimes(1)

  expect(next).toHaveBeenCalledWith(/* nothing */)
  expect(next).toHaveBeenCalledTimes(1)

  expect(req.listItem).toBe(listItem)
})

test('setListItem returns a 404 error if the list item does not exist', async () => {
  const fakeListItemId = 'fake list item id'
  listItemsDB.readById.mockResolvedValueOnce(null)

  const req = buildReq({
    params: {
      id: fakeListItemId
    }
  })
  const res = buildRes()
  const next = buildNext()

  await listItemsController.setListItem(req, res, next)

  expect(listItemsDB.readById).toHaveBeenCalledWith(fakeListItemId)
  expect(listItemsDB.readById).toHaveBeenCalledTimes(1)

  expect(next).not.toHaveBeenCalled()

  expect(res.status).toHaveBeenCalledWith(404)
  expect(res.status).toHaveBeenCalledTimes(1)
  expect(res.json.mock.calls[0]).toMatchInlineSnapshot(`
    // snapshot gets generated here
  `)
  expect(res.json).toHaveBeenCalledTimes(1)
})

test('setListItem returns a 403 error if the list item does not belong to the user', async () => {
  const user = buildUser({
    id: 'fake_user_id'
  })
  const listItem = buildListItem({
    ownerId: 'someone_else',
    id: 'fake_list_item_id'
  })

  listItemsDB.readById.mockResolvedValueOnce(listItem)

  const req = buildReq({
    user,
    params: {
      id: listItem.id
    }
  })
  const res = buildRes()

  await listItemsController.setListItem(req, res)

  expect(listItemsDB.readById).toHaveBeenCalledWith(listItem.id)
  expect(listItemsDB.readById).toHaveBeenCalledTimes(1)

  expect(next).not.toHaveBeenCalled()

  expect(res.status).toHaveBeenCalledWith(403)
  expect(res.status).toHaveBeenCalledTimes(1)
  expect(res.json.mock.calls[0]).toMatchInlineSnapshot(`
    // snapshot gets generated here
  `)
  expect(res.json).toHaveBeenCalledTimes(1)
})
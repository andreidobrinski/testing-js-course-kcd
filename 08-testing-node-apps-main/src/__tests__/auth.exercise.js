// Testing Authentication API Routes

import axios from 'axios'
import {resetDb} from 'utils/db-utils'
import * as generate from 'utils/generate'
import startServer from '../start'
import { handleRequestFailure, getData, resolve } from 'utils/async'
import * as usersDB from '../db/users'

let server, api

beforeAll(async () => {
  server = await startServer()
  const baseURL = `http://localhost:${server.address().port}/api`
  api = axios.create({ baseURL })
  api.interceptors.response.use(getData, handleRequestFailure)
})

afterAll(async () => {
  await server.close()
})

beforeEach(() => {
  resetDb()
})

test('auth flow', async () => {
  const { username, password } = generate.loginForm()
  const rData = await api.post('auth/register', {
    username,
    password
  })
  
  expect(rData.user).toEqual({
    token: expect.any(String),
    id: expect.any(String),
    username,
  })

  const lData = await api.post('auth/login', {
    username,
    password
  })

  expect(lData.user).toEqual(rData.user)
  
  const mData = await api.get('auth/me', {
    headers: {
      Authorization: `Bearer ${lData.user.token}`
    }
  })

  expect(mData.user).toEqual(lData.user)
})

test('username must be unique', async () => {
  const { username, password } = generate.loginForm()
  await usersDB.insert(generate.buildUser({ username }))

  // do repeat register
  const error = await api.post('auth/register', {
    username,
    password
  }).catch(resolve)
  // same as doing this:
  // }).catch((result) => result)

  expect(error).toMatchInlineSnapshot(
    // snapshow ends up here
  )
})

test('get me unauthenticated returns error', async () => {
  const error = await api.get('auth/me').catch(resolve)

  expect(error).toMatchInlineSnapshot(
    // snapshot
  )
})

test('username required to register', async () => {
  const error = await api.post('auth/register', { password: generate.password() }).catch(resolve)

  expect(error).toMatchInlineSnapshot(
    // snapshot
  )
})

test('password required to register', async () => {
  const error = await api.post('auth/register', { username: generate.username() }).catch(resolve)

  expect(error).toMatchInlineSnapshot(
    // snapshot
  )
})

test('username required to login', async () => {
  const error = await api.post('auth/login', { password: generate.password() }).catch(resolve)

  expect(error).toMatchInlineSnapshot(
    // snapshot
  )
})

test('password required to login', async () => {
  const error = await api.post('auth/login', { username: generate.username() }).catch(resolve)

  expect(error).toMatchInlineSnapshot(
    // snapshot
  )
})

test('user must exist to login', async () => {
  const error = await api.post('auth/login', generate.loginForm({ username: 'does_not_exist' })).catch(resolve)

  expect(error).toMatchInlineSnapshot(
    // snapshot
  )
})
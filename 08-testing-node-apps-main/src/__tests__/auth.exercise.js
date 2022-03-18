// Testing Authentication API Routes

import axios from 'axios'
import {resetDb} from 'utils/db-utils'
import * as generate from 'utils/generate'
import startServer from '../start'
import { handleRequestFailure } from 'utils/async'

let server

beforeAll(async () => {
  server = await startServer({port: 8000})
})

afterAll(async () => {
  await server.close()
})

beforeEach(() => {
  resetDb()
})

const baseURL = 'http://localhost:8000/api'

const api = axios.create({ baseURL })
api.interceptors.response.use(
  function onSuccess(response) {
  return response
}, handleRequestFailure)

test('auth flow', async () => {
  const { username, password } = generate.loginForm()
  const rResult = await api.post('auth/register', {
    username,
    password
  })
  
  expect(rResult.data.user).toEqual({
    token: expect.any(String),
    id: expect.any(String),
    username,
  })

  const lResult = await api.post('auth/login', {
    username,
    password
  })

  expect(lResult.data.user).toEqual(rResult.data.user)
  
  const mResult = await api.get('auth/me', {
    headers: {
      Authorization: `Bearer ${lResult.data.user.token}`
    }
  })

  expect(mResult.data.user).toEqual(lResult.data.user)
})

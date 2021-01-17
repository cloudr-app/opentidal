import search from "../src/search"
import auth from "../src/auth"

const client_id = process.env.CLIENT_ID as string
const client_secret = process.env.CLIENT_SECRET as string
const refresh_token = process.env.REFRESH_TOKEN as string
let access_token: string
const query = "getter"

beforeAll(async () => {
  const res = await auth.useRefreshToken({ client_id, client_secret, refresh_token })
  access_token = res.access_token
})

test("Search all using client_id", async () => {
  const data = await search.all({ query, client_id })
  expect(data).toBeTruthy()
  expect(data.artists.items.length).toBeTruthy()
})

test("Search all using access_token", async () => {
  const data = await search.all({ query, access_token })
  expect(data).toBeTruthy()
  expect(data.artists.items.length).toBeTruthy()
})

test("Search all throws using nothing", async () => {
  // @ts-ignore
  expect(search.all({ query })).rejects.toThrow()
})

test("Search tracks using client_id", async () => {
  const data = await search.tracks({ query, client_id })
  expect(data).toBeTruthy()
  expect(data.items.length).toBeTruthy()
})

test("Search tracks using client_id with limit", async () => {
  const data = await search.tracks({ query, client_id, limit: 1 })
  expect(data).toBeTruthy()
  expect(data.items.length).toBe(1)
})

test("Search tracks using access_token", async () => {
  const data = await search.tracks({ query, access_token })
  expect(data).toBeTruthy()
  expect(data.items.length).toBeTruthy()
})

test("Search tracks throws using nothing", async () => {
  // @ts-ignore
  expect(search.tracks({ query })).rejects.toThrow()
})

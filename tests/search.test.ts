import search from "../src/search"

const client_id = process.env.CLIENT_ID as string
const access_token = process.env.ACCESS_TOKEN as string
const query = "getter"

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

test("Search tracks using access_token", async () => {
  const data = await search.tracks({ query, access_token })
  expect(data).toBeTruthy()
  expect(data.items.length).toBeTruthy()
})

test("Search tracks throws using nothing", async () => {
  // @ts-ignore
  expect(search.tracks({ query })).rejects.toThrow()
})

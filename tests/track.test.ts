import track from "../src/track"
import auth from "../src/auth"

const client_id = process.env.CLIENT_ID as string
const client_secret = process.env.CLIENT_SECRET as string
const refresh_token = process.env.REFRESH_TOKEN as string
let access_token: string
const id = 155675579

beforeAll(async () => {
  const res = await auth.useRefreshToken({ client_id, client_secret, refresh_token })
  access_token = res.access_token
})

test("Get track info using client_id", async () => {
  const data = await track.get({ id, client_id })
  expect(data.id).not.toBeNaN()
  expect(data.url).toBeTruthy()
})

test("Get track info using access_token", async () => {
  const data = await track.get({ id, access_token })
  expect(data.id).not.toBeNaN()
  expect(data.url).toBeTruthy()
})

test("Get track info throws using nothing", async () => {
  // @ts-ignore
  expect(track.get({ id })).rejects.toThrow()
})

test("Get track streaming url", async () => {
  const data = await track.stream({ id, access_token })
  expect(data.urls.length).toBeGreaterThan(0)
  expect(data.encryptionType).toBe("NONE")
})

test("Get track throws using nothing", async () => {
  // @ts-ignore
  expect(track.get({ id })).rejects.toThrow()
})

test("Get track contributors using client_id", async () => {
  const data = await track.contributors({ id, client_id })
  expect(data.items.length).toBeGreaterThan(0)
  expect(data.items[0].name).toBeTruthy()
})

test("Get track contributors using access_token", async () => {
  const data = await track.contributors({ id, access_token })
  expect(data.items.length).toBeGreaterThan(0)
  expect(data.items[0].name).toBeTruthy()
})

test("Get track contributors throws using nothing", async () => {
  // @ts-ignore
  expect(track.contributors({ id })).rejects.toThrow()
})

import { playlist, auth } from "../src"

const client_id = process.env.CLIENT_ID as string
const client_secret = process.env.CLIENT_SECRET as string
const refresh_token = process.env.REFRESH_TOKEN as string
let access_token: string
const uuid = "22b5fd4f-4f83-4c12-bc93-812d5fd7052f"

beforeAll(async () => {
  const res = await auth.useRefreshToken({ client_id, client_secret, refresh_token })
  access_token = res.access_token
})

test("Get playlist using client_id", async () => {
  const data = await playlist.get({ uuid, client_id })
  expect(data.duration).not.toBeNaN()
  expect(data.title).toBeTruthy()
})

test("Get playlist using access_token", async () => {
  const data = await playlist.get({ uuid, access_token })
  expect(data.duration).not.toBeNaN()
  expect(data.title).toBeTruthy()
})

test("Get playlist throws using nothing", async () => {
  // @ts-ignore
  expect(playlist.get({ uuid })).rejects.toThrow()
})

test("Get playlist's items using client_id", async () => {
  const data = await playlist.items({ uuid, client_id })
  expect(data.totalNumberOfItems).not.toBeNaN()
  expect(data.items[0].item.title).toBeTruthy()
})

test("Get playlist's items using access_token", async () => {
  const data = await playlist.items({ uuid, access_token })
  expect(data.totalNumberOfItems).not.toBeNaN()
  expect(data.items[0].item.title).toBeTruthy()
})

test("Get playlist's items throws using nothing", async () => {
  // @ts-ignore
  expect(playlist.items({ uuid })).rejects.toThrow()
})

test("Get playlist's recommendations using access_token", async () => {
  const data = await playlist.recommendations({ uuid, access_token })
  expect(data.totalNumberOfItems).not.toBeNaN()
  expect(data.items[0].item.title).toBeTruthy()
})

test("Get playlist's recommendations throws using nothing", async () => {
  // @ts-ignore
  expect(playlist.recommendations({ uuid })).rejects.toThrow()
})

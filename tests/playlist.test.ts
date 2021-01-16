import playlist from "../src/playlist"

const client_id = process.env.CLIENT_ID as string
const access_token = process.env.ACCESS_TOKEN as string
const uuid = "22b5fd4f-4f83-4c12-bc93-812d5fd7052f"

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

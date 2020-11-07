import playlist from "../src/playlist"

const client_id = process.env.CLIENT_ID
const access_token = process.env.ACCESS_TOKEN
const uuid = "22b5fd4f-4f83-4c12-bc93-812d5fd7052f"

test("Get playlist", async () => {
  const data = await playlist.get({ uuid, client_id })
  expect(data.duration).not.toBeNaN()
  expect(data.title).toBeTruthy()
})

test("Get playlist's items", async () => {
  const data = await playlist.items({ uuid, client_id })
  expect(data.totalNumberOfItems).not.toBeNaN()
  expect(data.items[0].item.title).toBeTruthy()
})

test("Get playlist's recommendations", async () => {
  const data = await playlist.recommendations({ uuid, access_token })
  expect(data.totalNumberOfItems).not.toBeNaN()
  expect(data.items[0].item.title).toBeTruthy()
})

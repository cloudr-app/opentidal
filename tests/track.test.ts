import track from "../src/track"

const client_id = process.env.CLIENT_ID
const id = 155675579
const access_token = process.env.ACCESS_TOKEN

test("Get track info", async () => {
  const data = await track.get({ id, client_id })
  expect(data.id).not.toBeNaN()
  expect(data.url).toBeTruthy()
})

test("Get track streaming url", async () => {
  const data = await track.stream({ id, access_token })
  expect(data.urls.length).toBeGreaterThan(0)
  expect(data.encryptionType).toBe("NONE")
})

test("Get track contributors", async () => {
  const data = await track.contributors({ id, access_token })
  expect(data.items.length).toBeGreaterThan(0)
  expect(data.items[0].name).toBeTruthy()
})

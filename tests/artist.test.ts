import artist from "../src/artist"

const client_id = process.env.CLIENT_ID
const id = 3529689

test("Get artist", async () => {
  const data = await artist.get({ id, client_id })
  expect(data.id).not.toBeNaN()
  expect(data.name).toBeTruthy()
})

test("Get artist's bio", async () => {
  const data = await artist.bio({ id, client_id })
  expect(data.text).toBeTruthy()
})

test("Get artist's top tracks", async () => {
  const data = await artist.topTracks({ id, client_id })
  expect(data.items.length).toBeGreaterThan(0)
  expect(data.items[0].id).not.toBeNaN()
})

test("Get artist's albums", async () => {
  const data = await artist.albums({ id, client_id })
  expect(data.items.length).toBeGreaterThan(0)
  expect(data.items[0].id).not.toBeNaN()
})

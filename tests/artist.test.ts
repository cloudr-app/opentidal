import artist from "../src/artist"

const client_id = process.env.CLIENT_ID as string
const access_token = process.env.ACCESS_TOKEN as string
const id = 3529689

test("Get artist using client_id", async () => {
  const data = await artist.get({ id, client_id })
  expect(data.id).not.toBeNaN()
  expect(data.name).toBeTruthy()
})

test("Get artist using access_token", async () => {
  const data = await artist.get({ id, access_token })
  expect(data.id).not.toBeNaN()
  expect(data.name).toBeTruthy()
})

test("Get artist throws using nothing", async () => {
  // @ts-ignore
  expect(artist.get({ id })).rejects.toThrow()
})

test("Get artist's bio using client_id", async () => {
  const data = await artist.bio({ id, client_id })
  expect(data.text).toBeTruthy()
})

test("Get artist's bio using access_token", async () => {
  const data = await artist.bio({ id, access_token })
  expect(data.text).toBeTruthy()
})

test("Get artist's bio throws using nothing", async () => {
  // @ts-ignore
  expect(artist.bio({ id })).rejects.toThrow()
})

test("Get artist's top tracks using client_id", async () => {
  const data = await artist.topTracks({ id, client_id })
  expect(data.items.length).toBeGreaterThan(0)
  expect(data.items[0].id).not.toBeNaN()
})

test("Get artist's top tracks using access_token", async () => {
  const data = await artist.topTracks({ id, access_token })
  expect(data.items.length).toBeGreaterThan(0)
  expect(data.items[0].id).not.toBeNaN()
})

test("Get artist's top tracks throws using nothing", async () => {
  // @ts-ignore
  expect(artist.topTracks({ id })).rejects.toThrow()
})

test("Get artist's albums using client_id", async () => {
  const data = await artist.albums({ id, client_id })
  expect(data.items.length).toBeGreaterThan(0)
  expect(data.items[0].id).not.toBeNaN()
})

test("Get artist's albums using access_token", async () => {
  const data = await artist.albums({ id, access_token })
  expect(data.items.length).toBeGreaterThan(0)
  expect(data.items[0].id).not.toBeNaN()
})

test("Get artist's albums throws using nothing", async () => {
  // @ts-ignore
  expect(artist.albums({ id })).rejects.toThrow()
})

test("Get artist's links using client_id", async () => {
  const data = await artist.links({ id, client_id })
  expect(data).toBeTruthy()
})

test("Get artist's links using access_token", async () => {
  const data = await artist.links({ id, access_token })
  expect(data).toBeTruthy()
})

test("Get artist's links throws using nothing", async () => {
  // @ts-ignore
  expect(artist.links({ id })).rejects.toThrow()
})

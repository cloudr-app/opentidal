import track from "../src/track"

const client_id = ""
const id = 155675579
const access_token = ""

test("Get track info", async () => {
  const data = await track.get({ id, client_id })
  expect(data.id).not.toBeNaN()
  expect(data.url).toBeTruthy()
})

test("Get track streaming url", async () => {
  const data = await track.playbackInfoPostPaywall({ id, access_token })
  expect(data.urls).not.toHaveLength(0)
  expect(data.encryptionType).toBe("NONE")
})

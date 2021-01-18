import { auth } from "../src"

const client_id = process.env.CLIENT_ID as string
const client_secret = process.env.CLIENT_SECRET as string
const refresh_token = process.env.REFRESH_TOKEN as string

test("Generate a DeviceCode and UserCode", async () => {
  const deviceTokenOutput = await auth.getDeviceToken({ client_id })
  expect(deviceTokenOutput.deviceCode).toBeTruthy()
})

test("Get an AccessToken", async () => {
  const { deviceCode } = await auth.getDeviceToken({ client_id })
  const token = await auth.getAccessToken({ client_id, client_secret, device_code: deviceCode })

  if ("status" in token) expect(token.status).toBe(400)
})

test("Get an AccessToken using refresh token", async () => {
  const { access_token } = await auth.useRefreshToken({ client_id, client_secret, refresh_token })

  expect(access_token).toBeTruthy()
})

import auth from "../src/auth"

const client_id = process.env.CLIENT_ID as string
const client_secret = process.env.CLIENT_SECRET as string

test("Generate a DeviceCode and UserCode", async () => {
  const deviceTokenOutput = await auth.getDeviceToken({ client_id })
  expect(deviceTokenOutput.deviceCode).toBeTruthy()
})

test("Generate an AccessToken", async () => {
  const { deviceCode } = await auth.getDeviceToken({ client_id })
  const token = await auth.getAccessToken({ client_id, client_secret, device_code: deviceCode })

  if ("status" in token) expect(token.status).toBe(400)
})

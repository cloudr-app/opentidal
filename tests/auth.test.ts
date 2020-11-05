import auth from "../src/auth"

const client_id = ""

test("Generate a DeviceCode and UserCode", async () => {
  const deviceTokenOutput = await auth.getDeviceToken({ client_id })
  expect(deviceTokenOutput.deviceCode).toBeTruthy()
})

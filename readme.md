<p align="center">
  <a href="https://github.com/openTIDAL/openTIDAL.js" target="_blank">
    <img src="https://colo.vaaski.com/static/openTIDAL-banner.svg">
  </a>
</p>
<hr>

<p align="center">
  A thin TIDAL API wrapper written in TypeScript with 100% test coverage.
</p>

<p align="center">
  <a href="https://npmjs.org/package/opentidal" alt="version">
    <img src="https://img.shields.io/npm/v/opentidal.svg?style=for-the-badge">
  </a>
  <a href="https://codecov.io/gh/openTIDAL/openTIDAL.js" alt="downloads">
    <img alt="Codecov" src="https://img.shields.io/codecov/c/gh/openTIDAL/openTIDAL.js?style=for-the-badge">
  </a>
  <a href="https://npmjs.org/package/opentidal" alt="downloads">
    <img src="https://img.shields.io/npm/dw/opentidal.svg?style=for-the-badge">
  </a>
</p>

# Example usage

```ts
import { auth } from "openTIDAL"

const client_id = "client_id"
const client_secret = "client_secret"

;(async () => {
  // get a device token to start the auth process
  const deviceToken = await auth.getDeviceToken({ client_id })

  // prints something like https://link.tidal.com/ABCDE
  // go to the provided URI and authorize the device
  console.log(`authorize via https://${deviceToken.verificationUriComplete}`)

  let accessToken

  // poll this endpoint until authorization is complete
  const interval = setInterval(async () => {
    console.log("checking if authorized")
    accessToken = await auth.getAccessToken({
      client_id,
      client_secret,
      device_code: deviceToken.deviceCode,
    })

    // if the response contains an access_token, you're authenticated!
    if ("access_token" in accessToken) {
      clearInterval(interval)
      console.log("access_token:", accessToken.access_token)
    }
  }, deviceToken.interval * 1000)
})()
```

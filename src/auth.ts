import axios from "axios"
import * as qs from "qs"

const baseURL = "https://auth.tidal.com/v1/"

interface DeviceTokenInput {
  client_id: string
  scope: string
}

interface DeviceTokenOutput {
  deviceCode: string
  userCode: string
  verificationUri: string
  verificationUriComplete: string
  expiresIn: number
  interval: number
}

interface AccessTokenInput {
  client_id: string
  client_secret: string
  device_code: string
  grant_type?: string
  scope?: string
}

interface AccessTokenOutput {
  access_token: string
  refresh_token: string
  token_type: string
  expires_in: number
}

const auth = {
  getDeviceToken: async ({ client_id, scope }: DeviceTokenInput): Promise<DeviceTokenOutput> => {
    const { data } = await axios({
      baseURL,
      method: "post",
      url: "oauth2/device_authorization",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      data: qs.stringify({ client_id, scope }),
    })

    return data
  },
  getAccessToken: async ({
    client_id,
    client_secret,
    device_code,
    grant_type = "urn:ietf:params:oauth:grant-type:device_code",
    scope = "r_usr+w_usr",
  }: AccessTokenInput): Promise<AccessTokenOutput> => {
    const { data } = await axios({
      baseURL,
      method: "post",
      url: "oauth2/token",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      auth: {
        username: client_id,
        password: client_secret,
      },
      data: qs.stringify({
        client_id,
        device_code,
        grant_type,
        scope,
      }),
    })

    return data
  },
}

export default auth

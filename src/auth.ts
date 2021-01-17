import got from "got"

const prefixUrl = "https://auth.tidal.com/v1/oauth2"
export interface DeviceTokenArgs {
  client_id: string
  scope?: string
}

export interface DeviceToken {
  deviceCode: string
  userCode: string
  verificationUri: string
  verificationUriComplete: string
  expiresIn: number
  interval: number
}

export interface AccessTokenArgs {
  client_id: string
  client_secret: string
  grant_type?: string
  scope?: string
}

export interface AccessTokenWithDeviceCode extends AccessTokenArgs {
  device_code: string
}

export interface AccessTokenWithRefreshToken extends AccessTokenArgs {
  refresh_token: string
}

export interface AccessToken {
  access_token: string
  token_type: string
  expires_in: number
}

export interface AccessTokenWithRefresh extends AccessToken {
  refresh_token: string
}

export interface AuthorizationPending {
  status: number
  error: string
  error_description: string
  sub_status: number
}

export default {
  /**
   * Generate a DeviceCode and UserCode.
   * After that, redirect the User to the verificationUriComplete URI
   */
  getDeviceToken: async ({ client_id, scope = "r_usr+w_usr+w_sub" }: DeviceTokenArgs) => {
    const data = await got({
      prefixUrl,
      method: "post",
      url: "device_authorization",
      form: { client_id, scope },
    }).json()

    return data as DeviceToken
  },
  /**
   * Using the DeviceCode, poll this endpoint with the defined interval until
   * it stops returning the "authorization_pending" error.
   */
  getAccessToken: async ({
    client_id,
    client_secret,
    device_code,
    grant_type = "urn:ietf:params:oauth:grant-type:device_code",
    scope = "r_usr+w_usr",
  }: AccessTokenWithDeviceCode) => {
    const data = await got({
      prefixUrl,
      method: "post",
      url: "token",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      username: client_id,
      password: client_secret,
      form: {
        client_id,
        device_code,
        grant_type,
        scope,
      },
      throwHttpErrors: false,
      responseType: "json",
    })

    return data.body as AuthorizationPending | AccessTokenWithRefresh
  },
  /**
   * Using the DeviceCode, poll this endpoint with the defined interval until
   * it stops returning the "authorization_pending" error.
   */
  useRefreshToken: async ({
    client_id,
    client_secret,
    refresh_token,
    grant_type = "refresh_token",
    scope = "r_usr+w_usr",
  }: AccessTokenWithRefreshToken) => {
    const data = await got({
      prefixUrl,
      method: "post",
      url: "token",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      username: client_id,
      password: client_secret,
      form: {
        client_id,
        refresh_token,
        grant_type,
        scope,
      },
      throwHttpErrors: false,
      responseType: "json",
    })

    return data.body as AccessToken
  },
}

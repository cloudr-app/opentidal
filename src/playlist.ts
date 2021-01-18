import { Playlist, PlaylistContent, AccessTokenOrClientId } from "./types"

import { AxiosInstance } from "axios"

const baseURL = "https://api.tidal.com/v1/playlists"
// TODO add all the endpoints that modify stuff

export type GetArgs = {
  uuid: string
  countryCode?: string
  client_id?: string
  access_token?: string
} & AccessTokenOrClientId

export type ItemsArgs = {
  uuid: string
  limit?: number
  offset?: number
  countryCode?: string
  client_id?: string
  access_token?: string
} & AccessTokenOrClientId

export type RecommendationsArgs = {
  uuid: string
  limit?: number
  offset?: number
  countryCode?: string
  client_id?: string
  access_token?: string
} & AccessTokenOrClientId

export default (axios: AxiosInstance) =>({
  /**
   * Get info about a playlist.
   * You need to either provide a client_id or an access_token.
   * Optionally you can set a countryCode, defaults to US.
   */
  get: async ({ uuid, countryCode = "US", client_id, access_token }: GetArgs) => {
    let headers: any = { "x-tidal-token": client_id }
    if (!client_id) headers = { authorization: `Bearer ${access_token}` }

    if (!client_id && !access_token)
      throw new Error("You need to either provide a client_id or an access_token.")

    const { data } = await axios({
      baseURL,
      method: "get",
      url: `${uuid}`,
      params: {
        countryCode,
      },
      headers,
      responseType: "json",
    })

    return data as Playlist
  },
  /**
   * Get a playlist's items.
   * You need to either provide a client_id or an access_token.
   * Limit and Offset are optional and default to 50 and 0, respectively.
   * Optionally you can set a countryCode, defaults to US.
   */
  items: async ({
    uuid,
    countryCode = "US",
    limit = 50,
    offset = 0,
    client_id,
    access_token,
  }: ItemsArgs) => {
    let headers: any = { "x-tidal-token": client_id }
    if (!client_id) headers = { authorization: `Bearer ${access_token}` }

    if (!client_id && !access_token)
      throw new Error("You need to either provide a client_id or an access_token.")

    const { data } = await axios({
      baseURL,
      method: "get",
      url: `${uuid}/items`,
      params: {
        countryCode,
        limit,
        offset,
      },
      headers,
      responseType: "json",
    })

    return data as PlaylistContent
  },
  /**
   * Get a playlist's recommendations.
   * You need to either provide a client_id or an access_token.
   * Limit and Offset are optional and default to 50 and 0, respectively.
   * Optionally you can set a countryCode, defaults to US.
   */
  recommendations: async ({
    uuid,
    countryCode = "US",
    limit = 50,
    offset = 0,
    client_id,
    access_token,
  }: RecommendationsArgs) => {
    let headers: any = { authorization: `Bearer ${access_token}` }

    if (!access_token) throw new Error("You need to provide an access_token.")

    const { data } = await axios({
      baseURL,
      method: "get",
      url: `${uuid}/recommendations/items`,
      params: {
        countryCode,
        limit,
        offset,
      },
      headers,
      responseType: "json",
    })

    return data as PlaylistContent
  },
}
)
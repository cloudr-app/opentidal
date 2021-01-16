import got, { Headers } from "got"
import { PlaylistInfo, PlaylistContent, AccessTokenOrClientId } from "./types"

const prefixUrl = "https://api.tidal.com/v1/playlists"
// TODO add all the endpoints that modify stuff

type GetInput = {
  uuid: string
  countryCode?: string
  client_id?: string
  access_token?: string
} & AccessTokenOrClientId

type ItemsInput = {
  uuid: string
  limit?: number
  offset?: number
  countryCode?: string
  client_id?: string
  access_token?: string
} & AccessTokenOrClientId

type RecommendationsInput = {
  uuid: string
  limit?: number
  offset?: number
  countryCode?: string
  client_id?: string
  access_token?: string
} & AccessTokenOrClientId

const playlist = {
  /**
   * Get info about a playlist.
   * You need to either provide a client_id or an access_token.
   * Optionally you can set a countryCode, defaults to US.
   */
  get: async ({ uuid, countryCode = "US", client_id, access_token }: GetInput) => {
    let headers: Headers = { "x-tidal-token": client_id }
    if (!client_id) headers = { authorization: `Bearer ${access_token}` }

    if (!client_id && !access_token)
      throw new Error("You need to either provide a client_id or an access_token.")

    const data = await got({
      prefixUrl,
      method: "get",
      url: `${uuid}`,
      searchParams: {
        countryCode,
      },
      headers,
    }).json()

    return data as PlaylistInfo
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
  }: ItemsInput) => {
    let headers: Headers = { "x-tidal-token": client_id }
    if (!client_id) headers = { authorization: `Bearer ${access_token}` }

    if (!client_id && !access_token)
      throw new Error("You need to either provide a client_id or an access_token.")

    const data = await got({
      prefixUrl,
      method: "get",
      url: `${uuid}/items`,
      searchParams: {
        countryCode,
        limit,
        offset,
      },
      headers,
    }).json()

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
  }: RecommendationsInput) => {
    let headers: Headers = { "x-tidal-token": client_id }
    if (!client_id) headers = { authorization: `Bearer ${access_token}` }

    if (!client_id && !access_token)
      throw new Error("You need to either provide a client_id or an access_token.")

    const data = await got({
      prefixUrl,
      method: "get",
      url: `${uuid}/recommendations/items`,
      searchParams: {
        countryCode,
        limit,
        offset,
      },
      headers,
    }).json()

    return data as PlaylistContent
  },
}

export default playlist

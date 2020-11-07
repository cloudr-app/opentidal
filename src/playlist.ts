import axios from "axios"
import { PlaylistInfo, PlaylistContent } from "./types"

const baseURL = "https://api.tidal.com/v1/playlists"
// TODO add all the endpoints that modify stuff

type GetInput = {
  uuid: string
  countryCode?: string
  client_id?: string
  access_token?: string
} & ({ client_id: string } | { access_token: string })

type ItemsInput = {
  uuid: string
  limit?: number
  offset?: number
  countryCode?: string
  client_id?: string
  access_token?: string
} & ({ client_id: string } | { access_token: string })

type RecommendationsInput = {
  uuid: string
  limit?: number
  offset?: number
  countryCode?: string
  client_id?: string
  access_token?: string
} & ({ client_id: string } | { access_token: string })

const playlist = {
  /**
   * Get info about a playlist.
   * You need to either provide a client_id or an access_token.
   * Optionally you can set a countryCode, defaults to US.
   */
  get: async ({
    uuid,
    countryCode = "US",
    client_id,
    access_token,
  }: GetInput): Promise<PlaylistInfo> => {
    let headers: object = { "x-tidal-token": client_id }
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
    })

    return data
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
  }: ItemsInput): Promise<PlaylistContent> => {
    let headers: object = { "x-tidal-token": client_id }
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
    })

    return data
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
  }: RecommendationsInput): Promise<PlaylistContent> => {
    let headers: object = { "x-tidal-token": client_id }
    if (!client_id) headers = { authorization: `Bearer ${access_token}` }

    if (!client_id && !access_token)
      throw new Error("You need to either provide a client_id or an access_token.")

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
    })

    return data
  },
}

export default playlist

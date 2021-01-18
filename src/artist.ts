import { Track, Album, AccessTokenOrClientId, Artist } from "./types"

import axios from "axios"

const baseURL = "https://api.tidal.com/v1/artists"
// TODO add videos and mix
export type GetArgs = {
  id: number
  countryCode?: string
  client_id?: string
  access_token?: string
} & AccessTokenOrClientId

export type BioArgs = {
  id: number
  countryCode?: string
  client_id?: string
  access_token?: string
} & AccessTokenOrClientId

export type Bio = {
  source: string
  lastUpdated: string
  text: string
  summary: string
}

export type LinksArgs = {
  id: number
  countryCode?: string
  client_id?: string
  access_token?: string
} & AccessTokenOrClientId

export type Links = {
  limit: number
  offset: number
  totalNumberOfItems: number
  items: Array<{
    url: string
    siteName: string
  }>
  source: string
}

export type TopTracksArgs = {
  id: number
  limit?: number
  offset?: number
  countryCode?: string
  client_id?: string
  access_token?: string
} & AccessTokenOrClientId

export type TopTracks = {
  limit: number
  offset: number
  totalNumberOfItems: number
  items: Array<Track>
}

export type AlbumsArgs = {
  id: number
  limit?: number
  offset?: number
  countryCode?: string
  client_id?: string
  access_token?: string
} & AccessTokenOrClientId

export type AlbumsOutput = {
  limit: number
  offset: number
  totalNumberOfItems: number
  items: Array<Album>
}

export default {
  /**
   * Get info about an artist.
   * You need to either provide a client_id or an access_token.
   * Optionally you can set a countryCode, defaults to US.
   */
  get: async ({ id, countryCode = "US", client_id, access_token }: GetArgs) => {
    let headers: any = { "x-tidal-token": client_id }
    if (!client_id) headers = { authorization: `Bearer ${access_token}` }

    if (!client_id && !access_token)
      throw new Error("You need to either provide a client_id or an access_token.")

    const { data } = await axios({
      baseURL,
      url: `${id}`,
      params: {
        countryCode,
      },
      headers,
      responseType: "json",
    })

    return data as Artist
  },
  /**
   * Get an artist's bio.
   * You need to either provide a client_id or an access_token.
   * Optionally you can set a countryCode, defaults to US.
   */
  bio: async ({ id, countryCode = "US", client_id, access_token }: BioArgs) => {
    let headers: any = { "x-tidal-token": client_id }
    if (!client_id) headers = { authorization: `Bearer ${access_token}` }

    if (!client_id && !access_token)
      throw new Error("You need to either provide a client_id or an access_token.")

    const { data } = await axios({
      baseURL,
      url: `${id}/bio`,
      params: {
        countryCode,
      },
      headers,
      responseType: "json",
    })

    return data as Bio
  },
  /**
   * Get an artist's links.
   * Sometimes there aren't any links, in which case the TIDAL api responds with a 404.
   * This will throw an error, which you need to handle yourself.
   * You need to either provide a client_id or an access_token.
   * Optionally you can set a countryCode, defaults to US.
   */
  links: async ({ id, countryCode = "US", client_id, access_token }: LinksArgs) => {
    let headers: any = { "x-tidal-token": client_id }
    if (!client_id) headers = { authorization: `Bearer ${access_token}` }

    if (!client_id && !access_token)
      throw new Error("You need to either provide a client_id or an access_token.")

    const { data } = await axios({
      baseURL,
      url: `${id}/links`,
      params: {
        countryCode,
      },
      headers,
      responseType: "json",
    })

    return data as Links
  },
  /**
   * Get an artist's top tracks.
   * You need to either provide a client_id or an access_token.
   * Limit and Offset are optional and default to 50 and 0, respectively.
   * Optionally you can set a countryCode, defaults to US.
   */
  topTracks: async ({
    id,
    countryCode = "US",
    limit = 50,
    offset = 0,
    client_id,
    access_token,
  }: TopTracksArgs) => {
    let headers: any = { "x-tidal-token": client_id }
    if (!client_id) headers = { authorization: `Bearer ${access_token}` }

    if (!client_id && !access_token)
      throw new Error("You need to either provide a client_id or an access_token.")

    const { data } = await axios({
      baseURL,
      url: `${id}/toptracks`,
      params: {
        countryCode,
        limit,
        offset,
      },
      headers,
      responseType: "json",
    })

    return data as TopTracks
  },
  /**
   * Get an artist's albums.
   * You need to either provide a client_id or an access_token.
   * Limit and Offset are optional and default to 50 and 0, respectively.
   * Optionally you can set a countryCode, defaults to US.
   */
  albums: async ({
    id,
    countryCode = "US",
    limit = 50,
    offset = 0,
    client_id,
    access_token,
  }: AlbumsArgs) => {
    let headers: any = { "x-tidal-token": client_id }
    if (!client_id) headers = { authorization: `Bearer ${access_token}` }

    if (!client_id && !access_token)
      throw new Error("You need to either provide a client_id or an access_token.")

    const { data } = await axios({
      baseURL,
      url: `${id}/albums`,
      params: {
        countryCode,
        limit,
        offset,
      },
      headers,
      responseType: "json",
    })

    return data as AlbumsOutput
  },
}

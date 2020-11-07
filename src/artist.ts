import axios from "axios"
import { Track, Album } from "./types"

const baseURL = "https://api.tidal.com/v1/artists"
// TODO add videos and mix

type GetInput = {
  id: number
  countryCode?: string
  client_id?: string
  access_token?: string
} & ({ client_id: string } | { access_token: string })

type GetOutput = {
  id: number
  name: string
  artistTypes: Array<string>
  url: string
  picture: string
  popularity: number
  artistRoles: Array<{
    categoryId: number
    category: string
  }>
  mixes: {
    MASTER_ARTIST_MIX: string
    ARTIST_MIX: string
  }
}

type BioInput = {
  id: number
  countryCode?: string
  client_id?: string
  access_token?: string
} & ({ client_id: string } | { access_token: string })

type BioOutput = {
  source: string
  lastUpdated: string
  text: string
  summary: string
}

type LinksInput = {
  id: number
  countryCode?: string
  client_id?: string
  access_token?: string
} & ({ client_id: string } | { access_token: string })

type LinksOutput = {
  limit: number
  offset: number
  totalNumberOfItems: number
  items: Array<{
    url: string
    siteName: string
  }>
  source: string
}

type TopTracksInput = {
  id: number
  limit?: number
  offset?: number
  countryCode?: string
  client_id?: string
  access_token?: string
} & ({ client_id: string } | { access_token: string })

type TopTracksOutput = {
  limit: number
  offset: number
  totalNumberOfItems: number
  items: Array<Track>
}

type AlbumsInput = {
  id: number
  limit?: number
  offset?: number
  countryCode?: string
  client_id?: string
  access_token?: string
} & ({ client_id: string } | { access_token: string })

type AlbumsOutput = {
  limit: number
  offset: number
  totalNumberOfItems: number
  items: Array<Album>
}

const artist = {
  /**
   * Get info about an artist.
   * You need to either provide a client_id or an access_token.
   * Optionally you can set a countryCode, defaults to US.
   */
  get: async ({
    id,
    countryCode = "US",
    client_id,
    access_token,
  }: GetInput): Promise<GetOutput> => {
    let headers: object = { "x-tidal-token": client_id }
    if (!client_id) headers = { authorization: `Bearer ${access_token}` }

    if (!client_id && !access_token)
      throw new Error("You need to either provide a client_id or an access_token.")

    const { data } = await axios({
      baseURL,
      method: "get",
      url: `${id}`,
      params: {
        countryCode,
      },
      headers,
    })

    return data
  },
  /**
   * Get an artist's bio.
   * You need to either provide a client_id or an access_token.
   * Optionally you can set a countryCode, defaults to US.
   */
  bio: async ({
    id,
    countryCode = "US",
    client_id,
    access_token,
  }: BioInput): Promise<BioOutput> => {
    let headers: object = { "x-tidal-token": client_id }
    if (!client_id) headers = { authorization: `Bearer ${access_token}` }

    if (!client_id && !access_token)
      throw new Error("You need to either provide a client_id or an access_token.")

    const { data } = await axios({
      baseURL,
      method: "get",
      url: `${id}/bio`,
      params: {
        countryCode,
      },
      headers,
    })

    return data
  },
  /**
   * Get an artist's links.
   * Sometimes there aren't any links, in which case the TIDAL api responds with a 404.
   * This will cause axios to throw an error, which you need to handle yourself.
   * You need to either provide a client_id or an access_token.
   * Optionally you can set a countryCode, defaults to US.
   */
  links: async ({
    id,
    countryCode = "US",
    client_id,
    access_token,
  }: LinksInput): Promise<LinksOutput> => {
    let headers: object = { "x-tidal-token": client_id }
    if (!client_id) headers = { authorization: `Bearer ${access_token}` }

    if (!client_id && !access_token)
      throw new Error("You need to either provide a client_id or an access_token.")

    const { data } = await axios({
      baseURL,
      method: "get",
      url: `${id}/links`,
      params: {
        countryCode,
      },
      headers,
    })

    return data
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
  }: TopTracksInput): Promise<TopTracksOutput> => {
    let headers: object = { "x-tidal-token": client_id }
    if (!client_id) headers = { authorization: `Bearer ${access_token}` }

    if (!client_id && !access_token)
      throw new Error("You need to either provide a client_id or an access_token.")

    const { data } = await axios({
      baseURL,
      method: "get",
      url: `${id}/toptracks`,
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
  }: AlbumsInput): Promise<AlbumsOutput> => {
    let headers: object = { "x-tidal-token": client_id }
    if (!client_id) headers = { authorization: `Bearer ${access_token}` }

    if (!client_id && !access_token)
      throw new Error("You need to either provide a client_id or an access_token.")

    const { data } = await axios({
      baseURL,
      method: "get",
      url: `${id}/albums`,
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

export default artist

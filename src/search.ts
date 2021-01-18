import { AccessTokenOrClientId, Album, Playlist, TidalList, Track, Video, Artist } from "./types"

import { AxiosInstance } from "axios"

const baseURL = "https://api.tidal.com/v1/search"

export type SearchArgs = {
  query: string
  limit?: number
  countryCode?: string
  client_id?: string
  access_token?: string
} & AccessTokenOrClientId

export interface ArtistSearch extends TidalList {
  items: Artist[]
}

export interface AlbumSearch extends TidalList {
  items: Album[]
}

export interface PlaylistSearch extends TidalList {
  items: Playlist[]
}

export interface TrackSearch extends TidalList {
  items: Track[]
}

export interface VideoSearch extends TidalList {
  items: Video[]
}

export interface AllSearch {
  artists: ArtistSearch
  albums: AlbumSearch
  playlists: PlaylistSearch
  tracks: TrackSearch
  videos: VideoSearch
  topHit: Artist | Album | Playlist | Track | Video
}

const searchFactory = (url: string, axios: AxiosInstance) => async ({
  query,
  limit = 50,
  countryCode = "US",
  client_id,
  access_token,
}: SearchArgs) => {
  let headers: any = { "x-tidal-token": client_id }
  if (!client_id) headers = { authorization: `Bearer ${access_token}` }

  if (!client_id && !access_token)
    throw new Error("You need to either provide a client_id or an access_token.")

  const { data } = await axios({
    baseURL,
    headers,
    url,
    params: {
      countryCode,
      query,
      limit,
    },
    responseType: "json",
  })

  return data as any
}

export interface Search {
  all(opt: SearchArgs): Promise<AllSearch>
  artists(opt: SearchArgs): Promise<ArtistSearch>
  albums(opt: SearchArgs): Promise<AlbumSearch>
  tracks(opt: SearchArgs): Promise<TrackSearch>
  videos(opt: SearchArgs): Promise<VideoSearch>
  playlists(opt: SearchArgs): Promise<PlaylistSearch>
}

export default (axios: AxiosInstance) =>({
  all: searchFactory("", axios),
  artists: searchFactory("artists", axios),
  albums: searchFactory("albums", axios),
  tracks: searchFactory("tracks", axios),
  videos: searchFactory("videos", axios),
  playlists: searchFactory("playlists", axios),
}) as Search

import { AccessTokenOrClientId, Album, Playlist, TidalList, Track, Video } from "./types"

import got, { Headers } from "got"
import { Artist } from "./artist"

const prefixUrl = "https://api.tidal.com/v1/search"

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

const searchFactory = (url: string) => async ({
  query,
  limit = 50,
  countryCode = "US",
  client_id,
  access_token,
}: SearchArgs) => {
  let headers: Headers = { "x-tidal-token": client_id }
  if (!client_id) headers = { authorization: `Bearer ${access_token}` }

  if (!client_id && !access_token)
    throw new Error("You need to either provide a client_id or an access_token.")

  const data = await got({
    prefixUrl,
    headers,
    url,
    searchParams: {
      countryCode,
      query,
      limit,
    },
  }).json()

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

export default {
  all: searchFactory(""),
  artists: searchFactory("artists"),
  albums: searchFactory("albums"),
  tracks: searchFactory("tracks"),
  videos: searchFactory("videos"),
  playlists: searchFactory("playlists"),
} as Search

export interface Creator {
  id: number
  name: string
  type: string
}

export interface Artist {
  artistRoles?: ArtistRolesEntity[]
  artistTypes?: string[]
  id: number
  mixes: {
    [key: string]: string
  }
  name: string
  picture: string
  popularity: number
  url: string
}

export interface ArtistRolesEntity {
  category: string
  categoryId: number
}

export interface Track {
  album: {
    id: number
    title: string
    cover: string
    videoCover: any
  }
  allowStreaming: boolean
  artist: Creator
  artists: Creator[]
  audioModes: string[]
  audioQuality: string
  copyright: string
  duration: number
  editable: boolean
  explicit: boolean
  id: number
  isrc: string
  mixes: {
    TRACK_MIX: string
  }
  peak: number
  popularity: number
  premiumStreamingOnly: boolean
  replayGain: number
  streamReady: boolean
  streamStartDate: string
  title: string
  trackNumber: number
  url: string
  version: null
  volumeNumber: number
}

export interface Album {
  allowStreaming: boolean
  artist: Creator
  artists: Creator[]
  audioModes: string[]
  audioQuality: string
  copyright: string
  cover: string
  duration: number
  explicit: boolean
  id: number
  numberOfTracks: number
  numberOfVideos: number
  numberOfVolumes: number
  popularity: number
  premiumStreamingOnly: boolean
  releaseDate: string
  streamReady: boolean
  streamStartDate: string
  title: string
  type: "ALBUM"
  upc: string
  url: string
  version: null
  videoCover: null
}

export interface Playlist {
  created: string
  creator: Creator
  description: string
  duration: number
  image: string
  lastItemAddedAt: string
  lastUpdated: string
  numberOfTracks: number
  numberOfVideos: number
  popularity: number
  promotedArtists: Creator[]
  publicPlaylist: boolean
  squareImage: string
  title: string
  type: string
  url: string
  uuid: string
}

export interface Video {
  adsPrePaywallOnly: boolean
  adsUrl?: null
  album?: null
  allowStreaming: boolean
  artist: Creator
  artists?: Creator[]
  duration: number
  explicit: boolean
  id: number
  imageId: string
  imagePath?: null
  popularity: number
  quality: string
  releaseDate: string
  streamReady: boolean
  streamStartDate: string
  title: string
  trackNumber: number
  type: string
  volumeNumber: number
}

export interface TidalList {
  limit: number
  offset: number
  totalNumberOfItems: number
  items: Array<{
    [key: string]: any
  }>
}

export interface PlaylistContent extends TidalList {
  limit: number
  offset: number
  totalNumberOfItems: number
  items: Array<{
    type: string
    cut: any
    item: Track
  }>
}

export type AccessTokenOrClientId = { client_id: string } | { access_token: string }

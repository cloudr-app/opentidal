type Creator = {
  id: number
  name: string
  type: string
}

type Track = {
  allowStreaming: boolean
  artist: Creator
  artists: Array<Creator>
  audioModes: Array<string>
  audioQuality: string
  copyright: string
  duration: number
  editable: boolean
  explicit: boolean
  id: number
  isrc: string
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
  album: {
    id: number
    title: string
    cover: string
    videoCover: any
  }
  mixes: {
    TRACK_MIX: string
  }
}

type Album = {
  allowStreaming: boolean
  artist: Creator
  artists: Array<Creator>
  audioModes: Array<string>
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

type PlaylistInfo = {
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
  promotedArtists: Array<Creator>
  publicPlaylist: boolean
  squareImage: string
  title: string
  type: string
  url: string
  uuid: string
}

type PlaylistContent = {
  limit: number
  offset: number
  totalNumberOfItems: number
  items: Array<{
    type: string
    cut: any
    item: Track
  }>
}

export { Track, Album, PlaylistInfo, PlaylistContent }

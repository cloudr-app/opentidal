type TrackArtist = {
  id: number
  name: string
  type: string
}

type Track = {
  allowStreaming: boolean
  artist: TrackArtist
  artists: Array<TrackArtist>
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
  artist: TrackArtist
  artists: Array<TrackArtist>
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

export { Track, Album }

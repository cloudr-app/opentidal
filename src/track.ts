import axios from "axios"

const baseURL = "https://api.tidal.com/v1/tracks"
const atob = (str) => Buffer.from(str, "base64").toString("binary")

type GetInput = {
  id: number
  countryCode?: string
  client_id?: string
  access_token?: string
} & ({ client_id: string } | { access_token: string })

type GetOutput = {
  id: number
  title: string
  duration: number
  replayGain: number
  peak: number
  allowStreaming: boolean
  streamReady: boolean
  streamStartDate: string
  premiumStreamingOnly: boolean
  trackNumber: number
  volumeNumber: number
  version: null
  popularity: number
  copyright: string
  url: string
  isrc: string
  editable: boolean
  explicit: boolean
  audioQuality: string
  audioModes: Array<string>
  artist: object
  artists: Array<object>
  album: object
  mixes: object
}

type GetStreamInput = {
  id: number
  access_token: string
  audioquality?: "LOW" | "HIGH" | "LOSSLESS"
  playbackmode?: "STREAM" | "OFFLINE"
  assetpresentation?: "FULL" | "PREVIEW"
  countryCode?: string
}

type playbackInfoPostPaywallResponse = {
  trackId: number
  assetPresentation: string
  audioMode: string
  audioQuality: string
  manifestMimeType: string
  manifest: string
}

type GetStreamOutput = {
  mimeType: string
  codecs: string
  encryptionType: string
  urls: Array<string>
}

const track = {
  /**
   * Get track info using its ID.
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
   * Recommended way to get a streaming URL.
   * Provide the track ID and valid access_token
   */
  getStream: async ({
    id,
    access_token,
    audioquality = "HIGH",
    playbackmode = "STREAM",
    assetpresentation = "FULL",
    countryCode = "US",
  }: GetStreamInput): Promise<GetStreamOutput> => {
    const { data }: { data: playbackInfoPostPaywallResponse } = await axios({
      baseURL,
      url: `${id}/playbackinfopostpaywall`,
      headers: { authorization: `Bearer ${access_token}` },
      params: {
        audioquality,
        playbackmode,
        assetpresentation,
        countryCode,
      },
    })

    if (data.manifestMimeType === "application/dash+xml")
      throw new Error("application/dash+xml is not supported")

    return JSON.parse(atob(data.manifest))
  },
}

export default track

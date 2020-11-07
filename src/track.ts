import axios from "axios"
import { Track } from "./types"

const baseURL = "https://api.tidal.com/v1/tracks"
const atob = (str) => Buffer.from(str, "base64").toString("binary")
// TODO add mix

type GetInput = {
  id: number
  countryCode?: string
  client_id?: string
  access_token?: string
} & ({ client_id: string } | { access_token: string })

type StreamInput = {
  id: number
  access_token: string
  audioquality?: "LOW" | "HIGH" | "LOSSLESS"
  playbackmode?: "STREAM" | "OFFLINE"
  assetpresentation?: "FULL" | "PREVIEW"
  countryCode?: string
}

type PlaybackInfoPostPaywallResponse = {
  trackId: number
  assetPresentation: string
  audioMode: string
  audioQuality: string
  manifestMimeType: string
  manifest: string
}

type StreamOutput = {
  mimeType: string
  codecs: string
  encryptionType: string
  urls: Array<string>
}

type ContributorsOutput = {
  limit: number
  offset: number
  totalNumberOfItems: number
  items: Array<{
    name: string
    role: string
  }>
}

type ContributorsInput = {
  id: number
  limit?: number
  offset?: number
  countryCode?: string
  client_id?: string
  access_token?: string
} & ({ client_id: string } | { access_token: string })

const track = {
  /**
   * Get track info using its ID.
   * You need to either provide a client_id or an access_token.
   * Optionally you can set a countryCode, defaults to US.
   */
  get: async ({ id, countryCode = "US", client_id, access_token }: GetInput): Promise<Track> => {
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
  stream: async ({
    id,
    access_token,
    audioquality = "HIGH",
    playbackmode = "STREAM",
    assetpresentation = "FULL",
    countryCode = "US",
  }: StreamInput): Promise<StreamOutput> => {
    const { data }: { data: PlaybackInfoPostPaywallResponse } = await axios({
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
  /**
   * Get a track's contributors.
   * You need to either provide a client_id or an access_token.
   * Limit and Offset are optional and default to 50 and 0, respectively.
   * Optionally you can set a countryCode, defaults to US.
   */
  contributors: async ({
    id,
    countryCode = "US",
    limit = 50,
    offset = 0,
    client_id,
    access_token,
  }: ContributorsInput): Promise<ContributorsOutput> => {
    let headers: object = { "x-tidal-token": client_id }
    if (!client_id) headers = { authorization: `Bearer ${access_token}` }

    if (!client_id && !access_token)
      throw new Error("You need to either provide a client_id or an access_token.")

    const { data } = await axios({
      baseURL,
      method: "get",
      url: `${id}/contributors`,
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

export default track

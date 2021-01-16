import got, { Headers } from "got"
import { AccessTokenOrClientId, Track } from "./types"

const prefixUrl = "https://api.tidal.com/v1/tracks"
const atob = (str: string) => Buffer.from(str, "base64").toString("binary")
// TODO add mix

type GetInput = {
  id: number
  countryCode?: string
  client_id?: string
  access_token?: string
} & AccessTokenOrClientId

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
} & AccessTokenOrClientId

const track = {
  /**
   * Get track info using its ID.
   * You need to either provide a client_id or an access_token.
   * Optionally you can set a countryCode, defaults to US.
   */
  get: async ({ id, countryCode = "US", client_id, access_token }: GetInput) => {
    let headers: Headers = { "x-tidal-token": client_id }
    if (!client_id) headers = { authorization: `Bearer ${access_token}` }

    if (!client_id && !access_token)
      throw new Error("You need to either provide a client_id or an access_token.")

    const data = await got({
      prefixUrl,
      headers,
      url: `${id}`,
      searchParams: {
        countryCode,
      },
    }).json()

    return data as Track
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
  }: StreamInput) => {
    const data = (await got({
      prefixUrl,
      url: `${id}/playbackinfopostpaywall`,
      headers: { authorization: `Bearer ${access_token}` },
      searchParams: {
        audioquality,
        playbackmode,
        assetpresentation,
        countryCode,
      },
    }).json()) as PlaybackInfoPostPaywallResponse

    if (data.manifestMimeType === "application/dash+xml")
      throw new Error("application/dash+xml is not supported")

    return JSON.parse(atob(data.manifest)) as StreamOutput
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
  }: ContributorsInput) => {
    let headers: Headers = { "x-tidal-token": client_id }
    if (!client_id) headers = { authorization: `Bearer ${access_token}` }

    if (!client_id && !access_token)
      throw new Error("You need to either provide a client_id or an access_token.")

    const data = await got({
      prefixUrl,
      method: "get",
      url: `${id}/contributors`,
      searchParams: {
        countryCode,
        limit,
        offset,
      },
      headers,
    }).json()

    return data as ContributorsOutput
  },
}

export default track

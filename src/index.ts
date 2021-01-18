import _auth from "./auth"
import _track from "./track"
import _artist from "./artist"
import _playlist from "./playlist"
import _search from "./search"

import axios from "axios"

const auth = _auth(axios)
const track = _track(axios)
const artist = _artist(axios)
const playlist = _playlist(axios)
const search = _search(axios)

const openTIDAL = { auth, track, artist, playlist, search }

export default openTIDAL
export { auth, track, artist, playlist, search }

export { _auth, _track, _artist, _playlist, _search }

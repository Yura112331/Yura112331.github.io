export interface SpotifyImage {
  url: string
  height: number
  width: number
}

export interface SpotifyAlbum {
  id: string
  name: string
  album_type: 'album' | 'single' | 'compilation'
  release_date: string
  release_date_precision: string
  total_tracks: number
  images: SpotifyImage[]
  external_urls: { spotify: string }
  uri: string
}

export interface SpotifyArtist {
  id: string
  name: string
  images: SpotifyImage[]
  followers: { total: number }
  popularity: number
  genres: string[]
  external_urls: { spotify: string }
}
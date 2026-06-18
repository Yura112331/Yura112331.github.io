import { useQuery } from '@tanstack/vue-query'
import axios from 'axios'
import type { SpotifyAlbum, SpotifyArtist } from '@/types/spotify'

const API = import.meta.env.VITE_API_URL || 'http://localhost:3001'

interface SpotifyData {
  albums: SpotifyAlbum[]
  artist: SpotifyArtist
}

export function useSpotify() {
  return useQuery<SpotifyData>({
    queryKey: ['spotify'],
    queryFn: async () => {
      const { data } = await axios.get<SpotifyData>(`${API}/api/spotify`)
      return data
    },
    staleTime: 1000 * 60 * 60, // 1 hour
    gcTime: 1000 * 60 * 60 * 2
  })
}
import type { NextApiRequest, NextApiResponse } from 'next'
import { getTopTracks } from '../../lib/spotify'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const response = await getTopTracks()
    const { items } = await response.json()

    const tracks = items.slice(0, 10).map((track: any) => ({
      artist: track.artists.map((_artist: any) => _artist.name).join(', '),
      songUrl: track.external_urls.spotify,
      title: track.name,
    }))

    res.setHeader('Cache-Control', 'public, s-maxage=86400, stale-while-revalidate=43200')

    res.status(200).json(tracks)
  } catch (error) {
    res.status(400).json({ ok: false })
  }
}

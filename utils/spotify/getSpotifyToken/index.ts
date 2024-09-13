// @ts-ignore
const clientId: string = process.env.EXPO_PUBLIC_SPOTIFY_CLIENT_ID || "CLIENT_ID"
// @ts-ignore
const clientSecret: string = process.env.EXPO_PUBLIC_SPOTIFY_CLIENT_SECRET || "CLIENT_SECRET"

export async function getSpotifyAccessToken() {
	const url = "https://accounts.spotify.com/api/token"

	try {
		const basicAuth = btoa(`${clientId}:${clientSecret}`)

		const authOptions = {
			method: "POST",
			headers: {
				Authorization: `Basic ${basicAuth}`,
				"Content-Type": "application/x-www-form-urlencoded",
			},
			body: new URLSearchParams({
				grant_type: "client_credentials",
			}).toString(),
		}

		const response = await fetch(url, authOptions)
		if (!response.ok) {
			throw new Error(`HTTP Error! Status: ${response.status}`)
		}

		const data = await response.json()

		if (data.access_token) {
			return data.access_token
		}
	} catch (error) {
		console.error("Error retrieving access token:", error)
	}
}

export async function searchSpotify({ accessToken, query }: { accessToken: string, query: string }) {
	
	const encodedQuery = encodeURIComponent(query) 
	const url = `https://api.spotify.com/v1/search?q=${encodedQuery}&type=track&limit=10`

	try {
		const response = await fetch(url, {
			method: "GET",
			headers: {
				Authorization: `Bearer ${accessToken}`,
			},
		})

		if (!response.ok) {
			throw new Error(`HTTP error! Status: ${response.status}`)
		}

		const data: SpotifyApiResponse = await response.json()
		console.log('searchSpotify :> ', JSON.stringify(data, null, 2))
	} catch (error) {
		console.error("Error with Spotify query:", error)
	}
}

type SpotifyApiResponse = {
	tracks?: {
		href: string
		limit: number
		next: string
		offset: number
		previous: string
		total: number
		items: Array<{
			album: {
				album_type: string
				total_tracks: number
				available_markets: string[]
				external_urls: { spotify: string }
				href: string
				id: string
				images: Array<{ url: string; height: number; width: number }>
				name: string
				release_date: string
				release_date_precision: string
				restrictions?: { reason: string }
				type: string
				uri: string
				artists: Array<{
					external_urls: { spotify: string }
					href: string
					id: string
					name: string
					type: string
					uri: string
				}>
			}
			artists: Array<{
				external_urls: { spotify: string }
				href: string
				id: string
				name: string
				type: string
				uri: string
			}>
			available_markets: string[]
			disc_number: number
			duration_ms: number
			explicit: boolean
			external_ids: { isrc: string; ean?: string; upc?: string }
			external_urls: { spotify: string }
			href: string
			id: string
			is_playable: boolean
			linked_from?: {}
			restrictions?: { reason: string }
			name: string
			popularity: number
			preview_url: string
			track_number: number
			type: string
			uri: string
			is_local: boolean
		}>
	}
	artists?: {
		href: string
		limit: number
		next: string
		offset: number
		previous: string
		total: number
		items: Array<{
			external_urls: { spotify: string }
			followers: { href?: string; total: number }
			genres: string[]
			href: string
			id: string
			images: Array<{ url: string; height: number; width: number }>
			name: string
			popularity: number
			type: string
			uri: string
		}>
	}
	albums?: {
		href: string
		limit: number
		next: string
		offset: number
		previous: string
		total: number
		items: Array<{
			album_type: string
			total_tracks: number
			available_markets: string[]
			external_urls: { spotify: string }
			href: string
			id: string
			images: Array<{ url: string; height: number; width: number }>
			name: string
			release_date: string
			release_date_precision: string
			restrictions?: { reason: string }
			type: string
			uri: string
			artists: Array<{
				external_urls: { spotify: string }
				href: string
				id: string
				name: string
				type: string
				uri: string
			}>
		}>
	}
	playlists?: {
		href: string
		limit: number
		next: string
		offset: number
		previous: string
		total: number
		items: Array<{
			collaborative: boolean
			description: string
			external_urls: { spotify: string }
			href: string
			id: string
			images: Array<{ url: string; height: number; width: number }>
			name: string
			owner: {
				external_urls: { spotify: string }
				followers: { href?: string; total: number }
				href: string
				id: string
				type: string
				uri: string
				display_name: string
			}
			public: boolean
			snapshot_id: string
			tracks: { href: string; total: number }
			type: string
			uri: string
		}>
	}
	shows?: {
		href: string
		limit: number
		next: string
		offset: number
		previous: string
		total: number
		items: Array<{
			available_markets: string[]
			copyrights: Array<{ text: string; type: string }>
			description: string
			html_description: string
			explicit: boolean
			external_urls: { spotify: string }
			href: string
			id: string
			images: Array<{ url: string; height: number; width: number }>
			is_externally_hosted: boolean
			languages: string[]
			media_type: string
			name: string
			publisher: string
			type: string
			uri: string
			total_episodes: number
		}>
	}
	episodes?: {
		href: string
		limit: number
		next: string
		offset: number
		previous: string
		total: number
		items: Array<{
			audio_preview_url: string
			description: string
			html_description: string
			duration_ms: number
			explicit: boolean
			external_urls: { spotify: string }
			href: string
			id: string
			images: Array<{ url: string; height: number; width: number }>
			is_externally_hosted: boolean
			is_playable: boolean
			language: string
			languages: string[]
			name: string
			release_date: string
			release_date_precision: string
			resume_point?: { fully_played: boolean; resume_position_ms: number }
			type: string
			uri: string
			restrictions?: { reason: string }
		}>
	}
	audiobooks?: {
		href: string
		limit: number
		next: string
		offset: number
		previous: string
		total: number
		items: Array<{
			authors: Array<{ name: string }>
			available_markets: string[]
			copyrights: Array<{ text: string; type: string }>
			description: string
			html_description: string
			edition: string
			explicit: boolean
			external_urls: { spotify: string }
			href: string
			id: string
			images: Array<{ url: string; height: number; width: number }>
			languages: string[]
			media_type: string
			name: string
			narrators: Array<{ name: string }>
			publisher: string
			type: string
			uri: string
			total_chapters: number
		}>
	}
}

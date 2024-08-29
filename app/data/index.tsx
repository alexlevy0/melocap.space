import { Platform } from "react-native"

export const users = [
	{
		user: "melody_master",
		name: "Melody Master",
		image: `https://thispersondoesnotexist.com?${Math.random()}`,
		bio: "Music enthusiast and top predictor. I live and breathe the charts!",
		url: "https://melodymaster.com",
		followers: 15300,
	},
	{
		user: "chart_champion",
		name: "Chart Champion",
		image: `https://thispersondoesnotexist.com?${Math.random()}`,
		bio: "Industry insider with a knack for spotting the next big hit.",
		url: "http://chartchampion.com/",
		followers: 12452,
	},
	{
		user: "beat_predictor",
		name: "Beat Predictor",
		image: `https://thispersondoesnotexist.com?${Math.random()}`,
		bio: "Data analyst by day, music trend forecaster by night. Let the numbers guide you!",
		url: "https://beatpredictor.com/",
		followers: 18759,
	},
	{
		user: "rhythm_guru",
		name: "Rhythm Guru",
		image: `https://thispersondoesnotexist.com?${Math.random()}`,
		bio: "DJ and music producer. I know what makes a track climb the charts.",
		url: "https://www.rhythmguru.com/",
		followers: 9500,
	},
	{
		user: "hitmaker",
		name: "HitMaker",
		image: `https://thispersondoesnotexist.com?${Math.random()}`,
		bio: "The official account of HitMaker, the #1 music betting game. Predict, bet, win!",
		url: "https://hitmaker.com",
		followers: 50604,
	},
].map((value) => {
	if (Platform.OS !== "web") {
		return {
			...value,
			image: window.location + value.image,
		}
	}
	return value
})

export type Post = {
	user: {
		user: string
		name: string
		image: string
		followers: number
		url: string
		bio: string
	}
	post: string
	id: string
}

export const posts = ([
	{
		user: "melody_master",
		post: "Just placed my bet on 'Neon Dreams' to hit top 10 next week. Who's with me?",
	},
	{
		user: "chart_champion",
		post: "Insider tip: Keep an eye on 'Electric Pulse' by The Voltage. It's gaining traction fast!",
	},
	{
		user: "beat_predictor",
		post: "Data shows 'Whisper in the Wind' has a 78% chance of reaching #1 in the next 3 weeks.",
	},
	{
		user: "rhythm_guru",
		post: "Just heard the new single by Luna Eclipse. It's a guaranteed chart-topper!",
	},
	{
		user: "hitmaker",
		post: "New feature alert: Now you can create private betting pools with your friends!",
	},
	{
		user: "melody_master",
		post: "Lost my last bet, but I'm sure about this one. 'Midnight Serenade' is going platinum!",
	},
	{
		user: "chart_champion",
		post: "Any thoughts on 'Retro Wave' by Synth Sisters? I'm on the fence about betting.",
	},
	{
		user: "beat_predictor",
		post: "Streaming numbers for 'Heartbeat Highway' are off the charts. Time to place your bets!",
	},
	{
		user: "rhythm_guru",
		post: "The remix of 'Stellar Groove' is fire! It'll outperform the original for sure.",
	},
	{
		user: "hitmaker",
		post: "This week's jackpot is up to $10,000! Don't forget to place your bets before Friday.",
	},
	{
		user: "melody_master",
		post: "Here's my top 5 picks for next month's breakout hits. What do you think?",
	},
	{
		user: "chart_champion",
		post: "Looking for betting partners for the upcoming award season predictions. DM me!",
	},
	{
		user: "beat_predictor",
		post: "New article: 'Using Social Media Trends to Predict Chart Performance' - check it out!",
	},
	{
		user: "rhythm_guru",
		post: "Just got back from a music festival. Lots of potential hits I'll be betting on soon!",
	},
	{
		user: "hitmaker",
		post: "Introducing genre-specific betting pools! Start with Pop, Rock, Hip-Hop, or EDM.",
	},
	{
		user: "melody_master",
		post: "My thoughts on how streaming platforms are changing the betting game.",
	},
	{
		user: "chart_champion",
		post: "Vinyl sales vs streaming numbers: which is a better predictor for betting?",
	},
	{
		user: "beat_predictor",
		post: "Want to improve your betting strategy? Join my webinar on music trend analysis!",
	},
	{
		user: "rhythm_guru",
		post: "The impact of TikTok on chart performance and how it affects our bets.",
	},
	{
		user: "hitmaker",
		post: "Congratulations to last week's big winner! $5,000 prize for predicting the top 3 exactly!",
	},
].map((v, id) => ({
	...v,
	id,
	user: users.find((u) => u.user === v.user),
})) as unknown) as Post[]


export const DATA = [
	{
		id: "1a2b3c4d",
		name: "Tech Innovators",
		description: "We are discussing the latest in technology and innovation.",
		image:
			"https://img.freepik.com/free-photo/man-with-vr-glasses-experiencing-metaverse_23-2150904679.jpg?size=626&ext=jpg&ga=GA1.1.553209589.1714953600&semt=ais",
		subGroups: [
			{
				id: "1a2b3c4d1",
				name: "AI Enthusiasts",
				description: "AI tricks and tips.",
				image: "https://picsum.photos/200/300?random=2",
			},
			{
				id: "1a2b3c4d2",
				name: "Blockchain Pioneers",
				description: "Join for iscussions on blockchain technology.",
				image: "https://picsum.photos/200/300?random=2",
			},
		],
	},
	{
		id: "3c4d5e6f",
		name: "Book Club",
		description: "Bookworms only.",
		image: "https://example.com/images/book-club.jpg",
		subGroups: [
			{
				id: "3c4d5e6f1",
				name: "Fiction Fans",
				description: "fiction book discussions.",
				image: "https://example.com/images/fiction-fans.jpg",
			},
		],
	},
	{
		id: "2b3c4d5e",
		name: "Fitness Freaks",
		description: "Only fitness enthusiasts.",
		image: "https://picsum.photos/200/300?random=2",
		subGroups: [],
	},
	{
		id: "5e6f7g8h",
		name: "Foodies United",
		description: "This group for food lovers to share recipes and reviews.",
		image: "https://picsum.photos/200/300?random=2",
		subGroups: [
			{
				id: "5e6f7g8h1",
				name: "Vegan Delights",
				description: "Vegan recipes",
				image: "https://picsum.photos/200/300?random=2",
			},
			{
				id: "5e6f7g8h2",
				name: "Dessert Lovers",
				description: "Best Dessert recipes.",
				image: "https://picsum.photos/200/300?random=2",
			},
		],
	},
	{
		id: "4d5e6f7g",
		name: "Travel Buddies",
		description: "We are sharing travel experiences and tips.",
		image: "https://example.com/images/travel-buddies.jpg",
		subGroups: [],
	},
	{
		id: "6f7g8h9i",
		name: "Music Maniacs",
		description: "Join us to connect with fellow music enthusiasts",
		image: "https://picsum.photos/200/300?random=2",
		subGroups: [
			{
				id: "6f7g8h9i1",
				name: "Rock and Roll",
				description: "Have fun.",
				image: "https://picsum.photos/200/300?random=2",
			},
			{
				id: "6f7g8h9i2",
				name: "Classical Harmony",
				description: "Millenial",
				image: "https://picsum.photos/200/300?random=2",
			},
			{
				id: "6f7g8h9i3",
				name: "Jazz Vibes",
				description: "Join for cool vibes.",
				image: "https://picsum.photos/200/300?random=",
			},
		],
	},
]

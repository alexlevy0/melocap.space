import { useAuthenticator } from "@aws-amplify/ui-react-native";
import { useActionSheet } from "@expo/react-native-action-sheet";
import { Button } from "@tamagui/button";
import { MoreVertical } from "@tamagui/lucide-icons";
import { Stack, useLocalSearchParams, useNavigation, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import * as Sentry from "@sentry/react-native";
import { Iframe } from "@bounceapp/iframe"

import { Feed } from "@/components/feed";
import { posts, type Post } from "@/data";
import { goldenRatio } from "@/utils";
import { onPressBottomSheet } from "@/utils/bottomSheet";
import { getSpotifyAccessToken, searchSpotify } from "@/utils/spotify/getSpotifyToken";
import { Platform, View } from "react-native";
import { Input, XStack } from "tamagui";

export default function Search() {
	const router = useRouter();
	const params = useLocalSearchParams<{ q?: string }>();
	// console.log({ posts });
	const filteredPosts: Post[] = !params.q
		? posts
		: posts.filter((post) =>
			post.post
				.toLowerCase()
				.includes(params.q?.toLowerCase() ?? ''),
		);

	// console.log({ filteredPosts });

	const { authStatus } = useAuthenticator((context) => [
		context.authStatus,
	]);
	const isLoggedIn = [authStatus].includes("authenticated");
	const { showActionSheetWithOptions } = useActionSheet();
	const { signOut } = useAuthenticator();
	const navigation = useNavigation();

	const onPressAccountIndex = () => {
		navigation.navigate('profile' as never);
	}

	const onPress = () => {
		onPressBottomSheet({ signOut, showActionSheetWithOptions, isLoggedIn, authStatus, onPressAccountIndex });
	};
	const [searchResult, setSearchResult] = useState()
	const [trackUri, setTrackUri] = useState<string>()
	const [spotifyAccessToken, setSpotifyAccessToken] = useState()

	useEffect(() => {
		const fetch = async () => {
			if (spotifyAccessToken) {
				return
			}
			console.log("getSpotifyAccessToken WARNNNNNN");
			const accessToken = await getSpotifyAccessToken();
			setSpotifyAccessToken(accessToken)
		}
		fetch()
	}, [params.q ?? ""]);

	useEffect(() => {
		console.log('searchResult--->', searchResult);
		if (trackUri && !searchResult) {
			setTrackUri(undefined)
		}
	}, []);

	useEffect(() => {
		const fetch = async () => {
			if (!spotifyAccessToken || !params.q) {
				return
			}
			const data = await searchSpotify({ query: params.q ?? "", accessToken: spotifyAccessToken })
			// console.log({ data });
			setSearchResult(data)
		}

		// Sentry.captureException(new Error("First error"));
		// Sentry.nativeCrash();
		// throw new Error('My first Sentry error!');
		fetch()
	}, [Platform.OS !== 'web' ? (params.q ?? "") : null]);

	const onPressPlay = (uri: string) => {
		console.log({ uri });
		if (trackUri) {
			setTrackUri(undefined)
			return
		}
		setTrackUri(uri)
	}

	const onChangeText = (event: string | { nativeEvent: { text: string } }) => {
		setTrackUri(undefined)
		if (Platform.OS === 'web' && typeof event === 'string') {
			router.setParams({ q: event });
			setTimeout(() => {
				onPressSearch({ limit: 12 })
			}, 420)

			return
		}
		if (typeof event === 'object' && 'nativeEvent' in event) {
			router.setParams({
				q: event.nativeEvent.text,
			});
			setTimeout(() => {
				onPressSearch({ limit: 12 })
			}, 420)

		}
	}

	const onPressSearch = async ({ limit }: { limit: number }) => {
		if (!spotifyAccessToken || !params.q) {
			return
		}
		const data = await searchSpotify({ query: params.q ?? "", accessToken: spotifyAccessToken, limit })
		// console.log('res : ', data?.tracks?.items);
		const _data = data?.tracks?.items.map((track) => {
			return {
				user: {
					user: track.artists[0].name,
					name: track.artists[0].name,
					image: track.album.images[0].url,
					followers: 'toto',
					url: track.album.images[0].url,
					bio: 'toto',
				},
				post: track.name,
				id: track.id,
				// id: track.id,
				// uri: track.uri,
				// title: track.name,
				// artist: track.artists[0].name,
				// imageUrl: track.album.images[0].url,
				// album: track.album.name,
				// albumId: track.album.id,
			}
		});
		// console.log({ _data });
		setSearchResult(_data)
	}
	return (
		<>
			<Stack.Screen
				options={{
					title: "Search Music",
					headerSearchBarOptions: {
						hideWhenScrolling: false,
						onChangeText,
					},
					headerRight: () => (
						<Button
							style={{
								borderWidth: 0,
								backgroundColor:
									"transparent",
							}}
							onPress={onPress}
							size="$4"
							scaleIcon={goldenRatio}
							icon={MoreVertical}
						/>
					),
				}}
			/>
			{Platform.OS === 'web' ? <SearchBar onPress={onPressSearch} onChangeText={onChangeText} /> : null}
			<Feed
				trackUri={trackUri}
				onPressPlay={onPressPlay}
				data={searchResult}
				contentInsetAdjustmentBehavior="automatic"
			/>
			{trackUri && (
				<View
					style={{
						backgroundColor: "$background",
						height: 154,
						width: "100%",
					}}
				>
					<Iframe
						uri={`https://open.spotify.com/embed/track/${trackUri}?go=1`}
						style={{
							flex: 1,
						}}
					/>
				</View>
			)}
		</>
	);
}

const SearchBar = ({ onPress, onChangeText }: { onPress: () => void, onChangeText: (text: string) => void }) => {
	const params = useLocalSearchParams<{ q?: string }>();
	return (
		<View style={{ backgroundColor: "$background", height: 70, width: "100%", justifyContent: "center" }}>
			<XStack alignItems="center" space="$2" padding="$2">
				<Input autoFocus size="$5" onChangeText={onChangeText} value={params.q} flex={1} placeholder={`Search Music...`} />
				<Button size="$5" onPress={onPress}>Go</Button>
			</XStack>
		</View>
	)
}
import { useAuthenticator } from "@aws-amplify/ui-react-native";
import { useActionSheet } from "@expo/react-native-action-sheet";
import { Button } from "@tamagui/button";
import { MoreVertical } from "@tamagui/lucide-icons";
import { Stack, useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import * as Sentry from "@sentry/react-native";

import { Feed } from "@/components/feed";
import { posts } from "@/data";
import { goldenRatio } from "@/utils";
import { onPressBottomSheet } from "@/utils/bottomSheet";
import { getSpotifyAccessToken, searchSpotify } from "@/utils/spotify/getSpotifyToken";
import { Platform, View } from "react-native";
import { Input, XStack } from "tamagui";

export default function Search() {
	const router = useRouter();
	const params = useLocalSearchParams<{ q?: string }>();
	// console.log({ posts });
	const filteredPosts = !params.q
		? posts
		: posts.filter((post) =>
			post.post
				.toLowerCase()
				.includes(params.q.toLowerCase()),
		);

	console.log({ filteredPosts });

	const { authStatus } = useAuthenticator((context) => [
		context.authStatus,
	]);
	const isLoggedIn = [authStatus].includes("authenticated");
	const { showActionSheetWithOptions } = useActionSheet();
	const { signOut } = useAuthenticator();
	const onPress = () => {
		onPressBottomSheet({ signOut, showActionSheetWithOptions, isLoggedIn, authStatus });
	};
	const [searchResult, setSearchResult] = useState()
	const [spotifyAccessToken, setSpotifyAccessToken] = useState()

	useEffect(() => {
		const fetch = async () => {
			const accessToken = await getSpotifyAccessToken();
			console.log({ accessToken });
			setSpotifyAccessToken(accessToken)
		}
		fetch()
	}, [params.q ?? ""]);
	useEffect(() => {
		const fetch = async () => {
			if (!spotifyAccessToken || !params.q) {
				return
			}
			const data = await searchSpotify({ query: params.q ?? "", accessToken: spotifyAccessToken })
			console.log({ data });
			setSearchResult(data)
		}

		// Sentry.captureException(new Error("First error"));
		// Sentry.nativeCrash();
		// throw new Error('My first Sentry error!');
		fetch()
	}, [params.q ?? ""]);

	return (
		<>
			<Stack.Screen
				options={{
					title: "Search Music",
					headerSearchBarOptions: {
						hideWhenScrolling: false,
						// autoFocus: true,
						onChangeText: (event) => {
							// Update the query params to match the search query.
							router.setParams({
								q: event
									.nativeEvent
									.text,
							});
						},
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
			{Platform.OS === 'web' ? <SearchBar /> : null}
			<Feed
				data={filteredPosts}
				contentInsetAdjustmentBehavior="automatic"
			/>
		</>
	);
}

const SearchBar = () => {
	const router = useRouter();
	const params = useLocalSearchParams<{ q?: string }>();

	const onChangeText = (event: string) => {
		router.setParams({ q: event })
	}
	return (
		<>
			<View style={{ backgroundColor: "white", height: 50, width: "100%", justifyContent: "center" }}>
				<XStack alignItems="center" space="$2" padding="$2">
					<Input autoFocus size="$4" onChangeText={onChangeText} value={params.q} flex={1} placeholder={`Search Music...`} />
					<Button>Go</Button>
				</XStack>
			</View>
		</>
	)
}

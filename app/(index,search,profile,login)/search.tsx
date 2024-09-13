import { useAuthenticator } from "@aws-amplify/ui-react-native";
import { useActionSheet } from "@expo/react-native-action-sheet";
import { Button } from "@tamagui/button";
import { MoreVertical } from "@tamagui/lucide-icons";
import { Stack, useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useState } from "react";

import { Feed } from "@/components/feed";
import { posts } from "@/data";
import { goldenRatio } from "@/utils";
import { onPressBottomSheet } from "@/utils/bottomSheet";
import { getSpotifyAccessToken, searchSpotify } from "@/utils/spotify/getSpotifyToken";

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
	const { searchResult, setSearchResult} = useState()

	useEffect(() => {
		const fetch = async () => {
			const accessToken = await getSpotifyAccessToken();
			console.log({ accessToken });
			const data = await searchSpotify({ query: params.q ?? "", accessToken })
			
			setSearchResult(data)
		}

		// fetch()
	}, [])

	return (
		<>
			<Stack.Screen
				options={{
					title: "Search",
					headerSearchBarOptions: {
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
			<Feed
				data={filteredPosts}
				contentInsetAdjustmentBehavior="automatic"
			/>
		</>
	);
}

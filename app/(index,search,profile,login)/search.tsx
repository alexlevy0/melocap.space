import { Stack, useLocalSearchParams, useRouter } from "expo-router";

import { Feed } from "@/components/feed";
import { posts } from "@/data";
import { goldenRatio } from "@/utils";
import { onPressBottomSheet } from "@/utils/bottomSheet";
import { MoreVertical } from "@tamagui/lucide-icons";
import { useAuthenticator } from "@aws-amplify/ui-react-native";
import { useActionSheet } from "@expo/react-native-action-sheet";
import { Button } from "@tamagui/button";

export default function Search() {
	const router = useRouter();
	const params = useLocalSearchParams<{ q?: string }>();
	console.log({ posts });
	const filteredPosts = !params.q
		? posts
		: posts.filter((post) =>
			post.post
				.toLowerCase()
				.includes(params.q.toLowerCase()),
		);


	const { authStatus } = useAuthenticator((context) => [
		context.authStatus,
	]);
	const isLoggedIn = [authStatus].includes("authenticated");
	const { showActionSheetWithOptions } = useActionSheet();
	const { signOut } = useAuthenticator();
	const onPress = () => {
		onPressBottomSheet({ signOut, showActionSheetWithOptions, isLoggedIn, authStatus });
	};
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

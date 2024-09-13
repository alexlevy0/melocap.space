import { Stack, useLocalSearchParams, useRouter } from "expo-router";

import { Feed } from "@/components/feed";
import { posts } from "@/data";
import { goldenRatio } from "@/utils";
import { onPressBottomSheet } from "@/utils/bottomSheet";
import { MoreVertical } from "@tamagui/lucide-icons";
import { Button } from "react-native";

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
							onPress={onPressBottomSheet}
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

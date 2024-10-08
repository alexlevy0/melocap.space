import { Stack, useLocalSearchParams } from "expo-router";
import Head from "expo-router/head";
import { Text } from "react-native";
import { ScrollView } from "react-native-gesture-handler";

import { PostCmp } from "@/components/post";
import { posts } from "@/data";

export default function Post() {
	const { post: id } = useLocalSearchParams<{ post: string }>();

	const post = posts.find((post) => post.id == id);

	if (!post) {
		return (
			<ScrollView contentInsetAdjustmentBehavior="automatic">
				<Text>Post not found: {id}</Text>
			</ScrollView>
		);
	}

	return (
		<>
			<Head>
				<title>{post.user.name} | Post</title>
				<meta name="description" content={post.post} />
				<meta
					property="og:description"
					content={post.post}
				/>
				<meta
					property="og:image"
					content={post.user.image}
				/>
			</Head>
			<Stack.Screen options={{ title: "Post" }} />
			<ScrollView contentInsetAdjustmentBehavior="automatic">
				<PostCmp item={post} />
			</ScrollView>
		</>
	);
}

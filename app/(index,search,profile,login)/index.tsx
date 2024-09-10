import { Stack } from "expo-router"
import Head from "expo-router/head"
import "react-native-reanimated";

import { Feed } from "@/components/feed"
import { FeedAnimated } from "@/components/feedAnimated"
import { posts } from "@/data"

export default function Home() {
	return (
		<>
			<Head>
				<title>Home</title>
			</Head>
			<Stack.Screen options={{ title: "Home" }} />
			<Feed contentInsetAdjustmentBehavior="automatic" data={posts} />
			{/* <FeedAnimated contentInsetAdjustmentBehavior="automatic" data={posts} /> */}
			{/* <Stack>
				<Stack.Screen
					name="index"
					options={{
						headerLargeTitle: true,
						headerTransparent: true,
						title: "Groups",
						headerTitleStyle: {
							color: colorScheme === "dark" ? "black" : "white",
						},
					}}
				/>
			</Stack> */}
		</>
	)
}

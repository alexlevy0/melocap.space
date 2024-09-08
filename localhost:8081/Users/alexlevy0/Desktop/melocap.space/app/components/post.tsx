import { Link, useRouter, useSegments } from "expo-router";
import { Image, Pressable, Text, View, useColorScheme } from "react-native";
import { useTheme } from "@react-navigation/native";

import type { Post } from "@/app/data";
type Group<T extends string> = `(${T})`;

type SharedSegment = Group<"index"> | Group<"search"> | Group<"profile">;

export function PostCmp({ item }: { item: Post }) {
	const [segment] = useSegments() as [SharedSegment];
	const router = useRouter();
	const theme = useTheme();
	const colorScheme = useColorScheme();
	console.log("->theme", { theme });
	console.log("->colorScheme---", { colorScheme });
	return (
		<Pressable
			onPress={() => {
				router.push(`/${segment}/post/${item.id}`);
			}}
		>
			{({ hovered, pressed }) => (
				<View
					style={[
						{
							flexDirection: "row",
							padding: 16,
							gap: 16,
							borderBottomColor:
								"#ccc",
							borderBottomWidth: 1,
							transitionDuration:
								"200ms",
							backgroundColor:
								"$background0",
						},
						hovered && {
							// backgroundColor: "#ddd",
							backgroundColor:
								"$background-hover",
						},
						pressed && {
							// backgroundColor: "#ccc",
							// backgroundColor: "yellow",
							backgroundColor:
								"$background0",
							// backgroundColor: '$background',
						},
					]}
				>
					<Image
						source={{
							uri: item.user.image,
						}}
						style={{
							width: 48,
							height: 48,
							borderRadius: 24,
						}}
					/>
					<View
						style={{
							gap: 4,
							flex: 1,
							alignItems: "flex-start",
						}}
					>
						<Link
							href={`/${segment}/${item.user.user}`}
							asChild
						>
							<Pressable
								style={{
									alignItems: "flex-start",
								}}
							>
								{({
									hovered,
								}) => (
									<Text
										style={[
											{
												fontWeight: "bold",
												fontSize: 16,
											},
											hovered && {
												textDecorationLine:
													"underline",
											},
										]}
									>
										@
										{
											item
												.user
												.user
										}
									</Text>
								)}
							</Pressable>
						</Link>

						<Text selectable>
							{item.post}
						</Text>
					</View>
				</View>
			)}
		</Pressable>
	);
}

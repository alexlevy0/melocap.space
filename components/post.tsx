import { useTheme } from "@react-navigation/native";
import { Link, useRouter, useSegments } from "expo-router";
import { Pressable, Text, View, useColorScheme } from "react-native";
import { Image } from "expo-image";

import type { Post } from "@/data";
type Group<T extends string> = `(${T})`;

type SharedSegment = Group<"index"> | Group<"search"> | Group<"profile">;

export function PostCmp({ item }: { item: Post }) {
	const [segment] = useSegments() as [SharedSegment];
	const router = useRouter();
	const theme = useTheme();
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
							// uri: item.user.image,
							uri: "https://picsum.photos/seed/696/3000/2000",
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
										selectable
										style={[
											{
												fontWeight: "bold",
												fontSize: 16,
												color: theme
													.colors
													.text,
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

						<Text
							selectable
							style={[
								{
									color: theme
										.colors
										.text,
								},
							]}
						>
							{item.post}
						</Text>
					</View>
				</View>
			)}
		</Pressable>
	);
}

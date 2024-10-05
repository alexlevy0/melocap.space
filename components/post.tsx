import { useTheme } from "@react-navigation/native";
import { Image } from "expo-image";
import * as Linking from 'expo-linking';
import { Link, useRouter, useSegments } from "expo-router";
import { Pressable, Text, View, useColorScheme } from "react-native";

import type { Post } from "@/data";
type Group<T extends string> = `(${T})`;

type SharedSegment = Group<"index"> | Group<"search"> | Group<"profile">;

type PostCmpProps = {
	item: Post;
	onPressPlay: (uri: string) => void;
	trackUri: string;
};

export function PostCmp({
	item,
	onPressPlay,
	trackUri,
}: PostCmpProps) {
	const [segment] = useSegments() as [SharedSegment];
	const router = useRouter();
	const theme = useTheme();
	return (
		<Pressable
			onPress={() => {
				onPressPlay?.(item.id);
			}}
		>
			{({ pressed }) => (
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
						pressed && {
							backgroundColor:
								"$background0",
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
								{() => (
									<Text
										style={[
											{
												fontWeight: "bold",
												fontSize: 16,
												color: theme
													.colors
													.text,
											},

										]}
									>
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
					<Pressable
						onPress={() => {
							// router.push(`/${segment}/post/${item.id}`);
							// Linking.openURL(`https://open.spotify.com/track/${item.id}?go=1`);
						}}
						style={[
							{
								justifyContent: "center",
								alignItems: "flex-end",
							},
						]}
					>
						<Text
							style={[
								{
									fontSize: 12,
									fontWeight: "bold",
									textAlign: "right",
									justifyContent: "center",
									alignItems: "center",
									alignContent: "center",
									color: theme
										.colors
										.text,
								},
							]}
						>
							{trackUri === item.id ? "Now Playing" : "Play"}
						</Text>
					</Pressable>
				</View>
			)}
		</Pressable>
	);
}

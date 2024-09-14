import { Authenticator, useAuthenticator } from "@aws-amplify/ui-react-native";
import { useActionSheet } from "@expo/react-native-action-sheet";
import { useTheme } from "@react-navigation/native";
import { Button } from "@tamagui/button";
import { MoreVertical } from "@tamagui/lucide-icons";
import { Image } from "expo-image";
import { Link, Stack, useLocalSearchParams } from "expo-router";
import Head from "expo-router/head";
import { Text, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";

import { Feed } from "@/components/feed";
import { posts, users } from "@/data";
import { goldenRatio } from "@/utils";
import { onPressBottomSheet } from "@/utils/bottomSheet";

// Run in Node.js environments at build time to generate a list of
// pages that should be statically generated.
export function generateStaticParams() {
	return users.map(({ user }) => ({ profile: user }));
}

export default function Profile() {
	const { profile } = useLocalSearchParams<{ profile: string }>();
	return <ProfileScreen profile={profile} />;
}

export function ProfileScreen({ profile }: { profile: string }) {
	const user = users.find((user) => user.user === profile);
	const theme = useTheme();
	// <AccountSettings.ChangePassword
	//     onSuccess={noop}
	//     onError={noop}
	//   />

	const { authStatus } = useAuthenticator((context) => [
		context.authStatus,
	]);
	const isLoggedIn = [authStatus].includes("authenticated");
	const { showActionSheetWithOptions } = useActionSheet();
	const { signOut } = useAuthenticator();
	const onPress = () => {
		onPressBottomSheet({ signOut, showActionSheetWithOptions, isLoggedIn, authStatus });
	};

	if (!user) {
		return (
			<ScrollView contentInsetAdjustmentBehavior="automatic">
				<Text>User not found: {profile}</Text>
			</ScrollView>
		);
	}

	return (
		<>
			<Authenticator.Provider>
				<Authenticator>
					<Head>
						<title>{user.name} | Profile</title>
						<meta name="description" content={user.bio} />
						<meta
							property="og:description"
							content={user.bio}
						/>
						<meta
							property="og:image"
							content={user.image}
						/>
					</Head>
					<Stack.Screen options={{ title: "Profile" }} />
					<Stack.Screen
						options={{
							title: "Profile",
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
						contentInsetAdjustmentBehavior="automatic"
						style={{ flex: 1 }}
						ListHeaderComponent={() => (
							<View
								style={{
									flex: 1,
									paddingHorizontal: 18,
									gap: 8,
									paddingTop: 24,
								}}
							>
								<Image
									// source={user.image}
									source={
										"https://picsum.photos/seed/696/3000/2000"
									}
									style={{
										width: 64,
										height: 64,
										borderRadius:
											64 / 2,
									}}
								/>
								<View>
									<Text
										style={{
											fontSize: 32,
											fontWeight: "bold",
											color: theme
												.colors
												.text,
										}}
									>
										{user.name}
									</Text>
									<Text
										style={{
											fontSize: 16,
											opacity: 0.6,
											color: theme
												.colors
												.text,
										}}
									>
										@{user.user}
									</Text>
								</View>
								<Text
									style={{
										fontSize: 16,
										color: theme
											.colors
											.text,
									}}
								>
									{user.bio}
								</Text>
								<Link
									style={{
										color: "dodgerblue",
									}}
									href={user.url as any}
								>
									{user.url
										.replace(
											/\/$/,
											"",
										)
										.replace(
											/^https?:\/\//,
											"",
										)}
								</Link>
								<View
									style={{
										flexDirection:
											"row",
										flex: 1,
										// borderWidth: 1,
										justifyContent:
											"space-around",
									}}
								>
									<Text
										style={{
											fontSize: 16,
											fontWeight: "bold",
											color: theme
												.colors
												.text,
										}}
									>
										{user.followers}{" "}
										<Text
											style={{
												opacity: 0.6,
												color: theme
													.colors
													.text,
											}}
										>
											Appears in playlists
										</Text>
									</Text>

									<Text
										style={{
											fontSize: 16,
											fontWeight: "bold",
											color: theme
												.colors
												.text,
										}}
									>
										{user.followers}{" "}
										<Text
											style={{
												opacity: 0.6,
												color: theme
													.colors
													.text,
											}}
										>
											Game count
										</Text>
									</Text>
									<Text
										style={{
											fontSize: 16,
											fontWeight: "bold",
											color: theme
												.colors
												.text,
										}}
									>
										{user.followers}{" "}
										<Text
											style={{
												opacity: 0.6,
												color: theme
													.colors
													.text,
											}}
										>
											Longest streak
										</Text>
									</Text>
								</View>
							</View>
						)}
						data={posts.filter(
							(post) => post.user.user === profile,
						)}
					/>
				</Authenticator>
			</Authenticator.Provider>
		</>
	);
}

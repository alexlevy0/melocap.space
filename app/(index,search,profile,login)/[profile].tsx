import { Link, Stack, useLocalSearchParams } from "expo-router";
import Head from "expo-router/head";
import { Image, Text, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { Activity, Airplay, MoreVertical } from "@tamagui/lucide-icons";
import { useTheme } from "@react-navigation/native";

import { Feed } from "@/app/components/feed";
import { posts, users } from "@/app/data";
import { makeIcon } from "../components/icon";
import { Button } from "@tamagui/button";
import { YStack } from "@tamagui/stacks";
import { useActionSheet } from "@expo/react-native-action-sheet";
import { useAuthenticator } from "@aws-amplify/ui-react-native";

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
	const { showActionSheetWithOptions } = useActionSheet();
	const { signOut, signIn } = useAuthenticator();
	const theme = useTheme();
	const { authStatus } = useAuthenticator((context) => [
		context.authStatus,
	]);
	const isLoggedIn = [authStatus].includes("authenticated");
	const onPress = () => {
		const options = [
			"Votre compte",
			"Sécurité et accès au compte",
			"Premium",
			"Monétisation",
			"Confidentialité et sécurité",
			"Notification",
			"Accessibilité, affichage et langues",
			"Resssources supplémentaires",
			isLoggedIn ? "Déconnexion" : "Connexion",
			"Cancel",
		];
		const LogButtonIndex = options.length - 2;
		const cancelButtonIndex = options.length - 1;

		showActionSheetWithOptions(
			{
				title: "Paramètres",
				message: "Trouves tous les paramètres de votre compte ici",
				options,
				cancelButtonIndex,
				destructiveButtonIndex: LogButtonIndex,
			},
			(selectedIndex: number | undefined) => {
				switch (selectedIndex) {
					case 1:
						// Save
						break;

					// TODO Add more options

					case LogButtonIndex:
						if (isLoggedIn) {
							signOut();
							return;
						}
						signIn();
						return;

					case cancelButtonIndex:
					// Canceled
				}
			},
		);
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
			{/* <Stack.Screen options={{ title: "Profile" }} /> */}
			<Stack.Screen
				options={{
					title: "Profile",
					// headerTitle: props => <LogoTitle {...props} />,
					headerRight: () => (
						<YStack padding="$3" gap="$3">
							<Button
								onPress={
									onPress
								}
								size="$3"
								variant="outlined"
								icon={
									MoreVertical
								}
							/>
						</YStack>
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
							source={{
								uri: user.image,
							}}
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
								Followers
							</Text>
						</Text>
					</View>
				)}
				data={posts.filter(
					(post) => post.user.user === profile,
				)}
			/>
		</>
	);
}

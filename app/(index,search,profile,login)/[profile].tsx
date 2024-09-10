import { Link, Stack, useLocalSearchParams } from "expo-router";
import Head from "expo-router/head";
import { Text, View } from "react-native";
import { Image } from "expo-image";
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
import { goldenRatio } from "../utils";

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
						// TODO Redirect to auth
						// signIn();
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
			<Stack.Screen options={{ title: "Profile" }} />
			<Stack.Screen
				options={{
					title: "Profile",
					headerTitle: (props) => (
						<Text
							style={{
								color: theme
									.colors
									.text,
							}}
							{...props}
						>
							MeloCap
						</Text>
					),
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
									playlists
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
									followers
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
									suivi(e)s
								</Text>
							</Text>
						</View>
					</View>
				)}
				data={posts.filter(
					(post) => post.user.user === profile,
				)}
			/>
		</>
	);
}

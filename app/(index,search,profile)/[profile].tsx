import { Authenticator, useAuthenticator } from "@aws-amplify/ui-react-native";
import { useActionSheet } from "@expo/react-native-action-sheet";
import { useTheme, type ThemeProvider } from "@react-navigation/native";
import { Button } from "@tamagui/button";
import { MoreVertical } from "@tamagui/lucide-icons";
import { deleteUser, updatePassword, type FetchUserAttributesOutput, type GetCurrentUserOutput } from 'aws-amplify/auth';
import { Image } from "expo-image";
import { Link, Stack, useLocalSearchParams, useNavigation } from "expo-router";
import Head from "expo-router/head";
import { Text, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { ThemeProvider as AmplifyThemeProvider } from '@aws-amplify/ui-react';

import { alert } from "@/components/alert";
import { Feed } from "@/components/feed";
import { posts, users } from "@/data";
import { goldenRatio } from "@/utils";
import { onPressBottomSheet } from "@/utils/bottomSheet";
// import { currentAuthenticatedUser } from "@/utils/user/currentAuthenticatedUser";
import { useEffect, useState } from "react";
import { Input, Paragraph, XStack, YStack } from "tamagui";
import { fetchCurrentAuthenticatedUser } from "@/utils/currentAuthenticatedUser/fetch";
import { fetchCurrentAuthenticatedUserAttributes } from "@/utils/currentAuthenticatedUser/fetchAttributes";
import { handleUpdateUserAttribute } from "@/utils/currentAuthenticatedUser/updateAttribute";


export default function Profile() {
	const { profile } = useLocalSearchParams<{ profile: string }>();
	return <ProfileScreen profile={profile} />;
}

export function ProfileScreen({ profile }: { profile: string }) {
	// console.log({ profile });
	// const user = users.find((user) => user.user === profile);
	const theme = useTheme();
	const navigation = useNavigation();

	const { authStatus } = useAuthenticator((context) => [
		context.authStatus,
	]);


	const isLoggedIn = [authStatus].includes("authenticated");
	const { showActionSheetWithOptions } = useActionSheet();
	const { signOut } = useAuthenticator();
	const [isSettingsDisplayed, setIsSettingsDisplayed] = useState(false);

	const [verifyPassword, setVerifyPassword] = useState<string>("");
	const [password, setPassword] = useState<string>("");

	const [user, setUser] = useState<GetCurrentUserOutput>();
	const [userAttr, setUserAttr] = useState<FetchUserAttributesOutput>();

	useEffect(() => {
		const fetch = async () => {
			const user = await fetchCurrentAuthenticatedUser()
			const userAttr = await fetchCurrentAuthenticatedUserAttributes()
			if (!user || !userAttr) {
				return
			}
			setUser(user)
			setUserAttr(userAttr)
			// console.log({ user });
			initUserRewardAttribute(userAttr)
			initUserGamePlayedAttribute(userAttr)
		}
		fetch()

	}, []);

	function initUserRewardAttribute(userAttr: FetchUserAttributesOutput) {
		console.log({ userAttr });
		const reward = userAttr['custom:reward'];
		if (reward) {
			handleUpdateUserAttribute('custom:reward', JSON.stringify([]))
		}
	}
	function initUserGamePlayedAttribute(userAttr: FetchUserAttributesOutput) {
		console.log({ userAttr });
		const reward = userAttr['custom:gamePlayed'];
		if (reward) {
			handleUpdateUserAttribute('custom:gamePlayed', JSON.stringify([]))
		}
	}

	function onPressAccountIndex() {
		setIsSettingsDisplayed(!isSettingsDisplayed)
	}

	const onPress = () => {
		onPressBottomSheet({ signOut, showActionSheetWithOptions, isLoggedIn, onPressAccountIndex });
	};

	const onPressChangePassword = async () => {
		try {
			await updatePassword({
				oldPassword: password,
				newPassword: verifyPassword,
			});
		} catch (error) {
			console.error("onPressChangePassword error", error);
		}
	};
	const onPressCancelChangePassword = async () => {
		setIsSettingsDisplayed(!isSettingsDisplayed)
	};

	const onChangeTextPassword = async (text: string) => {
		setPassword(text)
	};

	const onChangeTextVerifyPassword = async (text: string) => {
		setVerifyPassword(text)

	};
	const onPressDeleteUser = async () => {
		try {
			alert(
				"Delete User",
				"Are you sure you want to delete this user?",
				[
					{
						text: "Cancel",
						onPress: () => console.log("Cancel Pressed"),
						style: "cancel",
					},
					{
						text: "Yes, delete my account",
						onPress: async () => {
							try {
								await deleteUser();
							} catch (error) {
								console.log(error);
							}
						},
					},
				],
				{ cancelable: true }
			);
		} catch (error) {
			console.log(error);
		}
	}
	// if (!user) {
	// 	return (
	// 		<ScrollView contentInsetAdjustmentBehavior="automatic">
	// 			<Text>User not found: {profile}</Text>
	// 		</ScrollView>
	// 	);
	// }


	return (
		// <AmplifyThemeProvider colorMode={"system"}>
			<Authenticator socialProviders={[/*'apple' , 'facebook', 'google' */]}>
				<Head>
					<title>{user?.signInDetails?.loginId ?? "Profile"}</title>
					{/* <meta name="description" content={user.bio} /> */}
					{/* <meta
						property="og:description"
						content={user.bio}
					/> */}
					{/* <meta
						property="og:image"
						content={user.image}
					/> */}
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
				{isSettingsDisplayed ? (
					<View style={{ backgroundColor: "$background", height: "100%", flex: 1 }}>
						<YStack
							gap="$2"
							margin="$3"
							padding="$2"
							alignItems="left"
						>
							<Paragraph size="$10" fontWeight="800">
								Edit Password
							</Paragraph>
						</YStack>
						<YStack
							overflow="hidden"
							space="$2"
							margin="$3"
							padding="$2"
						>
							<View style={{ backgroundColor: "$background", height: 85, width: "100%", justifyContent: "center" }}>
								<XStack alignItems="center" space="$5" padding="$1">
									<Input size="$5" onChangeText={onChangeTextPassword} value={password} flex={1} placeholder={`Actual Password`} />
								</XStack>
							</View>
							<View style={{ backgroundColor: "$background", height: 85, width: "100%", justifyContent: "center" }}>
								<XStack alignItems="center" space="$5" padding="$1">
									<Input size="$5" onChangeText={onChangeTextVerifyPassword} value={verifyPassword} flex={1} placeholder={`New Password`} />
								</XStack>
							</View>
							<Button size="$5" variant="outlined" color={theme.colors.primary} onPress={onPressChangePassword}>Changer le mot de passe</Button>
							<Button size="$5" variant="outlined" onPress={onPressCancelChangePassword}>Annuler</Button>
						</YStack>
						<YStack
							// overflow="hidden"
							flex="1"
							space="$2"
							margin="$3"
							padding="$2"
							alignItems="flex-end"
							justifyContent="flex-end"
						>
							<Button size="$5" variant="outlined" onPress={onPressDeleteUser}>Delete Account</Button>
						</YStack>
					</View>
				) : (
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
										{user?.signInDetails?.loginId}
									</Text>
									
								</View>
								<YStack
									gap="$2"
									margin="$4"
									padding="$4"
								>

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
											{/* {user.followers}{" "} */}
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
									</View>
								</YStack>

							</View>
						)}
						data={posts.filter(
							(post) => post.user.user === profile,
						)}
					/>
				)}
			</Authenticator>
		// </AmplifyThemeProvider>
	);
}
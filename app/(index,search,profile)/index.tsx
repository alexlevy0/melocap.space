import { Stack, useNavigation } from "expo-router";
import Head from "expo-router/head";
import { useColorScheme } from "react-native";
import "react-native-reanimated";

import { Feed } from "@/components/feed";
import { posts } from "@/data";
import { FeedAnimated } from "@/components/feedAnimated";
import { Button } from "@tamagui/button";
import { goldenRatio } from "@/utils";
import { onPressBottomSheet } from "@/utils/bottomSheet";
import { useAuthenticator } from "@aws-amplify/ui-react-native";
import { useActionSheet } from "@expo/react-native-action-sheet";
import { MoreVertical } from "@tamagui/lucide-icons";

export default function Home() {
	const colorScheme = useColorScheme();

	const { authStatus } = useAuthenticator((context) => [
		context.authStatus,
	]);
	const isLoggedIn = [authStatus].includes("authenticated");
	const { showActionSheetWithOptions } = useActionSheet();
	const { signOut } = useAuthenticator();
	const navigation = useNavigation();

	const onPressAccountIndex = () => {
		navigation.navigate('profile' as never);
	}

	const onPress = () => {
		onPressBottomSheet({ signOut, showActionSheetWithOptions, isLoggedIn, authStatus, onPressAccountIndex });
	};
	return (
		<>
			<Head>
				<title>MeloCap</title>
			</Head>
			<Stack.Screen
				options={{
					title: "MeloCap",
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
			{/* <Feed
				contentInsetAdjustmentBehavior="automatic"
				data={posts}
			/> */}
			<FeedAnimated />
		</>
	);
}
import { useAuthenticator } from "@aws-amplify/ui-react-native";
import { useActionSheet } from "@expo/react-native-action-sheet";
import { useTheme } from "@react-navigation/native";
import { Button } from "@tamagui/button";
import { MoreVertical } from '@tamagui/lucide-icons';
import { generateClient } from 'aws-amplify/data';
import { Stack, useNavigation } from "expo-router";
import Head from "expo-router/head";
import { useColorScheme } from "react-native";
import "react-native-reanimated";
import { YStack } from "tamagui";

import type { Schema } from '@/amplify/data/resource';
import { FeedAnimated } from "@/components/feedAnimated";
import { goldenRatio } from "@/utils";
import { onPressBottomSheet } from "@/utils/bottomSheet";
import { useEffect, useState } from "react";

const client = generateClient<Schema>()


export default function Home() {
	const colorScheme = useColorScheme();
	const theme = useTheme();

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

	const createTodo = async () => {
		await client.models.Todo.create({
			content: window.prompt("Todo content?"),
			isDone: false,
		});
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
			{/* isLoggedIn && */
				<YStack
					backgroundColor={theme.colors.background}
					gap="$2"
					margin="$3"
					padding="$2"
					alignItems="left"
				>
					<Button size="$5" variant="outlined" color={theme.colors.primary} onPress={createTodo}>Add new Record</Button>
				</YStack>
			}

			{/* <Feed
				contentInsetAdjustmentBehavior="automatic"
				data={posts}
			/> */}
			<FeedAnimated />
		</>
	);
}
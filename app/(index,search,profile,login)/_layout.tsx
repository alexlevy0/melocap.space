import { Stack } from "expo-router";
import Head from "expo-router/head";
import { Platform, PlatformColor, TouchableOpacity } from "react-native";
import * as Share from "expo-sharing";

import { Icon } from "@/components/icon";

export const unstable_settings = {
	initialRouteName: "index",
	search: {
		initialRouteName: "search",
	},
	profile: {
		initialRouteName: "profile",
	},
};

export default function DynamicLayout() {
	return (
		<Stack
			screenOptions={{
				headerTransparent: true,
				headerLargeTitle: true,
				headerLargeTitleShadowVisible: true,
				// @ts-ignore 
				headerLargeStyle: {
					backgroundColor: PlatformColor("systemGroupedBackgroundColor"),
				},
				headerBlurEffect: "prominent",
				headerShadowVisible: true,
				headerStyle: {
					backgroundColor: "rgba(255, 255, 255, 0.01)",
				},
				headerRight(props) {
					if (isSharingAvailable()) {
						return (
							<ShareButton
								{...props}
							/>
						);
					}
				},
			}}
		/>
	);
}
function safeLocation() {
	if (typeof window === "undefined") {
		return "";
	}
	return window.location.toString();
}

const useLink = Head.useLink
	? Head.useLink
	: () => ({
		url: safeLocation(),
	});

function ShareButton(props) {
	const link = useLink?.();
	const url = link?.url ?? safeLocation();
	return (
		<TouchableOpacity
			activeOpacity={0.8}
			onPress={() => {
				Share.share({
					url,
				});
			}}
		>
			{/* <Icon name="share" fill={props.tintColor} width={24} height={24} /> */}
		</TouchableOpacity>
	);
}

function isSharingAvailable() {
	if (Platform.OS === "web") {
		if (typeof navigator === "undefined") {
			return false;
		}

		return !!navigator.share;
	}
	return true;
}

import type { ExpoConfig, ConfigContext } from "expo/config";

export default ({ config }: ConfigContext): ExpoConfig => ({
	...config,
	name: "melocap",
	slug: "melocap",
	version: "1.0.0",
	orientation: "portrait",
	icon: "./assets/icon.png",
	userInterfaceStyle: "automatic",
	splash: {
		image: "./assets/splash.png",
		resizeMode: "contain",
		backgroundColor: "#ffffff",
	},
	scheme: "melocap",
	ios: {
		supportsTablet: true,
		bundleIdentifier: "com.alexlevy0.melocap",
	},
	android: {
		adaptiveIcon: {
			foregroundImage: "./assets/adaptive-icon.png",
			backgroundColor: "#ffffff",
		},
		package: "com.alexlevy0.melocap",
	},
	web: {
		favicon: "./assets/favicon.png",
	},
	plugins: [
		"expo-font",
		["expo-router", { origin: "https://192.168.1.166:8081" }],
		"expo-splash-screen",
	],
});

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
		// @ts-ignore : Property 'EXPO_PUBLIC_EXPO_ROUTER_ORIGIN' does not exist on type 'typeof env'
		["expo-router", { origin: process.env.EXPO_PUBLIC_EXPO_ROUTER_ORIGIN || '' }],
		"expo-splash-screen",
		[
			"@sentry/react-native/expo",
			{
				// @ts-expect-error 'typeof env'
				"organization": process.env.EXPO_PUBLIC_SENTRY_ORG,
				// @ts-expect-error 'typeof env'
				"project": process.env.EXPO_PUBLIC_SENTRY_PROJECT,
				"url": "https://sentry.io/"
			}
		]
	],
    	extra: {
      		"eas": {
        		"projectId": "be5ba0c1-5452-4aca-b6a5-fa9dbbf1ca16"
      		},
	},
	notification: {
		// vapidPublicKey : "TODO",
	}
});

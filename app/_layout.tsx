import { AnimatedBackground } from "@/components/AnimatedBackground";
import { FeatureCard } from "@/components/FeatureCard";
import { Header } from "@/components/HeaderComponent";
import { Authenticator, useAuthenticator } from "@aws-amplify/ui-react-native";
import { ActionSheetProvider } from "@expo/react-native-action-sheet";
import { Ionicons } from "@expo/vector-icons";
import {
	DarkTheme,
	DefaultTheme,
	NavigationContainer,
	ThemeProvider,
} from "@react-navigation/native";
import * as Sentry from '@sentry/react-native';
import { Amplify } from "aws-amplify";
import { getCurrentUser } from "aws-amplify/auth";
import { isRunningInExpoGo } from 'expo';
import { BlurView } from "expo-blur";
import { useFonts } from "expo-font";
import { Tabs, useNavigationContainerRef } from "expo-router";
import Head from "expo-router/head";
import React, { useEffect } from "react";
import { SafeAreaView, StyleSheet, View, useColorScheme } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import {
	Button,
	H1,
	H2,
	TamaguiProvider,
	Theme,
	XStack,
	YStack,
} from "tamagui";

import "@/styles/styles.module.css";
import outputs from "@/amplify_outputs.json";
import { makeIcon } from "@/components/icon";
import { SocialButtons } from "@/icons";
import { tamaguiConfig } from "@/tamagui.config";

Amplify.configure(outputs, { ssr: true });



// Construct a new instrumentation instance. This is needed to communicate between the integration and React
const routingInstrumentation = new Sentry.ReactNavigationInstrumentation({
	enableTimeToInitialDisplay: !isRunningInExpoGo, // Only in native builds, not in Expo Go.
	routeChangeTimeoutMs: 1000, // default: 1000
});
Sentry.init({
	dsn: "https://0eeb3ae0c1e3b7c2b7917487bed90c89@o4507176862941184.ingest.de.sentry.io/4507947646910544",
	debug: false, // If `true`, Sentry will try to print out useful debugging information if something goes wrong with sending the event. Set it to `false` in production
	// Set tracesSampleRate to 1.0 to capture 100% of transactions for tracing.
	// We recommend adjusting this value in production.
	tracesSampleRate: 1.0,
	_experiments: {
		// profilesSampleRate is relative to tracesSampleRate.
		// Here, we'll capture profiles for 100% of transactions.
		profilesSampleRate: 1.0,
	},
	integrations: [
		new Sentry.ReactNativeTracing({
			// Pass instrumentation to be used as `routingInstrumentation`
			routingInstrumentation,
			enableNativeFramesTracking: !isRunningInExpoGo(),
			// ...
		}),
	],
});

const MyTheme = {
	...DefaultTheme,
	colors: {
		...DefaultTheme.colors,
		primary: "rgb(255, 45, 85)",
	},
};

/**
 * Main application component
 * @returns {React.ReactElement} The rendered application
 */
const App: React.FC = () => {
	const ref = useNavigationContainerRef();

	useEffect(() => {
		if (ref) {
			routingInstrumentation.registerNavigationContainer(ref);
		}
	}, [ref]);

	const colorScheme = useColorScheme();
	const [loaded] = useFonts({
		Inter: require("@tamagui/font-inter/otf/Inter-Medium.otf"),
		InterBold: require("@tamagui/font-inter/otf/Inter-Bold.otf"),
	});

	React.useEffect(() => {
		if (loaded) {
			// Hide splash screen here if needed
		}
	}, [loaded]);

	if (!loaded) {
		return null;
	}
	return (
		// <NavigationContainer theme={MyTheme}>
		<ActionSheetProvider>
			<TamaguiProvider
				config={tamaguiConfig}
				defaultTheme={colorScheme ?? "light"}
			>
				<ThemeProvider
					value={
						colorScheme === "dark"
							? DarkTheme
							: DefaultTheme
					}
				>
					<Authenticator.Provider>
						<Theme
							name={
								colorScheme ===
									"dark"
									? "dark"
									: "light"
							}
						>
							{/* <Authenticator> */}
							<LayoutApp />
							{/* </Authenticator> */}
							{/* <Layout /> */}
							{/* <LivenessQuickStartReact/> */}
						</Theme>
					</Authenticator.Provider>
				</ThemeProvider>
			</TamaguiProvider>
		</ActionSheetProvider>
		// </NavigationContainer>
	);
};

/**
 * Layout component containing the main content
 * @returns {React.ReactElement} The rendered layout
 */
const Layout: React.FC = () => {
	const onPress = () => {
		console.log("onPress");
	};
	return (
		<SafeAreaView style={styles.container}>
			<Head>
				<title>MeloCaps : Sonorité d’avenir !</title>
				<meta
					name="description"
					content="Tamagui - React Native UI Kit"
				/>
			</Head>
			<AnimatedBackground />
			<BlurView
				intensity={80}
				tint="light"
				style={styles.blurView}
			>
				{/* biome-ignore lint/complexity/useArrowFunction: <explanation> */}
				<Header
					onPressFaceLivenessDetector={(): void => {
						throw new Error(
							"Function not implemented.",
						);
					}}
				/>
			</BlurView>

			<YStack f={1} jc="center" ai="center" space="$4" p="$4">
				<H1 ta="center" fow="800">
					MeloCap
				</H1>
				<H2 ta="center" col="$orange10">
					Sonorité d’avenir !
				</H2>
				<Button
					size="$6"
					theme="active"
					br="$10"
					onPress={onPress}
				>
					À vos paris, vibrez, jouez !!
				</Button>
				<XStack space="$4">
					<View style={styles.container}>
						<SocialButtons />
					</View>
				</XStack>
				<XStack mt="$8" space="$8">
					<FeatureCard
						title="À vos Paris"
						description="Découvrez chaque jour un nouveau thème musical et misez sur les morceaux qui capturent le mieux son essence. Entrez dans le jeu et mettez vos connaissances musicales à l'épreuve !"
					/>
					<FeatureCard
						title="Misez"
						description="Sélectionnez vos morceaux et soumettez votre playlist pour participer au défi du jour. La diversité et l'originalité de vos choix pourraient bien faire la différence !"
					/>
					<FeatureCard
						title="Jouez"
						description="Suivez votre progression dans le classement et rivalisez avec les autres participants pour décrocher la première place. Gagnez des récompenses virtuelles en démontrant votre expertise musicale !"
					/>
				</XStack>
			</YStack>
		</SafeAreaView>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	blurView: {
		position: "absolute",
		top: 0,
		left: 0,
		right: 0,
		height: 60,
	},
});

// Placeholder icons (replace with actual implementations)
const TwitterIcon: React.FC = () => null;
const DiscordIcon: React.FC = () => null;

async function currentAuthenticatedUser() {
	try {
		const { username, userId, signInDetails } =
			await getCurrentUser();
		console.log(`The username: ${username}`);
		console.log(`The userId: ${userId}`);
		console.log(`The signInDetails: ${signInDetails}`);
	} catch (err) {
		console.log(err);
	}
}

export default Sentry.wrap(App);

const LayoutApp = () => {
	const { authStatus } = useAuthenticator((context) => [
		context.authStatus,
	]);
	const [renderAuth, setRenderAuth] = React.useState<
		"signIn" | "signUp" | undefined
	>(undefined);
	const { route, toSignIn, toSignUp } = useAuthenticator((context) => [
		context.route,
	]);

	React.useEffect(() => {
		if (![authStatus, route].includes("authenticated")) {
			return;
		}
		setRenderAuth(undefined);

		currentAuthenticatedUser();
	}, [route, authStatus]);

	return (
		<GestureHandlerRootView style={{ flex: 1 }}>
			<Tabs
				screenOptions={{
					headerShown: false,
					tabBarShowLabel: false,
					tabBarActiveTintColor:
						"rgb(29, 155, 240)",
				}}
			>
				<Tabs.Screen
					name="(index)"
					options={{
						title: "MeloCap",
						tabBarIcon: makeIcon(
							"home",
							"home-active",
						),
					}}
				/>
				<Tabs.Screen
					name="(search)"
					options={{
						title: "Search",
						tabBarIcon: makeIcon(
							"explore",
							"explore-active",
						),
					}}
				/>
				<Tabs.Screen
					name="(profile)"
					options={{
						title: "Profile",
						tabBarIcon: makeIcon(
							"profile",
							"profile-active",
						),
					}}
				/>
				<Tabs.Screen
					name="(login)"
					options={{
						title: "Login",
						tabBarIcon: makeIcon(
							"share",
							"share",
						),
					}}
				/>
			</Tabs>
		</GestureHandlerRootView>
	);
};

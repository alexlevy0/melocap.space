/**
 * @fileoverview Main layout component for the Tamagui-based application
 * @module Layout
 */

import { Authenticator } from "@aws-amplify/ui-react-native";
import { ActionSheetProvider } from "@expo/react-native-action-sheet";
import { Amplify } from "aws-amplify";
import { BlurView } from "expo-blur";
import { useFonts } from "expo-font";
import Head from "expo-router/head";
import type React from "react";
import { useEffect, useState } from "react";
import { SafeAreaView, StyleSheet, useColorScheme, View } from "react-native";
import {
	Button,
	H1,
	H2,
	Paragraph,
	TamaguiProvider,
	Theme,
	XStack,
	YStack,
} from "tamagui";

import { AnimatedBackground } from "@/app/components/AnimatedBackground";
import { FeatureCard } from "@/app/components/FeatureCard";
import { Header } from "@/app/components/HeaderComponent";
import {
	DarkTheme,
	DefaultTheme,
	ThemeProvider,
} from "@react-navigation/native";
import { tamaguiConfig } from "./../tamagui.config";

import "@/app/styles/styles.module.css";

import outputs from "./../amplify_outputs.json";
import SocialButtons from "./icons";
import { LivenessQuickStartReact } from "./components/liveness";
Amplify.configure(outputs, { ssr: true });

/**
 * Main application component
 * @returns {React.ReactElement} The rendered application
 */
const App: React.FC = () => {
	const colorScheme = useColorScheme();
	const [loaded] = useFonts({
		Inter: require("@tamagui/font-inter/otf/Inter-Medium.otf"),
		InterBold: require("@tamagui/font-inter/otf/Inter-Bold.otf"),
	});

	useEffect(() => {
		if (loaded) {
			// Hide splash screen here if needed
		}
	}, [loaded]);

	if (!loaded) {
		return null;
	}

	return (
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
							<Layout />
							{/* <LivenessQuickStartReact/> */}
						</Theme>
					</Authenticator.Provider>
				</ThemeProvider>
			</TamaguiProvider>
		</ActionSheetProvider>
	);
};

/**
 * Layout component containing the main content
 * @returns {React.ReactElement} The rendered layout
 */
const Layout: React.FC = () => {
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
				<Header />
			</BlurView>
			
			<YStack f={1} jc="center" ai="center" space="$4" p="$4">
				<H1 ta="center" fow="800">
					MeloCap
				</H1>
				<H2 ta="center" col="$orange10">
					Sonorité d’avenir !
				</H2>
				<Button size="$6" theme="active" br="$10">
					À vos paris, vibrez, jouez !
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

export default App;

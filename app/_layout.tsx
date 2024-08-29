import outputs from "@/amplify_outputs.json"
import { makeIcon } from "@/app/components/icon"
import "@/tamagui-web.css"
import { tamaguiConfig } from "@/tamagui.config"
import { Authenticator } from "@aws-amplify/ui-react-native"
import { ActionSheetProvider } from "@expo/react-native-action-sheet"
import { DarkTheme, DefaultTheme, ThemeProvider } from "@react-navigation/native"
import { Amplify } from "aws-amplify"
import { useFonts } from "expo-font"
import { Tabs } from "expo-router"
import Head from "expo-router/head"
import React, { useEffect } from "react"
import { SafeAreaView, StyleSheet, useColorScheme } from "react-native"
import { GestureHandlerRootView } from "react-native-gesture-handler"
import { TamaguiProvider } from "tamagui"
import { Main } from "@/app/components/main"

type Conf = typeof tamaguiConfig
declare module "@tamagui/core" {
	interface TamaguiCustomConfig extends Conf {}
}
// import TodoList from "@/app/TodoList"

Amplify.configure(outputs, {
	ssr: true,
})

const App = () => {
	const colorScheme = useColorScheme()

	const [loaded] = useFonts({
		Inter: require("@tamagui/font-inter/otf/Inter-Medium.otf"),
		InterBold: require("@tamagui/font-inter/otf/Inter-Bold.otf"),
	})

	useEffect(() => {
		if (loaded) {
			// can hide splash screen here
		}
	}, [loaded])

	if (!loaded) {
		return null
	}

	return (
		<ActionSheetProvider>
			<TamaguiProvider config={tamaguiConfig} defaultTheme={colorScheme ?? "light"}>
				<ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
					<Authenticator.Provider>
						{/* <Authenticator> */}
							{/* <MainApp></MainApp> */}
							<Main></Main>
						{/* </Authenticator> */}
					</Authenticator.Provider>
				</ThemeProvider>
			</TamaguiProvider>
		</ActionSheetProvider>
	)
}
const styles = StyleSheet.create({
	container: {
		flex: 1,
		padding: 8,
	},
})
export default App

const MainApp = () => {
	return (
		<SafeAreaView style={styles.container}>
			<>
				<Head>
					<title>MeloCap</title>
					<meta name="description" content="MeloCap App" />
					<meta property="og:description" content="MeloCap App" />
					<meta property="og:image" content="/og-image.jpg" />
					<meta property="expo:handoff" content="true" />
					<meta property="expo:spotlight" content="true" />
				</Head>
				<GestureHandlerRootView style={{ flex: 1 }}>
					<Tabs
						screenOptions={{
							headerShown: false,
							tabBarShowLabel: false,
							tabBarActiveTintColor: "rgb(29, 155, 240)",
						}}
					>
						<Tabs.Screen
							name="(index)"
							options={{
								title: "Home",
								tabBarIcon: makeIcon("home", "home-active"),
							}}
						/>
						<Tabs.Screen
							name="(search)"
							options={{
								title: "Search",
								tabBarIcon: makeIcon("explore", "explore-active"),
							}}
						/>
						<Tabs.Screen
							name="(profile)"
							options={{
								title: "Profile",
								tabBarIcon: makeIcon("profile", "profile-active"),
							}}
						/>
					</Tabs>
				</GestureHandlerRootView>
			</>
		</SafeAreaView>
	)
}

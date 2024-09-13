// Learn more https://docs.expo.io/guides/customizing-metro
const { getSentryExpoConfig } = require("@sentry/react-native/metro")

/** @type {import('expo/metro-config').MetroConfig} */
const config = getSentryExpoConfig(__dirname, {
	// [Web-only]: Enables CSS support in Metro.
	isCSSEnabled: true,
})

config.resolver.sourceExts.push("svg")

config.resolver.assetExts = config.resolver.assetExts.filter((ext) => !config.resolver.sourceExts.includes(ext))

config.transformer.babelTransformerPath = require.resolve("react-native-svg-transformer")

// add nice web support with optimizing compiler + CSS extraction
const { withTamagui } = require("@tamagui/metro-plugin")
module.exports = withTamagui(config, {
	components: ["tamagui"],
	config: "./tamagui.config.ts",
	outputCSS: "./tamagui-web.css",
})

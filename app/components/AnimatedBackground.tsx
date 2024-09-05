/**
 * @fileoverview AnimatedBackground component with pastel color gradients
 * @module AnimatedBackground
 */

import { useEffect, useRef } from "react";
import { Animated, StyleSheet, type ViewStyle } from "react-native";

/**
 * Custom hook to manage the background animation
 * @returns {Animated.AnimatedInterpolation} The interpolated background color
 */
const useBackgroundAnimation = (): Animated.AnimatedInterpolation => {
	const animation = useRef(new Animated.Value(0)).current;

	useEffect(() => {
		Animated.loop(
			Animated.timing(animation, {
				toValue: 1,
				duration: 42000,
				useNativeDriver: false,
			}),
		).start();
	}, [animation]);

	return animation.interpolate({
		inputRange: [0, 0.25, 0.5, 0.75, 1],
		outputRange: [
			'rgba(138, 4, 2, 1)',
			'rgba(142, 4, 2, 1)',
			'rgba(138, 4, 2, 1)',
			'rgba(142, 4, 2, 1)',
			'rgba(138, 4, 2, 1)',
		],
	});
};

/**
 * AnimatedBackground component
 * @returns {ViewStyle} The style for the animated background
 */
export const useAnimatedBackgroundStyle = (): ViewStyle => {
	const backgroundColor = useBackgroundAnimation();

	return {
		...StyleSheet.absoluteFillObject,
		backgroundColor,
	};
};

/**
 * Styles for the AnimatedBackground
 */
export const styles = StyleSheet.create({
	background: {
		...StyleSheet.absoluteFillObject,
		zIndex: -1,
	},
});



/**
 * AnimatedBackground component
 * @returns {React.ReactElement} The rendered animated background
 */
export const AnimatedBackground: React.FC = () => {
	const animatedStyle = useAnimatedBackgroundStyle();

	return <Animated.View style={[styles.background, animatedStyle]} />;
};

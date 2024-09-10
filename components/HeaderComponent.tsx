/**
 * @fileoverview Header component for the application with vertically centered text
 * @module Header
 */

import type React from "react";
import { XStack, Text, Button } from "tamagui";

/**
 * Header component
 * @returns {React.ReactElement} The rendered header with vertically centered text
 */
export const Header: React.FC<{ onPressFaceLivenessDetector: () => void }> = ({ onPressFaceLivenessDetector }) => {
	const onPress = () => onPressFaceLivenessDetector();
	return (
		<XStack flex={1} jc="space-between" ai="center" px="$4" py="$2">
			<XStack ai="center">
				<Text>La</Text>
			</XStack>
			<XStack space="$4" ai="center">
				<Button
					onPress={onPress}
					size="$3"
					variant="outlined"
				>
					Jouer
				</Button>
				<Button
					onPress={onPress}
					size="$3"
					variant="outlined"
				>
					Jouer?
				</Button>
				<Button
					onPress={onPress}
					size="$3"
					variant="outlined"
				>
					Jouer!
				</Button>
			</XStack>
		</XStack>
	);
};

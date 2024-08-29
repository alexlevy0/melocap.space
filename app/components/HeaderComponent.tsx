/**
 * @fileoverview Header component for the application with vertically centered text
 * @module Header
 */

import type React from "react";
import { XStack, Text } from "tamagui";

/**
 * Header component
 * @returns {React.ReactElement} The rendered header with vertically centered text
 */
export const Header: React.FC = () => {
	return (
		<XStack flex={1}  jc="space-between" ai="center" px="$4" py="$2">
			<XStack ai="center">
				<Text>MeloCap</Text>
			</XStack>
			<XStack space="$4" ai="center">
				<Text>Jouez</Text>
				<Text>Jouez?</Text>
				<Text>Jouer!</Text>
			</XStack>
		</XStack>
	);
};
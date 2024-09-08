import type React from "react";
import { View, TouchableOpacity, StyleSheet } from "react-native";
import { Feather } from "@expo/vector-icons";
interface ButtonProps {
	icon: keyof typeof Feather.glyphMap;
	onPress: () => void;
}

const IconButton: React.FC<ButtonProps> = ({ icon, onPress }) => (
	<TouchableOpacity style={styles.button} onPress={onPress}>
		<Feather name={icon} size={24} color="white" />
	</TouchableOpacity>
);

export const SocialButtons: React.FC = () => {
	return (
		<View style={styles.container}>
			<IconButton
				icon="twitter"
				onPress={() => console.log("Twitter pressed")}
			/>
			<IconButton
				icon="message-circle"
				onPress={() => console.log("Discord pressed")}
			/>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flexDirection: "row",
		justifyContent: "center",
		alignItems: "center",
	},
	button: {
		width: 48,
		height: 48,
		borderRadius: 24,
		backgroundColor: "#007AFF",
		justifyContent: "center",
		alignItems: "center",
		marginHorizontal: 8,
	},
});

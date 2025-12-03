import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";

const Navbar: React.FC<{ title: string }> = ({ title }) => {
	return (
		<View style={styles.container}>
			<TouchableOpacity>
				<Ionicons name="arrow-back" size={24} color="#fff" />
			</TouchableOpacity>
			<Text style={styles.title}>{title}</Text>
			<TouchableOpacity>
				<Ionicons name="person-circle" size={24} color="#fff" />
			</TouchableOpacity>
		</View>
	);
};

export default Navbar;

const styles = StyleSheet.create({
	container: {
		position: "absolute",
		top: 30,
		left: 0,
		right: 0,
		height: 60,
		backgroundColor: "#6200EE",
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		paddingHorizontal: 20,
		elevation: 5,
		zIndex: 10,
	},
	title: {
		color: "#fff",
		fontSize: 18,
		fontWeight: "bold",
		// marginLeft: 20,
	},
});

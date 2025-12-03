import { StyleSheet, Text, View } from "react-native";
import React from "react";
import Navbar from "@/Components/Navbar";

const Login = () => {
	return (
		<View style={styles.container}>
			<Navbar title="Student Login"/>
			<Text>Login</Text>
		</View>
	);
};

export default Login;

const styles = StyleSheet.create({
	container: { flex: 1, justifyContent: "center", alignItems: "center" },
});

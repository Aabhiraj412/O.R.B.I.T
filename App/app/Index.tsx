import Navbar from "@/Components/Navbar";
import { router } from "expo-router";
import { Button, Text, View } from "react-native";

export default function Index() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Navbar title="Home"/>
      <Text>Landing Page</Text>
      <Button title="Go to Login" onPress={() => {router.push("/Students/Login")}} />
    </View>
  );
}

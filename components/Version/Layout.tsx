import { StyleSheet, SafeAreaView, StatusBar } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Ionicons } from "@expo/vector-icons";
import Market from "./Market";
import Me from "./Me";
import { LinearGradient } from "expo-linear-gradient";

const Tabs = createBottomTabNavigator();

const VersionLayout = () => {
  return (
    <Tabs.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: {
          backgroundColor: route.name === "market" ? "#0F0E15" : "transparent",
          borderTopWidth: 0,
        },
        tabBarBackground: () =>
          route.name === "me" ? (
            <LinearGradient
              start={[0, 0]}
              end={[1, 1]}
              style={{ width: "100%", height: "100%" }}
              colors={["#0fa3b1", "#b5e2fa", "#f9f7f3", "#eddea4", "#f7a072"]}
            />
          ) : null,
        tabBarIcon: ({ focused, color }) =>
          route.name === "me" ? (
            <FontAwesome name="user" size={24} color={color} />
          ) : (
            <Ionicons name="storefront-sharp" size={24} color={color} />
          ),
      })}
    >
      <Tabs.Screen name="market" component={Market} />
      <Tabs.Screen name="me" component={Me} />
    </Tabs.Navigator>
  );
};

export default VersionLayout;

const styles = StyleSheet.create({
  layout: {
    height: "100%",
    backgroundColor: "#0F0E15",
  },
});

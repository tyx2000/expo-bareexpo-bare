import {
  StyleSheet,
  Text,
  ScrollView,
  TouchableOpacity,
  useColorScheme,
  StatusBar,
} from "react-native";
import { PaperProvider, MD3DarkTheme, MD3LightTheme } from "react-native-paper";
import {
  SafeAreaProvider,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import { NavigationContainer, useNavigation } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { routes } from "./constants/routes";
import "react-native-reanimated";
import VersionLayout from "./components/Version/Layout";
import Purchase from "./components/Purchase";
import { Fragment } from "react";
import FollowLayout from "./components/Follow/FollowLayout";

const RootStack = createNativeStackNavigator();

const Menus = () => {
  const { navigate } = useNavigation();
  const insets = useSafeAreaInsets();
  return (
    <Fragment>
      <ScrollView
        contentContainerStyle={{
          ...styles.container,
          paddingBottom: insets.bottom,
          paddingLeft: insets.left,
          paddingRight: insets.right,
        }}
        showsVerticalScrollIndicator={false}
      >
        {routes.map(({ title, description, route }) => (
          <TouchableOpacity
            style={styles.button}
            key={route}
            onPress={() => navigate(route)}
          >
            <Text>{title}</Text>
            <Text>{description}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
      <StatusBar barStyle="dark-content" />
    </Fragment>
  );
};

export default function App() {
  const colorScheme = useColorScheme();

  return (
    <PaperProvider
      theme={colorScheme === "dark" ? MD3DarkTheme : MD3LightTheme}
    >
      <SafeAreaProvider>
        <NavigationContainer>
          <RootStack.Navigator
            gestureEnabled
            initialRouteName="Menus"
            options={{ headerShown: false }}
          >
            <RootStack.Screen
              name="Menus"
              component={Menus}
              options={{ title: "Menus" }}
            />
            <RootStack.Screen
              name="Version"
              component={VersionLayout}
              options={{ title: "Version", headerShown: false }}
            />
            <RootStack.Screen
              name="Follow"
              component={FollowLayout}
              options={{ title: "Follow", headerShown: false }}
            />
            <RootStack.Group screenOptions={{ presentation: "modal" }}>
              <RootStack.Screen name="Purchase" component={Purchase} />
            </RootStack.Group>
            <RootStack.Group screenOptions={{ presentation: "modal" }}>
              {routes.slice(2).map(({ title, route, component }) => (
                <RootStack.Screen
                  key={route}
                  name={route}
                  options={{
                    title,
                    headerShown: false,
                  }}
                  component={component}
                />
              ))}
            </RootStack.Group>
          </RootStack.Navigator>
        </NavigationContainer>
      </SafeAreaProvider>
    </PaperProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fafafa",
    alignItems: "center",
    justifyContent: "flex-start",
  },
  button: {
    padding: 8,
    width: "90%",
    borderBottomColor: "#c0c0c0",
    borderBottomWidth: 1,
  },
});

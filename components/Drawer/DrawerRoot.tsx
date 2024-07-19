import { createDrawerNavigator } from "@react-navigation/drawer";
import { Text } from "react-native";

const Drawer = createDrawerNavigator();

const DrawerRootRoute1 = () => <Text>DrawerRootRoute1</Text>;
const DrawerRootRoute2 = () => <Text>DrawerRootRoute2</Text>;

const DrawerRoot = () => (
  <Drawer.Navigator initialRouteName="root" screenOptions={{}}>
    <Drawer.Screen
      name="root"
      component={DrawerRootRoute1}
      options={{ title: "Drawer Menus" }}
    />
    <Drawer.Screen name="menu" component={DrawerRootRoute2} />
  </Drawer.Navigator>
);

export default DrawerRoot;

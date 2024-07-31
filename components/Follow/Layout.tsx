import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import MenuTab from "./MenuTab";
import HomeStack from "./HomeStack";
import { Fragment } from "react";

const Tabs = createBottomTabNavigator();

const Layout = ({ navigation, route }) => (
  <Fragment>
    <Tabs.Navigator tabBar={() => null} screenOptions={{ headerShown: false }}>
      <Tabs.Screen name="homeTab" component={HomeStack} />
    </Tabs.Navigator>
    <MenuTab
      routeName={route.name}
      routeTo={(path) => navigation.replace(path)}
    />
  </Fragment>
);

export default Layout;

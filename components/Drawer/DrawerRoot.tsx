import { createDrawerNavigator } from "@react-navigation/drawer";
import { Button, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createContext, useContext, useMemo, useState } from "react";

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

// const RightDrawerContext = createContext({});
//
// const HomeScreen = ({ navigation }) => {
//   const { openRightDrawer } = useContext(RightDrawerContext);
//   return (
//     <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
//       <Button
//         onPress={() => navigation.openDrawer()}
//         title="open left drawer"
//       />
//       <Button onPress={() => openRightDrawer()} title="open right drawer" />
//     </View>
//   );
// };
//
// const LeftDrawer = createDrawerNavigator();
// const RightDrawer = createDrawerNavigator();
// const LeftDrawerScreen = () => (
//   <LeftDrawer.Navigator screenOptions={{ drawerPosition: "left" }}>
//     <LeftDrawer.Screen name="Home" component={HomeScreen} />
//   </LeftDrawer.Navigator>
// );
// const RightDrawerScreen = () => {
//   const [rightDrawerOpen, setRightDrawerOpen] = useState(false);
//
//   const value = useMemo(
//     () => ({
//       openRightDrawer: () => setRightDrawerOpen(true),
//       closeRightDrawer: () => setRightDrawerOpen(false),
//     }),
//     [],
//   );
//
//   return (
//     // <RightDrawerContext.Provider value={value}>
//       <RightDrawer.Navigator screenOptions={{ drawerPosition: "right" }}>
//         <RightDrawer.Screen name="HomeDrawer" component={LeftDrawerScreen} />
//       </RightDrawer.Navigator>
//     // </RightDrawerContext.Provider>
//   );
// };
//
// const MultiDrawer = () => <RightDrawerScreen />;
//
// export default MultiDrawer;

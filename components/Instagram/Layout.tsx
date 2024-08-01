import { Button, StyleSheet, useWindowDimensions, View } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import TabBar from "./TabBar";
import Home from "./Home";
import Sear from "./Sear";
import Uplo from "./Uplo";
import Vide from "./Vide";
import Meme from "./Meme";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import ReAnimated, {
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const Tabs = createBottomTabNavigator();

const Layout = ({ route }) => {
  console.log(route);
  const routeName = route.params.screen;
  const insets = useSafeAreaInsets();
  const { width, height } = useWindowDimensions();

  const offsetX = useSharedValue(-width);
  const animatedLeftOpacity = useSharedValue(0);
  const backToHome = () => {
    offsetX.value = withTiming(-width);
  };
  const panGesture = Gesture.Pan()
    .onStart((e) => console.log("pan start"))
    .onChange((e) => {
      if (
        offsetX.value === 0 ||
        offsetX.value === -width * 2 ||
        routeName !== "HOME"
      )
        return;
      const current = offsetX.value + e.changeX;
      offsetX.value =
        current > 0 ? 0 : current < -width * 2 ? -width * 2 : current;
      animatedLeftOpacity.value = (width - Math.abs(current) + 30) / width;
    })
    .onFinalize((e) => {
      if (
        offsetX.value === 0 ||
        offsetX.value === -width * 2 ||
        routeName !== "HOME"
      )
        return;
      if (offsetX.value > -207) {
        offsetX.value = withTiming(0);
      } else if (offsetX.value < -650) {
        offsetX.value = withTiming(-width * 2);
      } else {
        offsetX.value = withTiming(-width);
      }
    });

  return (
    // <GestureDetector gesture={panGesture}>
    //   <ReAnimated.View
    //     style={[
    //       styles.container,
    //       {
    //         width: width * 3,
    //         height,
    //         transform: [{ translateX: offsetX }],
    //       },
    //     ]}
    //   >
    //     <ReAnimated.View
    //       style={{
    //         width,
    //         height,
    //         backgroundColor: "purple",
    //         paddingTop: insets.top,
    //         opacity: animatedLeftOpacity,
    //       }}
    //     >
    //       <Button title="Back" onPress={backToHome} />
    //     </ReAnimated.View>
    //     <View style={{ width, height, backgroundColor: "orange" }}>
    <Tabs.Navigator
      tabBar={({ state, navigation }) => (
        <TabBar state={state} navigation={navigation} />
      )}
      screenOptions={{ headerShown: false }}
    >
      <Tabs.Screen name="HOME" component={Home} />
      <Tabs.Screen name="SEAR" component={Sear} />
      <Tabs.Screen name="UPLO" component={Uplo} />
      <Tabs.Screen name="VIDE" component={Vide} />
      <Tabs.Screen name="MEME" component={Meme} />
    </Tabs.Navigator>
    //     </View>
    //     <View
    //       style={{
    //         width,
    //         height,
    //         backgroundColor: "pink",
    //         paddingTop: insets.top,
    //       }}
    //     >
    //       <Button title="back" onPress={backToHome} />
    //     </View>
    //   </ReAnimated.View>
    // </GestureDetector>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
    backgroundColor: "pink",
    flexDirection: "row",
    transform: [{ translateX: -100 }],
  },
});

export default Layout;

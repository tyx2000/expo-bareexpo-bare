import { useSafeAreaInsets } from "react-native-safe-area-context";
import {
  Linking,
  StyleSheet,
  View,
  Text,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { useEffect, useState } from "react";
import { LinearGradient } from "expo-linear-gradient";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
  Keyframe,
  withDelay,
  withSpring,
} from "react-native-reanimated";
import ReAnimated from "react-native-reanimated";
import { FlashList } from "@shopify/flash-list";
import MenuTab from "./MenuTab";
import * as WebBrowser from "expo-web-browser";

import {
  GestureDetector,
  Gesture,
  GestureHandlerRootView,
} from "react-native-gesture-handler";
import { LinearGradientAnimation } from "../LinearGradientAnimation";

const ReAnimatedLinearGradient =
  ReAnimated.createAnimatedComponent(LinearGradient);

const FollowLayout = ({ navigation, route }) => {
  const routeName = route.name;
  const colorIndex = [
    "#C20114",
    "#39A2AE",
    "#CBA135",
    "#23CE6B",
    "#090C02",
  ].indexOf(routeName);
  const insets = useSafeAreaInsets();
  const [dataSource, setDataSource] = useState([
    { name: "kov" },
    { name: "antFu" },
    { name: "John" },
  ]);

  const [refreshing, setRefreshing] = useState(false);

  const itemOpacity = useSharedValue(0);
  const itemOffsetY = useSharedValue(40);
  useEffect(() => {
    itemOpacity.value = withDelay(100, withTiming(1, { duration: 1000 }));
    itemOffsetY.value = withDelay(100, withTiming(0, { duration: 800 }));
  }, []);

  const renderItem = ({ item }) => {
    return (
      <TouchableOpacity onPress={() => navigation.replace("#090C02")}>
        <ReAnimated.View
          style={[
            styles.listItem,
            {
              opacity: itemOpacity,
              transform: [{ translateY: itemOffsetY }],
            },
          ]}
        >
          <Text>{item.name}</Text>
          <Text>this is a paragraph of description.</Text>
        </ReAnimated.View>
      </TouchableOpacity>
    );
  };

  const webPageLogin = async () => {
    const res = await WebBrowser.openBrowserAsync(
      "https://dev.follow.is/login",
    );
    console.log("eeeeeee", res);
    Linking.addListener("url", (e) => {
      console.log(e);
    });
  };

  const panGesture = Gesture.Pan().onChange((e) => console.log(e.changeX));

  return (
    // <GestureHandlerRootView>
    //   <GestureDetector gesture={panGesture}>
    <ReAnimatedLinearGradient
      colors={["lightyellow", routeName, "purple"]}
      start={[0, colorIndex * 0.1]}
      end={[1, 1 - colorIndex * 0.1]}
      style={[styles.container, { paddingTop: insets.top }]}
    >
      <TouchableOpacity onPress={webPageLogin}>
        <Text style={styles.title}>{routeName}</Text>
      </TouchableOpacity>
      <FlashList
        contentContainerStyle={{ paddingHorizontal: 20 }}
        data={dataSource}
        estimatedItemSize={50}
        renderItem={renderItem}
        refreshing={refreshing}
        onRefresh={() => {
          console.log("on refresh");
          setRefreshing(true);

          setTimeout(() => setRefreshing(false), 3000);
        }}
      />
      {/*<LinearGradientAnimation />*/}
    </ReAnimatedLinearGradient>
    // </GestureDetector>
    // </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
    backgroundColor: "lightyellow",
    position: "relative",
  },
  title: {
    paddingHorizontal: 20,
    paddingVertical: 20,
    fontWeight: "bold",
    fontSize: 28,
    fontStyle: "italic",
  },
  listItem: {
    width: "100%",
    paddingVertical: 20,
    paddingHorizontal: 30,
    backgroundColor: "rgba(255,255,255, 0.4)",
    marginBottom: 2,
    borderRadius: 15,
  },
});

export default FollowLayout;

import {
  Pressable,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
} from "react-native";
import ReAnimated, {
  useSharedValue,
  withSpring,
  withTiming,
} from "react-native-reanimated";
import { useEffect } from "react";

const Item = ({ current, item }) => {
  const isCurrent = current === item;
  const animatedWidth = useSharedValue(0);

  useEffect(() => {
    animatedWidth.value = isCurrent ? withSpring(20) : withTiming(0);
  }, [isCurrent]);

  return (
    <View style={styles.tabItem}>
      <Text>{item}</Text>
      <ReAnimated.View
        style={[styles.indicator, { width: animatedWidth }]}
      ></ReAnimated.View>
    </View>
  );
};

const TabBar = ({ state, navigation }) => {
  // home search upload video me
  const { width } = useWindowDimensions();
  return (
    <View style={[{ width }, styles.tabBar]}>
      {["HOME", "SEAR", "UPLO", "VIDE", "MEME"].map((d) => (
        <Pressable
          key={d}
          onPress={() => navigation.navigate("Instagram", { screen: d })}
        >
          <Item current={state.routeNames[state.index]} item={d} />
        </Pressable>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  tabBar: {
    height: 40,
    backgroundColor: "#fff",
    justifyContent: "space-evenly",
    alignItems: "center",
    flexDirection: "row",
  },
  tabItem: {
    flex: 1,
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
  },
  indicator: {
    height: 5,
    borderRadius: 10,
    backgroundColor: "purple",
    position: "absolute",
    bottom: 7,
  },
});

export default TabBar;

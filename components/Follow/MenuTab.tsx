import { Pressable, StyleSheet, useWindowDimensions, View } from "react-native";
import ReAnimated, {
  useSharedValue,
  withTiming,
  withDelay,
  withSpring,
  useAnimatedStyle,
} from "react-native-reanimated";
import { useEffect } from "react";
import { LinearGradient } from "expo-linear-gradient";

const ReAnimatedLinearGradient =
  ReAnimated.createAnimatedComponent(LinearGradient);

const menuTabs = ["#C20114", "#39A2AE", "#CBA135", "#23CE6B", "#090C02"].map(
  (d) => ({
    path: d,
    name: d,
    color: d,
  }),
);

const MenuTab = ({ routeName, routeTo }) => {
  const { width } = useWindowDimensions();

  const animatedOffsetY = useSharedValue(100);
  useEffect(() => {
    animatedOffsetY.value = withDelay(100, withTiming(0, { duration: 1000 }));
  }, []);

  return (
    <ReAnimatedLinearGradient
      colors={["lightyellow", routeName, "purple"]}
      start={[1, 1]}
      end={[0, 0]}
      style={[
        styles.container,
        {
          transform: [
            { translateX: -width * 0.4 },
            { translateY: animatedOffsetY },
          ],
        },
      ]}
    >
      {menuTabs.map((item) => (
        <Pressable key={item.path} onPress={() => routeTo(item.path)}>
          <View
            style={[styles.tabItem, { backgroundColor: item.color }]}
          ></View>
        </Pressable>
      ))}
    </ReAnimatedLinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "80%",
    position: "absolute",
    bottom: 20,
    left: "50%",
    backgroundColor: "lightyellow",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 7,
    borderRadius: 20,
    // shadowColor: "#000",
    // shadowOffset: { width: 15, height: 15 },
    // shadowOpacity: 0.8,
    // shadowRadius: 15,
  },
  tabItem: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
});

export default MenuTab;

import { Pressable, StyleSheet, useWindowDimensions, View } from "react-native";
import ReAnimated, {
  useSharedValue,
  withTiming,
  withDelay,
  withSpring,
  useAnimatedStyle,
} from "react-native-reanimated";
import { useEffect } from "react";

const menuTabs = ["#C20114", "#39A2AE", "#CBA135", "#23CE6B", "#090C02"].map(
  (d) => ({
    path: d,
    name: d,
    color: d,
  }),
);

const MenuTab = ({ routeTo }) => {
  const { width } = useWindowDimensions();

  const animatedOffsetY = useSharedValue(100);
  const animatedRotate = useSharedValue("90deg");
  useEffect(() => {
    animatedRotate.value = withDelay(
      100,
      withSpring("0deg", { duration: 1000 }),
    );
    animatedOffsetY.value = withDelay(100, withSpring(0));
  }, []);

  return (
    <ReAnimated.View
      style={[
        styles.container,
        {
          transform: [
            { translateX: -width * 0.4 },
            { translateY: animatedOffsetY },
            { rotateX: animatedRotate },
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
    </ReAnimated.View>
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
    shadowColor: "#ccc",
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.8,
  },
  tabItem: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
});

export default MenuTab;

import {
  View,
  Text,
  StyleSheet,
  useWindowDimensions,
  TouchableOpacity,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import ReAnimated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { useEffect, useState } from "react";

const INITIAL_LIST = [
  { id: 1, emoji: "🍌", color: "#b58df1" },
  { id: 2, emoji: "🍎", color: "#ffe780" },
  { id: 3, emoji: "🥛", color: "#fa7f7c" },
  { id: 4, emoji: "🍙", color: "#82cab2" },
  { id: 5, emoji: "🍇", color: "#fa7f7c" },
  { id: 6, emoji: "🍕", color: "#b58df1" },
  { id: 7, emoji: "🍔", color: "#ffe780" },
  { id: 8, emoji: "🍟", color: "#b58df1" },
  { id: 9, emoji: "🍩", color: "#82cab2" },
];

const Item = ({ item, width, height, current, setCurrent }) => {
  const sharedSize = useSharedValue({ width, height: width });

  const animatedStyle = useAnimatedStyle(() => ({
    width: sharedSize.value.width,
    height: sharedSize.value.height,
  }));

  // useEffect(() => {
  //   const isCurrent = item.id === current;
  //   sharedPosition.value = isCurrent ? "absolute" : "relative";
  //   sharedSize.value = withTiming({
  //     width: isCurrent ? width * 4 : width,
  //     height: isCurrent ? height : width,
  //   });
  // }, [current]);

  return (
    <TouchableOpacity
      key={item.id}
      onPress={() => setCurrent((c) => (item.id === c ? 0 : item.id))}
    >
      <ReAnimated.View
        style={[
          {
            backgroundColor: item.color,
            transform: [
              { translateX: width * (item.id % 4) },
              { translateY: width * Math.ceil(item.id / 4) },
            ],
          },
          styles.item,
          animatedStyle,
        ]}
      >
        <Text style={styles.contentText}>{item.emoji}</Text>
      </ReAnimated.View>
    </TouchableOpacity>
  );
};

const Home = () => {
  const insets = useSafeAreaInsets();
  const { width, height } = useWindowDimensions();
  const [current, setCurrent] = useState(0);
  return (
    <View style={[{ paddingTop: insets.top }, styles.container]}>
      {INITIAL_LIST.map((item) => (
        <Item
          item={item}
          key={item.id}
          width={width / 4}
          height={height}
          current={current}
          setCurrent={setCurrent}
        />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: "100%",
    flexDirection: "row",
    flexWrap: "wrap",
    position: "relative",
  },
  item: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    top: 0,
    left: 0,
  },
  contentText: {
    transform: [{ scale: 2 }],
  },
});

export default Home;

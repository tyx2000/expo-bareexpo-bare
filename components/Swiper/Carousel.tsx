import { useEffect, useState } from "react";
import { StyleSheet, View, Text } from "react-native";
import ReAnimated, {
  useSharedValue,
  withSpring,
  withTiming,
} from "react-native-reanimated";
import { FlashList } from "@shopify/flash-list";

const colors = [
  "#b58df1",
  "#ffe780",
  "#fa7f7c",
  "#82cab2",
  "#c8c7cd",
  "#dd2c00",
  "#497AFC",
];

const Item = ({ current, item }) => {
  const currentFlex = useSharedValue<number>(1);
  const currentBgc = useSharedValue("pink");

  const isCurrent = current === item;
  currentFlex.value = withSpring(isCurrent ? 3 : 1);
  currentBgc.value = withTiming(isCurrent ? "purple" : "pink");

  return (
    <ReAnimated.View
      key={item}
      style={[
        styles.rotate,
        { flex: currentFlex, backgroundColor: currentBgc },
      ]}
    >
      <Text>{item}</Text>
    </ReAnimated.View>
  );
};

const Carousel = () => {
  const items = [1, 2, 3, 4, 5, 6];
  const [currentIndex, setCurrentIndex] = useState(1);

  useEffect(() => {
    // setInterval(() => {
    //   setCurrentIndex((c) => (c + 1 > 6 ? 1 : c + 1));
    // }, 2000);
  }, []);

  return (
    <View style={styles.container}>
      {items.map((item) => (
        <Item key={item} item={item} current={currentIndex} />
      ))}
    </View>
  );
};

export default Carousel;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: 200,
    backgroundColor: "lightyellow",
    position: "relative",
    padding: 20,
    display: "flex",
    flexDirection: "row",
    gap: 5,
  },
  carousel: {},
  rotate: {
    backgroundColor: "pink",
    borderRadius: 20,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
});

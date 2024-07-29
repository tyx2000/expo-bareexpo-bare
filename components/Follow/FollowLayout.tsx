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
import {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
  Keyframe,
} from "react-native-reanimated";
import ReAnimated from "react-native-reanimated";
import { FlashList } from "@shopify/flash-list";
import MenuTab from "./MenuTab";

const ReAnimatedLinearGradient =
  ReAnimated.createAnimatedComponent(LinearGradient);

const FollowLayout = ({ navigation }) => {
  const insets = useSafeAreaInsets();
  const [dataSource, setDataSource] = useState([
    { name: "kov" },
    { name: "antFu" },
    { name: "John" },
  ]);
  const animatedStart = useSharedValue([0, 0]);
  const animatedEnd = useSharedValue([1, 1]);

  const animatedStyle = useAnimatedStyle(() => ({
    // start: { x: animatedStart.value[0], y: animatedStart.value[1] },
    // end: { x: animatedEnd.value[0], y: animatedEnd.value[1] },
  }));

  useEffect(() => {
    Linking.addListener("url", (e) => console.log(e));
    // setInterval(() => {
    //   const variable = Math.random();
    //   console.log("=========", variable);
    //   animatedStart.value = withTiming([0, variable], { duration: 500 });
    //   animatedEnd.value = withTiming([1 - variable, 0], { duration: 500 });
    // }, 1000);
  }, []);

  const renderItem = ({ item }) => {
    return (
      <TouchableOpacity>
        <View style={styles.listItem}>
          <Text>{item.name}</Text>
          <Text>this is a paragraph of description.</Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <ReAnimatedLinearGradient
      colors={["lightyellow", "pink", "purple"]}
      start={[0, 0.3]}
      end={[1, 0.7]}
      style={[styles.container, { paddingTop: insets.top }]}
    >
      <Text style={styles.title}>Follow</Text>
      <FlashList
        contentContainerStyle={{ paddingHorizontal: 20 }}
        data={dataSource}
        estimatedItemSize={50}
        renderItem={renderItem}
      />
      <MenuTab routeTo={(path) => navigation.navigate(path)} />
    </ReAnimatedLinearGradient>
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

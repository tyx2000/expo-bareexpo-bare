import React, { useState } from "react";
import { TouchableOpacity, View, Pressable, StyleSheet } from "react-native";
import Animated, {
  useAnimatedStyle,
  withSpring,
  withTiming,
} from "react-native-reanimated";

const cate = [
  {
    id: "recommend",
    name: "推荐",
  },
  {
    id: "charity",
    name: "公益",
  },
];

const CateItem = ({ current, self }: { current: string; self: any }) => {
  const isCurrent = current === self.id;
  const animatedBorderStyle = useAnimatedStyle(() => ({
    borderRadius: withSpring(isCurrent ? 12 : 0),
    borderColor: withTiming(isCurrent ? "#7358FE" : "transparent"),
  }));
  const animatedTextOpacity = useAnimatedStyle(() => ({
    opacity: withTiming(isCurrent ? 1 : 0.6),
  }));
  return (
    <Animated.View style={[styles.cateItem, animatedBorderStyle]}>
      <Animated.Text style={[styles.cateName, animatedTextOpacity]}>
        {self.name}
      </Animated.Text>
    </Animated.View>
  );
};

const ListCate = ({
  cateList = cate,
  defaultCate = "recommend",
  addon,
}: any) => {
  const [cateName, setCateName] = useState(defaultCate);

  return (
    <View style={styles.cateLine}>
      <View style={styles.container}>
        {cateList.map((d: any) => (
          <TouchableOpacity key={d.id} onPress={() => setCateName(d.id)}>
            <CateItem current={cateName} self={d} />
          </TouchableOpacity>
        ))}
      </View>
      {addon}
    </View>
  );
};

export default ListCate;

const styles = StyleSheet.create({
  cateLine: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    backgroundColor: "#0F0E15",
  },
  container: {
    // width: "100%",
    height: 60,
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    gap: 20,
  },
  cateItem: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderStyle: "solid",
    borderWidth: 1,
  },
  cateName: {
    color: "#fff",
  },
});

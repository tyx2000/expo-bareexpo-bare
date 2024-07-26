// 使用 modal 制作context menu

import {
  View,
  Pressable,
  Text,
  StyleSheet,
  TouchableWithoutFeedback,
  useWindowDimensions,
  TouchableOpacity,
} from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from "react-native-reanimated";
import {
  GestureHandlerRootView,
  GestureDetector,
  Gesture,
} from "react-native-gesture-handler";
import { BlurView } from "expo-blur";

const AnimatedBlurView = Animated.createAnimatedComponent(BlurView);

const ContextMenu = () => {
  const { width, height } = useWindowDimensions();

  const sharedBgc = useSharedValue("pink");
  const sharedSize = useSharedValue({ width: 70, height: 70 });
  const sharedOffset = useSharedValue({ x: 100, y: 100 });
  const animatedStyle = useAnimatedStyle(() => ({
    width: sharedSize.value.width,
    height: sharedSize.value.height,
    left: sharedOffset.value.x,
    top: sharedOffset.value.y,
    backgroundColor: sharedBgc.value,
  }));

  const onViewLayout = (e) => {
    console.log("layout====", e.nativeEvent);
  };

  const panGesture = Gesture.Pan()
    // .onStart(() => hideContextMenu())
    .onChange((e) => {
      const { changeX, changeY } = e;
      const { x: prevX, y: prevY } = sharedOffset.value;
      const currentX =
        prevX + changeX < 0
          ? 0
          : prevX + changeX > width - 70
            ? width - 70
            : prevX + changeX;
      const currentY =
        prevY + changeY < 0
          ? 0
          : prevY + changeY > height - 70
            ? height - 70
            : prevY + changeY;
      sharedOffset.value = {
        x: currentX,
        y: currentY,
      };
      console.log("offset", currentX, currentY);
    })
    .onFinalize(() => {
      // 吸附到侧边
      // const { x, y } = sharedOffset.value;
      // console.log("pan final========", x, y);
      // const [left, right] = [x + 35, width - x - 35];
      // sharedOffset.value = withTiming({
      //   x: left > right ? width - 70 : 0,
      //   y,
      // });
      //
      // 预置菜单位置
      // const { x, y } = sharedOffset.value;
      // const [centerX, centerY] = [x + 35, y + 35];
      // menuOffset.value = { left: centerX - 70, top: centerY };
    });

  const forceGesture = Gesture.ForceTouch()
    .onChange((e) => {})
    .onFinalize(() => {});

  const tabGesture = Gesture.Tap()
    .numberOfTaps(1)
    .onFinalize(() => {
      console.log("tab final");
      console.log("tabed");
      const isSmall = sharedSize.value.width === 70;
      console.log(isSmall, sharedOffset.value);
      const { x, y } = sharedOffset.value;
      sharedBgc.value = withTiming(isSmall ? "lightyellow" : "pink");
      sharedSize.value = withTiming({
        width: isSmall ? width * 0.7 : 70,
        height: isSmall ? width * 0.7 : 70,
      });
      sharedOffset.value = withTiming({
        x: isSmall ? width * 0.15 : x,
        y: isSmall ? width * 0.15 : y,
      });
    });

  const actions = [
    {
      key: "Edit",
      title: "Edit",
      icon: "edit",
      onPress: () => {
        console.log("edit");
      },
    },
    {
      key: "delete",
      title: "Delete",
      icon: "delete",
      onPress: () => {
        console.log("delete");
      },
    },
    {
      key: "Share",
      title: "Share",
      icon: "share",
      onPress: () => {
        console.log("Share");
      },
    },
    {
      key: "gap",
    },
    {
      key: "Save",
      title: "Save",
      icon: "Save",
      onPress: () => {
        console.log("Save");
      },
    },
    {
      key: "cancel",
      title: "Cancel",
      icon: "Cancel",
      onPress: () => hideContextMenu(),
    },
  ];

  const menuOpacity = useSharedValue(0);
  const menuDisplayMode = useSharedValue<"none" | "flex">("flex");
  const menuOffset = useSharedValue({
    left: 0,
    top: 0,
  });
  const menuScale = useSharedValue(0.8);
  const animatedMenu = useAnimatedStyle(() => ({
    opacity: menuOpacity.value,
    display: menuDisplayMode.value,
    left: menuOffset.value.left,
    top: menuOffset.value.top,
    transform: [{ scale: menuScale.value }],
  }));

  const longPressGesture = Gesture.LongPress().onStart((e) => {
    const { absoluteX, absoluteY, x, y } = e;
    const [centerX, centerY] = [absoluteX - x + 35, absoluteY - y + 35];
    menuOpacity.value = withTiming(0.6);
    menuDisplayMode.value = "flex";
    menuOffset.value = withTiming({ left: centerX - 70, top: centerY + 40 });
    menuScale.value = withSpring(1);
  });

  const hideContextMenu = () => {
    menuOpacity.value = withTiming(0);
    menuDisplayMode.value = "none";
    menuScale.value = withSpring(0.8);
  };

  return (
    <GestureHandlerRootView
      style={{
        height: "100%",
        position: "relative",
      }}
    >
      <GestureDetector
        gesture={Gesture.Simultaneous(
          panGesture,
          forceGesture,
          // tabGesture,
          longPressGesture,
        )}
      >
        <Animated.View
          // onLayout={onViewLayout}
          style={[styles.container, animatedStyle]}
        />
      </GestureDetector>
      <Animated.View style={[styles.contextMenu, animatedMenu]}>
        {actions.map((d) =>
          d.key === "gap" ? (
            <View style={styles.menuGap} key={d.key}></View>
          ) : (
            <TouchableOpacity key={d.key} onPress={d.onPress}>
              <View style={styles.menuItem}>
                <Text>{d.title}</Text>
              </View>
            </TouchableOpacity>
          ),
        )}
      </Animated.View>
    </GestureHandlerRootView>
  );
};

export default ContextMenu;

const styles = StyleSheet.create({
  container: {
    borderRadius: 15,
    position: "absolute",
  },
  contextMenu: {
    width: 140,
    borderRadius: 15,
    backgroundColor: "#fff",
    position: "absolute",
  },
  menuItem: {
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  menuGap: {
    height: 5,
    opacity: 0.6,
    backgroundColor: "#ccc",
  },
});

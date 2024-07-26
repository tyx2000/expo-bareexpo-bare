import { RectButton, Swipeable } from "react-native-gesture-handler";
import ReAnimated, {
  FadeOut,
  FadeOutLeft,
  LinearTransition,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { Animated, I18nManager, StyleSheet, Text, View } from "react-native";
import { useRef } from "react";

const SwipeableItem = ({ item, editItemType, onRemove }) => {
  let swipeRowRef: any = useRef<Swipeable>();
  const renderLeftActions = (
    progress: Animated.AnimatedInterpolation<number>,
    dragX: Animated.AnimatedInterpolation<number>,
  ) => {
    const trans = dragX.interpolate({
      inputRange: [0, 50, 100, 101],
      outputRange: [-20, 0, 0, 1],
      extrapolate: "clamp",
    });
    return (
      <RectButton style={styles.leftAction} onPress={() => {}}>
        <Animated.Text
          style={[
            styles.actionText,
            { transform: [{ translateX: trans }], opacity: progress },
          ]}
        >
          Archive
        </Animated.Text>
      </RectButton>
    );
  };

  const renderRightAction = (
    text: string,
    color: string,
    x: number,
    progress: Animated.AnimatedInterpolation<number>,
  ) => {
    const trans = progress.interpolate({
      inputRange: [0, 1],
      outputRange: [x, 0],
    });
    const pressHandler = () => {
      // close();
    };
    return (
      <Animated.View
        style={{
          flex: 1,
          transform: [{ translateX: trans }],
          opacity: progress,
        }}
      >
        <RectButton
          style={[styles.rightAction, { backgroundColor: color }]}
          onPress={pressHandler}
        >
          <Text style={styles.actionText}>{text}</Text>
        </RectButton>
      </Animated.View>
    );
  };

  const renderRightActions = (
    progress: Animated.AnimatedInterpolation<number>,
    _dragAnimatedValue: Animated.AnimatedInterpolation<number>,
  ) => (
    <View
      style={{
        width: 192,
        flexDirection: I18nManager.isRTL ? "row-reverse" : "row",
      }}
    >
      {renderRightAction("edit", "#c8c7cd", 192, progress)}
      {renderRightAction("done", "#c8c7cd", 128, progress)}
      {renderRightAction("delete", "#dd2c00", 64, progress)}
    </View>
  );

  const contentWidth = useSharedValue<string | number>("100%");
  const contentHeight = useSharedValue(60);

  return (
    <Swipeable
      containerStyle={{ borderRadius: 10, overflow: "hidden" }}
      ref={(ref: Swipeable) => (swipeRowRef.current = ref)}
      enableTrackpadTwoFingerGesture
      leftThreshold={200}
      rightThreshold={40}
      overshootFriction={8}
      renderLeftActions={renderLeftActions}
      renderRightActions={renderRightActions}
      onSwipeableWillOpen={(direction) => {
        if (direction === "left") {
          contentHeight.value = withTiming(0, { duration: 500 });
          setTimeout(() => onRemove(item.key), 500);
        }
      }}
    >
      <ReAnimated.View style={[styles.swipeContent, { height: contentHeight }]}>
        <Text numberOfLines={2} ellipsizeMode="tail">
          {item.label}
        </Text>
      </ReAnimated.View>
    </Swipeable>
  );
};

export default SwipeableItem;

const styles = StyleSheet.create({
  leftAction: {
    flex: 1,
    backgroundColor: "#497AFC",
    justifyContent: "center",
  },
  actionText: {
    color: "white",
    fontSize: 16,
    backgroundColor: "transparent",
    padding: 10,
  },
  rightAction: {
    alignItems: "center",
    flex: 1,
    justifyContent: "center",
  },
  swipeContent: {
    // height: 60,
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    paddingHorizontal: 20,
    backgroundColor: "#82cab2",
  },
});

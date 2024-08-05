import { View, Text, StyleSheet, Animated } from "react-native";
import { RectButton, Swipeable } from "react-native-gesture-handler";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import ReAnimated, { useSharedValue } from "react-native-reanimated";
import { useRef } from "react";

const RightAction = ({
  text,
  color,
  x,
  progress,
}: {
  text: string;
  color: string;
  x: number;
  progress: Animated.AnimatedInterpolation<number>;
}) => {
  const trans = progress.interpolate({
    inputRange: [0, 1],
    outputRange: [x, 0],
  });

  const onSelect = (selected) => {
    const isSelected = selected === text;
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
        onPress={() => {
          onSelect(text);
        }}
      >
        <Text style={{}}>{text}</Text>
      </RectButton>
    </Animated.View>
  );
};

const Home = () => {
  const insets = useSafeAreaInsets();

  const renderLeftActions = () => {
    return (
      <View style={styles.leftAction}>
        <Text>left Actions</Text>
      </View>
    );
  };

  // 嵌套swipeable
  // const renderRightActions = () => {
  //   return (
  //     <View style={styles.rightAction}>
  //       <Text>Right actions</Text>
  //       <Swipeable
  //         enableTrackpadTwoFingerGesture
  //         leftThreshold={50}
  //         rightThreshold={50}
  //         overshootFriction={8}
  //         renderLeftActions={() => (
  //           <Text style={{ width: 100 }}>inner left</Text>
  //         )}
  //         renderRightActions={() => (
  //           <Text style={{ width: 100 }}>innerRight</Text>
  //         )}
  //       >
  //         <Text
  //           style={{ width: "100%", height: 100, backgroundColor: "purple" }}
  //         >
  //           right inner
  //         </Text>
  //       </Swipeable>
  //     </View>
  //   );
  // };

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
          onPress={() => {
            console.log(text);
          }}
        >
          <Text style={{}}>{text}</Text>
        </RectButton>
      </Animated.View>
    );
  };

  const renderRightActions = (
    progress: Animated.AnimatedInterpolation<number>,
    _dragAnimatedValue: Animated.AnimatedInterpolation<number>,
  ) => {
    return (
      <View
        style={{
          width: 210,
          // height: "100%",
          flexDirection: "row",
          backgroundColor: "#fff",
        }}
      >
        {[
          { text: "edit", color: "#c8c7cd", x: 210 },
          { text: "done", color: "#82cab2", x: 140 },
          { text: "delete", color: "#dd2c00", x: 70 },
        ].map(({ text, color, x }) => (
          <RightAction text={text} color={color} progress={progress} x={x} />
        ))}
        {/*{renderRightAction("edit", "#c8c7cd", 210, progress)}*/}
        {/*{renderRightAction("done", "#82cab2", 140, progress)}*/}
        {/*{renderRightAction("delete", "#dd2c00", 70, progress)}*/}
      </View>
    );
  };

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <Swipeable
        enableTrackpadTwoFingerGesture
        leftThreshold={100}
        rightThreshold={100}
        overshootFriction={8}
        renderLeftActions={renderLeftActions}
        renderRightActions={renderRightActions}
      >
        <View style={styles.content}>
          <Text style={styles.contentText}>Content</Text>
        </View>
      </Swipeable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: "100%",
    backgroundColor: "lightyellow",
  },
  content: {
    height: 70,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#82cab2",
  },
  contentText: {
    fontWeight: "bold",
    fontSize: 30,
    fontStyle: "italic",
    color: "purple",
  },
  leftAction: {
    width: "100%",
    backgroundColor: "red",
  },
  rightAction: {
    width: "100%",
    flex: 1,
    backgroundColor: "green",
    justifyContent: "center",
    alignItems: "center",
  },
});

export default Home;

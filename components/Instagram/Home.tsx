import {
  StyleSheet,
  Text,
  TouchableOpacity,
  useWindowDimensions,
  View,
  Image,
  ScrollView,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import ReAnimated, {
  BounceIn,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
  ZoomIn,
  RollInRight,
  FlipInEasyX,
  StretchInX,
  BounceOut,
  withSpring,
} from "react-native-reanimated";
import { useEffect, useState } from "react";

import * as ImagePicker from "expo-image-picker";
import { manipulateAsync, SaveFormat } from "expo-image-manipulator";

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

const Item = ({
  index,
  current,
  uri,
  width,
  height,
  itemOffsets,
  pressToMove,
}) => {
  const { width: deviceWidth } = useWindowDimensions();
  const opacity = useSharedValue(1);
  const offset = useSharedValue({ x: 0, y: 0 });

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: withTiming(current === index ? 0 : 1, { duration: 1000 }),
    // @ts-ignore
    transform: [{ translateX: offset.value.x }, { translateY: offset.value.y }],
  }));

  useEffect(() => {
    Object.keys(itemOffsets).forEach((key) => {
      const value = itemOffsets[key];
      offset.value = withTiming({
        x: index + "" === key ? value.x : 0,
        y: index + "" === key ? value.y : 0,
      });
    });
  }, [JSON.stringify(itemOffsets)]);

  return (
    <TouchableOpacity
      style={{
        transform: [
          { translateX: itemOffsets[index]?.x || 0 },
          { translateY: itemOffsets[index]?.y || 0 },
        ],
      }}
      key={uri + index}
      onPress={() => pressToMove(index)}
    >
      <View style={{ width, height, padding: 2 }}>
        <ReAnimated.Image
          source={{ uri }}
          entering={BounceIn}
          exiting={BounceOut}
          style={[
            {
              // width,
              // height,
              width: "100%",
              height: "100%",
              borderRadius: 10,
            },
            // @ts-ignore
            animatedStyle,
          ]}
        />
      </View>
    </TouchableOpacity>
  );
};

const Home = () => {
  const insets = useSafeAreaInsets();
  const { width, height } = useWindowDimensions();

  const [clippedImageArray, setClippedImageArray] = useState([]);
  const [renderSize, setRenderSize] = useState({ width: 0, height: 0 });
  const [itemOffsets, setItemOffsets] = useState({});

  const pickImage = () =>
    ImagePicker.launchImageLibraryAsync().then((state) => {
      if (!state.canceled) {
        const {
          width: originWidth,
          height: originHeight,
          uri,
        } = state.assets[0];
        const clipWidth = Math.floor(originWidth / 4),
          clipHeight = Math.floor(originHeight / 4);
        const renderWidth = Math.floor(width / 4),
          renderHeight = Math.floor((clipHeight / clipWidth) * renderWidth);

        setRenderSize({ width: renderWidth, height: renderHeight });

        const clipPromises = [];
        for (let i = 0; i < 4; i++) {
          for (let j = 0; j < 4; j++) {
            clipPromises.push(
              manipulateAsync(
                uri,
                [
                  {
                    crop: {
                      originX: j * clipWidth,
                      originY: i * clipHeight,
                      width: clipWidth,
                      height: clipHeight,
                    },
                  },
                ],
                {
                  compress: 1,
                  format: SaveFormat.PNG,
                },
              ),
            );
          }
        }
        Promise.all(clipPromises).then((res) => {
          const opacityIndex = Math.floor(Math.random() * 15);
          setCurrent(opacityIndex);
          setNewCurrent(opacityIndex);
          setClippedImageArray(
            res.map((item) => ({
              uri: item.uri,
              width: renderWidth,
              height: renderHeight,
            })),
          );
        });
      }
    });

  const [current, setCurrent] = useState<number>();
  const [newCurrent, setNewCurrent] = useState<number>();

  const pressToMove = (index: number) => {
    // 要添加边界验证
    const moveableIndex = [
      newCurrent - 4,
      newCurrent + 4,
      newCurrent % 4 === 0 ? -1 : newCurrent - 1,
      newCurrent % 4 === 3 ? -1 : newCurrent + 1,
    ];
    // 0 下移 1 上移 2 右移 3 左移
    const moveDirection = moveableIndex.indexOf(index);
    console.log(
      "点击目标索引",
      index,
      "移动方向",
      moveDirection,
      "可移动索引",
      moveableIndex,
      "当前空白索引",
      newCurrent,
      "各项偏移",
      itemOffsets,
    );
    const offset = [
        { x: 0, y: renderSize.height },
        { x: 0, y: -renderSize.height },
        { x: renderSize.width, y: 0 },
        { x: -renderSize.width, y: 0 },
      ],
      currentMove = { 0: 1, 1: 0, 2: 3, 3: 2 };
    if (moveDirection > -1) {
      const [prevIndex = {}, prevNewCurrent = {}] = [
        itemOffsets[index],
        itemOffsets[newCurrent],
      ];
      const { x: nextIndexOffsetX, y: nextIndexOffsetY } =
        offset[moveDirection];
      const { x: nextNewCurrentOffsetX, y: nextNewCurrentOffsetY } =
        offset[currentMove[moveDirection]];
      const [nextIndex, nextNewCurrent] = [
        {
          x: (prevIndex.x || 0) + nextIndexOffsetX,
          y: (prevIndex.y || 0) + nextIndexOffsetY,
        },
        {
          x: (prevNewCurrent.x || 0) + nextNewCurrentOffsetX,
          y: (prevNewCurrent.y || 0) + nextNewCurrentOffsetY,
        },
      ];
      console.log(nextIndex, nextNewCurrent);
      // current应该怎么变化, 是否需要交换索引
      setNewCurrent(index);
      setItemOffsets((c) => ({
        ...c,
        [index]: nextIndex,
        [newCurrent]: nextNewCurrent,
      }));
    }
    // if (moveDirection > -1) {
    //   const offset = [
    //     { x: 0, y: renderSize.height },
    //     { x: 0, y: -renderSize.height },
    //     { x: renderSize.width, y: 0 },
    //     { x: -renderSize.width, y: 0 },
    //   ];
    //   const currentMove = { 0: 1, 1: 0, 2: 3, 3: 2 };
    //   setNewCurrent(index);
    //   setItemOffsets((c) => ({
    //     ...c,
    //     [index]: offset[moveDirection],
    //     [newCurrent]: offset[currentMove[moveDirection]],
    //   }));
    // }
  };

  return (
    <ScrollView
      contentContainerStyle={[{ paddingTop: insets.top }, styles.container]}
    >
      <View style={styles.images}>
        {clippedImageArray.length ? (
          clippedImageArray.map(({ width, height, uri }, index) => (
            <Item
              {...{
                uri,
                width,
                height,
                index,
                current,
                itemOffsets,
                pressToMove,
              }}
            />
          ))
        ) : (
          <View
            style={{ width: 100, height: 100, backgroundColor: "purple" }}
          ></View>
        )}
      </View>

      <View style={styles.buttons}>
        <TouchableOpacity onPress={pickImage}>
          <View style={styles.pickImageButton}>
            <Text style={styles.pickImageText}>PICK IMAGE</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() =>
            setClippedImageArray((c) => {
              console.log(c.reverse());
              return c.reverse();
            })
          }
        >
          <View style={styles.pickImageButton}>
            <Text style={styles.pickImageText}>RANDOM</Text>
          </View>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    height: "100%",
  },
  images: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "flex-start",
    backgroundColor: "pink",
    position: "relative",
    // gap: 5,
    // transform: [{ translateX: -207 }],
  },
  buttons: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-evenly",
    position: "absolute",
    bottom: 0,
  },
  pickImageButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 6,
    backgroundColor: "lightyellow",
    shadowColor: "#ccc",
    shadowOffset: { width: -2, height: 2 },
    shadowOpacity: 1,
    shadowRadius: 10,
    marginVertical: 20,
  },
  pickImageText: {
    fontWeight: "bold",
    fontStyle: "italic",
    fontSize: 20,
    color: "purple",
  },
  item: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  contentText: {
    transform: [{ scale: 2 }],
  },
});

export default Home;

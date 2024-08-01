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
  useAnimatedStyle,
  useSharedValue,
  withTiming,
  ZoomIn,
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

const Item = ({ item, width, height, current, setCurrent, index }) => {
  const sharedSize = useSharedValue({ width, height: width });

  const animatedStyle = useAnimatedStyle(() => ({
    width: sharedSize.value.width,
    height: sharedSize.value.height,
  }));

  useEffect(() => {
    const isCurrent = item.id === current;
    sharedSize.value = withTiming({
      width: isCurrent ? width * 3 : width,
      height: isCurrent ? height : width,
    });
  }, [current]);

  return (
    <TouchableOpacity
      onPress={() => setCurrent((c) => (item.id === c ? -1 : item.id))}
    >
      <ReAnimated.View
        entering={ZoomIn}
        style={[
          {
            backgroundColor: item.color,
            // transform: [
            //   { translateX: width * (index % 3) },
            //   { translateY: width * Math.floor(index / 3) },
            // ],
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

  const [clippedImageArray, setClippedImageArray] = useState([]);

  const pickImage = () =>
    ImagePicker.launchImageLibraryAsync().then((state) => {
      if (!state.canceled) {
        const {
          width: originWidth,
          height: originHeight,
          uri,
        } = state.assets[0];
        const clipWidth = originWidth / 4,
          clipHeight = originHeight / 7;
        for (let i = 0; i < 4; i++) {
          for (let j = 0; j < 7; j++) {
            manipulateAsync(
              uri,
              [
                {
                  crop: {
                    originX: i * clipWidth,
                    originY: j * clipHeight,
                    width: clipWidth,
                    height: clipHeight,
                  },
                },
              ],
              {
                compress: 1,
                format: SaveFormat.PNG,
              },
            ).then((res) =>
              setClippedImageArray((c) => [
                ...c,
                {
                  i,
                  j,
                  uri: res.uri,
                  width: width / 4,
                  height: (res.height / res.width) * (width / 4),
                },
              ]),
            );
          }
        }
      }
    });

  const mixImages = () => {
    const temp = clippedImageArray;
    let index = 0;
    for (let i = 3; i > -1; i--) {
      for (let j = 6; j > -1; j--) {
        console.log(i, j);
        temp[index] = { ...temp[0], i, j };
        index++;
      }
    }
    // setClippedImageArray(temp);
  };

  return (
    <ScrollView
      contentContainerStyle={[{ paddingTop: insets.top }, styles.container]}
    >
      <View style={styles.images}>
        {clippedImageArray.length ? (
          clippedImageArray.map(({ width, height, uri, i, j }) => (
            <ReAnimated.Image
              key={`${i}-${j}`}
              source={{ uri }}
              entering={ZoomIn}
              style={{
                width,
                height,
                position: "absolute",
                top: j * height,
                left: i * width,
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
        <TouchableOpacity onPress={mixImages}>
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

import {
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Modal,
  Pressable,
  Button,
  useWindowDimensions,
} from "react-native";
// import { showPopupMenu } from "expo-modules-core";
import { Image } from "expo-image";
import { useEffect, useRef, useState } from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from "react-native-reanimated";
import { LinearGradient } from "expo-linear-gradient";
import * as FileSystem from "expo-file-system";
import MaskedText from "../MaskedView/MaskedText";
import ContextMenu from "../ContextMenu";

import * as Notifications from "expo-notifications";
import * as Sharing from "expo-sharing";
import * as ImagePicker from "expo-image-picker";
import * as SMS from "expo-sms";
import * as WebBrowser from "expo-web-browser";
import VideoPlayer from "../VideoPlayer";
import * as MediaLibrary from "expo-media-library";
import * as DocumentPicker from "expo-document-picker";
import * as VideoThumbnails from "expo-video-thumbnails";
import {
  GestureHandlerRootView,
  Gesture,
  GestureDetector,
} from "react-native-gesture-handler";
import { Audio } from "expo-av";

import LayoutTransition from "../LayoutTransition";
import TodoList from "../Swiper/TodoList";
import Carousel from "../Swiper/Carousel";

const AnimatedImage = Animated.createAnimatedComponent(Image);

const colors = ["#0fa3b1", "#b5e2fa", "#f9f7f3", "#eddea4", "#f7a072"];

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
  }),
});

Notifications.scheduleNotificationAsync({
  content: {
    title: "Look at that notification",
    body: "Look at that notification",
  },
  trigger: null,
});

const Me = () => {
  const pickerRef = useRef();
  const [selectedLanguage, setSelectedLanguage] = useState<string>("js");
  const [demoURL, setDemoUrl] = useState(
    require("../../assets/images/productImageDemo.png"),
  );

  const insets = useSafeAreaInsets();

  const sharedBorderRadius = useSharedValue(15);
  const sharedScale = useSharedValue(1);
  const animatedStyle = useAnimatedStyle(() => ({
    borderRadius: sharedBorderRadius.value,
    transform: [{ scale: sharedScale.value }],
  }));

  const onScroll = (e) => {
    const {
      contentOffset: { y },
    } = e.nativeEvent;
    if (y < 120 && y > 0) {
      sharedBorderRadius.value = withTiming(y / 2 > 15 ? y / 2 : 15, {
        duration: 10,
      });
      sharedScale.value = withTiming(1 + (y / 4) * 0.01, {
        duration: 10,
      });
    } else {
      sharedScale.value = withTiming(1);
    }
  };

  useEffect(() => {
    // Speech.getAvailableVoicesAsync().then((voices) => {
    //   console.log(voices);
    //   setAvailableVoices(voices);
    // });
  }, []);

  const selectImageToShare = () => {
    ImagePicker.launchImageLibraryAsync().then((state) => {
      console.log(state);
      if (!state.canceled) {
        const url = state.assets[0].uri;
        Sharing.isAvailableAsync().then((isAvailable) => {
          if (isAvailable) {
            Sharing.shareAsync(url).then((shareState) => {
              console.log("shareState", shareState);
            });
          }
        });
      }
    });
  };

  const sendSMS = () => {
    SMS.isAvailableAsync().then((isAvailable) => {
      if (isAvailable) {
        ImagePicker.launchImageLibraryAsync().then((state) => {
          console.log(state);
          if (!state.canceled) {
            const { fileName: filename, mimeType, uri } = state.assets[0];
            SMS.sendSMSAsync(["17717806954"], "a cat meme", {
              attachments: {
                uri,
                filename,
                mimeType,
              },
            }).then((sendState) => console.log("sendState", sendState));
          }
        });
      }
    });
  };

  const [availableVoices, setAvailableVoices] = useState([]);

  const [videoUrl, setVideoUrl] = useState(null);
  const [permissionResponse, requestPermission] = MediaLibrary.usePermissions();
  const selectVideo = async () => {
    // if (permissionResponse.status !== "granted") {
    //   await requestPermission();
    // }
    // const fetchedAlbums = await MediaLibrary.getAssetsAsync({
    //   mediaType: "video",
    // });
    // console.log(fetchedAlbums);
    ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Videos,
    }).then((state) => {
      console.log(state);
      if (!state.canceled) {
        const videoLink = state.assets[0].uri;
        setVideoUrl(videoLink);
        VideoThumbnails.getThumbnailAsync(videoUrl, { time: 15000 }).then(
          (state) => {
            console.log(state);
            setDemoUrl(state.uri);
            MediaLibrary.saveToLibraryAsync(state.uri).then((res) => {
              console.log("saveStatus", res);
            });
          },
        );
      }
    });
  };

  const pickerAnyFile = () => {
    DocumentPicker.getDocumentAsync().then((state) => {
      console.log(state);
      if (!state.canceled) {
        Audio.Sound.createAsync({ uri: state.assets[0].uri }).then(
          (soundRes) => {
            console.log(soundRes);
            if (soundRes.sound) {
              soundRes.sound.playAsync();
            }
          },
        );
      }
    });
  };

  const openInWebBrowser = () => {
    WebBrowser.openBrowserAsync("https://www.google.com").then((state) =>
      console.log(state),
    );
  };

  const someComp = () => {
    // Alert.alert("确认删除？", "确认删除这条数据", [
    //   {
    //     text: "ask me later",
    //   },
    //   { text: "cancel" },
    //   // { text: "ok" },
    // ]);
    // Share.share({ message: "hello" }).then((state) => {
    //   console.log(state);
    // });
    // Vibration.vibrate([1000, 2000, 3000]);
    // Toast.show("a toast", {
    //   animation: true,
    // });
    // setShowModal(true);
  };

  const forceGesture = Gesture.ForceTouch().onChange((e) => {
    console.log(e.force > 0.4);
    // console.log({ force: e.force, forceChange: e.forceChange });
  });

  const [showModal, setShowModal] = useState(false);

  const onViewLayout = (e) => {
    console.log(e.nativeEvent);
  };

  return (
    <GestureHandlerRootView>
      <LinearGradient
        start={[0, 0]}
        end={[1, 0]}
        colors={colors}
        style={styles.container}
      >
        <ScrollView
          onScroll={onScroll}
          contentContainerStyle={styles.scrollView}
          stickyHeaderIndices={[0]}
        >
          <GestureDetector gesture={forceGesture}>
            <Animated.View style={[styles.imageContainer]}>
              <TouchableOpacity onPress={pickerAnyFile} onLongPress={someComp}>
                <AnimatedImage
                  source={demoURL}
                  contentFit="contain"
                  contentPosition="center"
                  alt="avatar"
                  style={[styles.avatar, animatedStyle]}
                />
              </TouchableOpacity>
            </Animated.View>
          </GestureDetector>
          {/*<TodoList />*/}

          {/*<Carousel />*/}
          <Text>{FileSystem.documentDirectory}</Text>

          {/*<VideoPlayer videoLink={videoUrl} offsetY={offsetY} />*/}

          <MaskedText />

          <View style={styles.extra}>
            {new Array(15).fill(0).map((_, i) => (
              <View
                key={i}
                style={[
                  styles.extraItem,
                  {
                    width: (i > 7 ? 14 - i : i + 1) * 3,
                    opacity: (i > 7 ? 14 - i : i + 1) * 0.15,
                    backgroundColor: colors.toReversed()[i % 4],
                  },
                ]}
              ></View>
            ))}
          </View>
        </ScrollView>

        <StatusBar hidden />
      </LinearGradient>
    </GestureHandlerRootView>
  );
};

export default Me;

const styles = StyleSheet.create({
  container: {
    height: "100%",
    position: "relative",
    // backgroundColor: "#0F0E15",
  },
  scrollView: {
    gap: 20,
    // height: "100%",
    paddingTop: 120,
    justifyContent: "flex-start",
    alignItems: "center",
    // backgroundColor: "lightyellow",
  },

  imageContainer: {
    height: 120,
  },

  avatar: {
    width: 120,
    height: 120,
  },

  extra: {
    width: 250,
    height: 1500,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  extraItem: {
    width: 10,
    backgroundColor: "pink",
  },
});

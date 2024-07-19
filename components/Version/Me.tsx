import {
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Image } from "expo-image";
import { useEffect, useRef, useState } from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { LinearGradient } from "expo-linear-gradient";
import * as FileSystem from "expo-file-system";
import MaskedText from "../MaskedView/MaskedText";

import * as Notifications from "expo-notifications";
import * as Sharing from "expo-sharing";
import * as ImagePicker from "expo-image-picker";
import * as SMS from "expo-sms";
import * as WebBrowser from "expo-web-browser";
import VideoPlayer from "../VideoPlayer";
import * as MediaLibrary from "expo-media-library";

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
    console.log(permissionResponse);
    if (permissionResponse.status !== "granted") {
      await requestPermission();
    }
    const fetchedAlbums = await MediaLibrary.getAlbumsAsync({
      includeSmartAlbums: true,
    });
    console.log(fetchedAlbums);
  };

  const openInWebBrowser = () => {
    WebBrowser.openBrowserAsync("https://www.google.com").then((state) =>
      console.log(state),
    );
  };

  return (
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
        <View style={styles.imageContainer}>
          <TouchableOpacity onPress={selectVideo}>
            <AnimatedImage
              source={demoURL}
              contentFit="contain"
              contentPosition="center"
              alt="avatar"
              style={[styles.avatar, animatedStyle]}
            />
          </TouchableOpacity>
        </View>
        <Text>{FileSystem.documentDirectory}</Text>

        <VideoPlayer />

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
  );
};

export default Me;

const styles = StyleSheet.create({
  container: {
    height: "100%",
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

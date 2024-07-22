import { useVideoPlayer, VideoView } from "expo-video";
import { useEffect, useRef, useState } from "react";
import { StyleSheet, View, Button } from "react-native";
import WebView from "react-native-webview";

const videoSource =
  "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4";

const remoteVideo =
  "https://www.bilibili.com/video/BV1Lf421S719/?share_source=copy_web&vd_source=1a52f069510b3836ab821a4c08c76a42";

export default function VideoScreen({ videoLink, offsetY }) {
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const player = useVideoPlayer(videoSource, (player) => {
    player.loop = false;
    // player.
    player.play();
  });

  useEffect(() => {
    const subscription = player.addListener("playingChange", (isPlaying) => {
      setIsPlaying(isPlaying);
    });

    return () => {
      subscription.remove();
    };
  }, [player]);

  useEffect(() => {
    if (videoLink) {
      player.replace(videoLink);
    }
  }, [videoLink]);

  return (
    <View style={styles.contentContainer}>
      {/*<WebView*/}
      {/*  style={{ width: 400, height: 400 }}*/}
      {/*  source={{*/}
      {/*    // html:*/}
      {/*    //   "" +*/}
      {/*    //   "<html>" +*/}
      {/*    //   "<body>" +*/}
      {/*    //   '<div style="position: relative;width: 100%;height: 100%; background-color: pink">' +*/}
      {/*    //   '<iframe width="100%" height="100%" src="//player.bilibili.com/player.html?isOutside=true&aid=1203814691&bvid=BV1Lf421S719&cid=1559049743&p=1" scrolling="no" border="0" frameborder="no" framespacing="0" allowfullscreen="true">' +*/}
      {/*    //   "</iframe>" +*/}
      {/*    //   "</div>" +*/}
      {/*    //   "</body>" +*/}
      {/*    //   "</html>",*/}
      {/*    // uri: "https://youtu.be/dsZunsPjxPI?si=6izNJhTh8tN7yCTl",*/}
      {/*    // uri: "https://www.bilibili.com/video/BV1Lf421S719/?spm_id_from=333.1007.top_right_bar_window_custom_collection.content.click&vd_source=f118cc302b066fbf8f00e1901ccb9d18",*/}
      {/*    uri: "https://player.bilibili.com/player.html?isOutside=true&aid=1203814691&bvid=BV1Lf421S719&cid=1559049743&p=1",*/}
      {/*  }}*/}
      {/*/>*/}
      <VideoView
        ref={videoRef}
        style={styles.video}
        player={player}
        allowsFullscreen
        allowsPictureInPicture
        showsTimecodes
        startsPictureInPictureAutomatically
      />
      <View style={styles.controlsContainer}>
        <Button
          title={isPlaying ? "Pause" : "Play"}
          onPress={() => {
            if (isPlaying) {
              player.pause();
            } else {
              player.play();
            }
            setIsPlaying(!isPlaying);
          }}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
    padding: 10,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 50,
  },
  video: {
    width: 350,
    height: 275,
  },
  controlsContainer: {
    padding: 10,
  },
});

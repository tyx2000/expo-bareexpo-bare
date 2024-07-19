import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  useWindowDimensions,
} from "react-native";
import PagerView from "react-native-pager-view";

const Swiper = () => {
  const dimension = useWindowDimensions();
  const [demoUrl] = useState(require("../../assets/images/sliderDemo.png"));

  const height = (dimension.width - 40) * (120 / 335);
  return (
    <View style={styles.container}>
      <PagerView style={styles.container} initialPage={0}>
        <View style={styles.page} key="1">
          <Image
            source={demoUrl}
            style={{
              width: "100%",
              height: "100%",
            }}
          />
        </View>
        <View style={styles.page} key="2">
          <Text>Second page</Text>
        </View>
        <View style={styles.page} key="3">
          <Text>Third page</Text>
        </View>
      </PagerView>
    </View>
  );
};

export default Swiper;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: 133,
    paddingHorizontal: 20,
  },
  page: {
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
  },
});

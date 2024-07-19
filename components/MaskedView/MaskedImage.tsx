import React from "react";
import { Image, StyleSheet } from "react-native";

import MaskedViewWrapper from "./MaskedViewWrapper";

const MaskedViewImageExample = () => (
  <MaskedViewWrapper>
    <Image
      resizeMode="cover"
      source={{ uri: "https://picsum.photos/100" }}
      style={styles.image}
    />
  </MaskedViewWrapper>
);

const styles = StyleSheet.create({
  image: {
    flex: 1,
  },
});

export default MaskedViewImageExample;

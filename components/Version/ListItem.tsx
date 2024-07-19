import React, { useState } from "react";
import { View, Image, Pressable, StyleSheet } from "react-native";

const ListItem = ({ item, itemPressFn }: any) => {
  const [demoURL] = useState(
    require("../../assets/images/productImageDemo.png"),
  );

  return (
    <Pressable onPress={() => itemPressFn(item.id)}>
      <View style={styles.container}>
        <Image source={demoURL} style={{ borderRadius: 20 }} />
      </View>
    </Pressable>
  );
};

export default ListItem;

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
    marginHorizontal: 20,
    borderRadius: 10,
    overflow: "hidden",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
});

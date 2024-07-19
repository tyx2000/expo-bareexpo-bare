import React, { useState } from "react";
import { StyleSheet, View, Image, TextInput } from "react-native";

const Header = () => {
  const [homeLogo] = useState(require("../../assets/images/HeaderLogo.png"));
  const [searchIcon] = useState(require("../../assets/images/searchIcon.png"));
  const [noticeBell] = useState(require("../../assets/images/noticeBell.png"));
  return (
    <View style={styles.header}>
      <Image source={homeLogo} style={styles.homeLogo} />
      <View style={styles.textInputContainer}>
        <TextInput
          style={styles.input}
          placeholder="可能的关键词"
          placeholderTextColor="rgba(255, 255, 255, 0.6)"
        />
        <Image source={searchIcon} style={styles.searchIcon} />
      </View>
      <Image source={noticeBell} style={styles.noticeBell} />
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  header: {
    width: "100%",
    height: 44,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 7,
    gap: 10,
    position: "relative",
  },
  homeLogo: {
    width: 51,
    height: 29,
  },
  searchIcon: {
    width: 24,
    height: 24,
  },
  noticeBell: {
    width: 24,
    height: 24,
  },
  textInputContainer: {
    flex: 1,
    height: 30,
    backgroundColor: "#322C39",
    paddingHorizontal: 9,
    paddingVertical: 3,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  input: {
    flex: 1,
  },
});

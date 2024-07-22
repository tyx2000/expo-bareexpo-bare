import { StatusBar, StyleSheet, SafeAreaView, View } from "react-native";
import Header from "./Header";
import List from "./List";
import ListCate from "./ListCate";
import {
  GestureHandlerRootView,
  Gesture,
  GestureDetector,
} from "react-native-gesture-handler";

const Market = ({ navigation }) => {
  const swipeGesture = Gesture.Pan().onChange((e) => {
    // console.log(e);
  });

  return (
    <SafeAreaView style={styles.container}>
      <GestureHandlerRootView>
        <GestureDetector gesture={swipeGesture}>
          <View style={{ height: "100%" }}>
            <Header />
            <ListCate />
            <List
              itemPressFn={(id) => navigation.navigate("Purchase", { id })}
            />
          </View>
        </GestureDetector>
      </GestureHandlerRootView>
      <StatusBar barStyle="light-content" />
    </SafeAreaView>
  );
};

export default Market;

const styles = StyleSheet.create({
  container: {
    height: "100%",
    backgroundColor: "#0F0E15",
  },
});

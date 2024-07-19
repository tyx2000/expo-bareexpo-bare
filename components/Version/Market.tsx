import { StatusBar, StyleSheet, SafeAreaView } from "react-native";
import Header from "./Header";
import List from "./List";
import ListCate from "./ListCate";

const Market = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.container}>
      <Header />
      <ListCate />
      <List itemPressFn={(id) => navigation.navigate("Purchase", { id })} />
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

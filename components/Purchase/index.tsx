import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

const Purchase = ({ route }) => {
  const { id } = route.params || {};
  return (
    <View style={styles.container}>
      <Text>{id} 号商品</Text>
      <LinearGradient colors={["#5F29F5", "#5D27F3"]} style={styles.button}>
        <TouchableOpacity>
          <Text style={styles.text}>立即购买</Text>
        </TouchableOpacity>
      </LinearGradient>
    </View>
  );
};

export default Purchase;

const styles = StyleSheet.create({
  container: {
    gap: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    width: 150,
    height: 60,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
  },
  text: {
    fontWeight: "bold",
    fontSize: 20,
    color: "#fff",
  },
});

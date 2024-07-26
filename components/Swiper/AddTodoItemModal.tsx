import {
  View,
  Text,
  TextInput,
  Modal,
  StyleSheet,
  Button,
  TouchableOpacity,
} from "react-native";
import { useState } from "react";

const AddTodoItemModal = ({ visible, onAdd, onCancel }) => {
  const [text, setText] = useState("");
  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onDismiss={() => setText("")}
    >
      <View style={styles.container}>
        <TextInput
          autoFocus
          value={text}
          cursorColor="purple"
          style={styles.input}
          onChange={(e) => setText(e.nativeEvent.text)}
        />
        <View style={styles.buttonGroup}>
          <TouchableOpacity onPress={onCancel}>
            <View style={[styles.button, { backgroundColor: "pink" }]}>
              <Text style={[styles.buttonText, { color: "purple" }]}>
                Cancel
              </Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => onAdd(text)}>
            <View style={styles.button}>
              <Text style={styles.buttonText}>Add</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default AddTodoItemModal;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
    backgroundColor: "#fff",
    opacity: 0.9,
    paddingHorizontal: 20,
    paddingTop: 50,
  },
  input: {
    width: "100%",
    height: 70,
    borderRadius: 15,
    borderWidth: 5,
    borderColor: "purple",
    borderStyle: "solid",
    textAlign: "left",
    paddingHorizontal: 10,
    color: "purple",
    fontWeight: "bold",
    fontStyle: "italic",
    fontSize: 24,
  },
  buttonGroup: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 30,
  },
  button: {
    width: 170,
    height: 45,
    borderRadius: 15,
    backgroundColor: "purple",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    fontWeight: "semibold",
    fontStyle: "italic",
    fontSize: 18,
    color: "pink",
  },
});

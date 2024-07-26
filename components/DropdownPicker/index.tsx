import {
  View,
  Text,
  Pressable,
  TouchableOpacity,
  Modal,
  StyleSheet,
} from "react-native";
import { useState } from "react";

const DropdownPicker = ({ options, value, setValue }) => {
  const [visible, setVisible] = useState(false);
  return (
    <View style={styles.container}>
      <Pressable onPress={() => setVisible((c) => !c)}>
        <Text style={styles.current}>{value}</Text>
      </Pressable>
      <Modal visible={visible} transparent animationType="fade">
        <Pressable onPress={() => setVisible(false)}>
          <View style={styles.mask}>
            <View style={styles.modalContent}>
              {options.map((item) => (
                <TouchableOpacity
                  key={item.key}
                  onPress={() => {
                    setValue(item.key);
                    setVisible(false);
                  }}
                >
                  <View style={styles.option}>
                    <Text style={styles.optionLabel}>{item.label}</Text>
                    <View
                      style={[
                        styles.divider,
                        value === item.key && styles.currentOption,
                      ]}
                    ></View>
                  </View>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        </Pressable>
      </Modal>
    </View>
  );
};

export default DropdownPicker;

const styles = StyleSheet.create({
  container: {
    height: 100,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  current: {
    fontWeight: "bold",
    fontSize: 24,
    fontStyle: "italic",
    borderWidth: 5,
    borderRadius: 10,
    borderColor: "purple",
    borderCurve: "continuous",
    paddingHorizontal: 20,
    paddingVertical: 12,
  },
  mask: {
    backgroundColor: "transparent",
    width: "100%",
    height: "100%",
  },
  modalContent: {
    width: 200,
    backgroundColor: "white",
    position: "absolute",
    top: 100,
    left: "50%",
    transform: [{ translateX: -100 }],
    borderRadius: 20,
    paddingVertical: 12,
  },
  option: {
    // backgroundColor: "#000",
    paddingHorizontal: 15,
    paddingVertical: 8,
  },
  optionLabel: {
    fontWeight: "bold",
    fontSize: 20,
    fontStyle: "italic",
  },
  divider: {
    borderWidth: 2,
    borderColor: "pink",
    borderStyle: "dotted",
    borderRadius: 10,
  },
  currentOption: {
    borderStyle: "solid",
    borderColor: "purple",
  },
});

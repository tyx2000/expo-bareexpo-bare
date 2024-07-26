import { Fragment, useState } from "react";
import { Text, StyleSheet, View, TouchableOpacity } from "react-native";
import SwipeableItem from "./SwipeableItem";
import AddTodoItemModal from "./AddTodoItemModal";
import { FlashList } from "@shopify/flash-list";

const TodoList = () => {
  const [visible, setVisible] = useState<boolean>(false);
  const [list, setList] = useState([
    { key: 1, label: "hello", type: "added" },
    { key: 2, label: "world", type: "added" },
    { key: 3, label: "Json", type: "added" },
    {
      key: 4,
      label: "Born",
      type: "added",
    },
  ]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>TodoList</Text>
      <View style={styles.options}>
        <TouchableOpacity onPress={() => setVisible(true)}>
          <Text style={styles.optionText}>Add</Text>
        </TouchableOpacity>
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            gap: 10,
          }}
        >
          <TouchableOpacity>
            <Text style={styles.optionText}>Filter</Text>
          </TouchableOpacity>
          <TouchableOpacity>
            <Text style={styles.optionText}>Sort</Text>
          </TouchableOpacity>
        </View>
      </View>
      <FlashList
        data={list}
        estimatedItemSize={60}
        renderItem={({ item }) => (
          <SwipeableItem
            item={item}
            key={item.key}
            editItemType={() =>
              setList((c) =>
                c.map((d) => ({
                  ...d,
                  type: d.type === "new" ? "added" : d.type,
                })),
              )
            }
            onRemove={(id) => setList((c) => c.filter((d) => d.key !== id))}
          />
        )}
      />

      <AddTodoItemModal
        visible={visible}
        onAdd={(text) => {
          console.log(text);
          setVisible(false);
          setList((c) => [...c, { key: text, label: text, type: "new" }]);
        }}
        onCancel={() => setVisible(false)}
      />
    </View>
  );
};

export default TodoList;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    display: "flex",
    padding: 20,
  },
  title: {
    color: "purple",
    fontWeight: "bold",
    fontSize: 24,
    fontStyle: "italic",
    width: "100%",
    textAlign: "center",
  },
  options: {
    height: 50,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  optionText: {
    fontWeight: "semibold",
    fontStyle: "italic",
    fontSize: 18,
    color: "#497AFC",
  },
});

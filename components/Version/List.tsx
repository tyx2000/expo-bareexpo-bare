import React, { useState } from "react";
import { FlashList } from "@shopify/flash-list";
import ListItem from "./ListItem";

const initData = [
  {
    id: 1,
    name: "奥黛丽赫本",
    artist: "莫奈",
    type: "image",
    numLimit: 1000,
    buyLimit: 5,
    price: 299,
    time: "2024-7-15 12:12:12",
  },
  {
    id: 2,
    name: "奥黛丽赫本",
    artist: "莫奈",
    type: "image",
    numLimit: 1000,
    buyLimit: 5,
    price: 299,
    time: "2024-7-15 11:12:12",
  },
  {
    id: 3,
    name: "奥黛丽赫本",
    artist: "莫奈",
    type: "image",
    numLimit: 1000,
    buyLimit: 5,
    price: 299,
    time: "2024-7-15 11:12:12",
  },
  {
    id: 4,
    name: "奥黛丽赫本",
    artist: "莫奈",
    type: "image",
    numLimit: 1000,
    buyLimit: 5,
    price: 299,
    time: "2024-7-15 11:12:12",
  },
  {
    id: 5,
    name: "奥黛丽赫本",
    artist: "莫奈",
    type: "image",
    numLimit: 1000,
    buyLimit: 5,
    price: 299,
    time: "2024-7-15 11:12:12",
  },
];

const List = ({ itemPressFn }) => {
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = () => {
    setRefreshing(true);
    console.log("==============refreshing");
    setTimeout(() => {
      setRefreshing(false);
    }, 10000);
  };

  const onEndReached = () => {
    console.log("endReached");
    setRefreshing(true);
  };

  return (
    <FlashList
      data={initData}
      estimatedItemSize={200}
      renderItem={({ item }) => (
        <ListItem item={item} itemPressFn={itemPressFn} />
      )}
      onRefresh={onRefresh}
      refreshing={refreshing}
      onEndReachedThreshold={0.2}
      onEndReached={onEndReached}
    />
  );
};

export default List;

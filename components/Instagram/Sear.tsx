import { View, Text, StyleSheet, useWindowDimensions } from "react-native";
import PaperView from "react-native-pager-view";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useEffect, useState, Suspense, lazy } from "react";
import TabItem from "./TabItem";
import * as SecureStore from "expo-secure-store";

// const DynamicTabItem = lazy(() => require("./TabItem"));
//
// const LazyTab = ({ current, screenNo }) => (
//   <Suspense fallback={<Text>loading</Text>}>
//     <DynamicTabItem current={current} screenNo={screenNo} />
//   </Suspense>
// );

const colors = ["#b58df1", "#ffe780", "#fa7f7c", "#82cab2"];

const Home = () => {
  const { height } = useWindowDimensions();
  const insets = useSafeAreaInsets();

  const [mountedTabs, setMountedTabs] = useState([]);
  const [currentScreenNo, setCurrentScreenNo] = useState(0);

  const onPageScroll = (e) => {
    // 滚动偏移量
    // console.log(e.nativeEvent);
  };
  const onPageScrollStateChange = (e) => {
    // 滚动状态 dragging settling idle
    // console.log(e.nativeEvent);
  };
  const onPageSelected = (e) => {
    console.log(e.nativeEvent);
    setCurrentScreenNo(e.nativeEvent.position);
  };

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <View style={styles.tabs}>
        {colors.map((item) => (
          <View key={item}>
            <Text style={[styles.tabText, { color: item }]}>{item}</Text>
          </View>
        ))}
      </View>
      <PaperView
        initialPage={0}
        style={[styles.paperView, {}]}
        overdrag
        onPageScroll={onPageScroll}
        onPageScrollStateChanged={onPageScrollStateChange}
        onPageSelected={onPageSelected}
      >
        {[0, 1, 2, 3].map((item) => (
          <TabItem
            key={item}
            screenNo={item}
            mountedTabs={mountedTabs}
            setMountedTabs={setMountedTabs}
            current={currentScreenNo}
          ></TabItem>
        ))}
      </PaperView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
    // backgroundColor: "purple",
  },
  tabs: {
    display: "flex",
    flexDirection: "row",
    height: 50,
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  tabItem: {},
  tabText: {
    fontWeight: "bold",
    fontSize: 20,
    fontStyle: "italic",
  },
  paperView: {
    width: "100%",
    height: 200,
    backgroundColor: "pink",
  },
  viewItem: {
    height: "100%",
  },
});

export default Home;

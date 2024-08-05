import { Suspense, useEffect } from "react";
import { Text, View } from "react-native";

const colors = ["#b58df1", "#ffe780", "#fa7f7c", "#82cab2"];

const TabItem = ({ screenNo, current, mountedTabs, setMountedTabs }) => {
  useEffect(() => {
    if (screenNo === current) {
      // 懒加载 ？
      setMountedTabs([...mountedTabs, screenNo]);
    }
  }, [current]);

  console.log(mountedTabs);

  // 到达当前页再加载， 提供空白页占位，重复进入不重复mounted
  if (current !== screenNo && !mountedTabs.includes(screenNo))
    return <Text>Loading</Text>;

  return (
    <Suspense fallback={<Text>loading-{screenNo}</Text>}>
      <View
        key={0}
        style={{
          height: "100%",
          backgroundColor: colors[screenNo],
        }}
      >
        <Text>
          {screenNo}-{current}
        </Text>
      </View>
    </Suspense>
  );
};

export default TabItem;

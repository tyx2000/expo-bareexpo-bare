import { View, Text, Button } from "react-native";
import { DatabaseChangeEvent, useSQLiteContext } from "expo-sqlite";
import * as SQLite from "expo-sqlite";
import { useEffect, useState } from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useDrizzleStudio } from "expo-drizzle-studio-plugin";
// import { useCameraDevice, Camera } from "react-native-vision-camera";
// import { CameraView, CameraType, useCameraPermissions } from "expo-camera";

const Home = () => {
  const insets = useSafeAreaInsets();
  const puzzleDB = useSQLiteContext();
  useDrizzleStudio(puzzleDB);

  // const [cameraType, setCameraType] = useState<CameraType>("back");
  // const [permission, requestPermission] = useCameraPermissions();
  //
  // if (!permission) {
  //   requestPermission();
  // }

  // const device = useCameraDevice("back");
  // const [activeCamera, setActiveCamera] = useState(false);

  const [data, setData] = useState([]);

  useEffect(() => {
    console.log(puzzleDB.databaseName, puzzleDB.options);
    SQLite.addDatabaseChangeListener((event: DatabaseChangeEvent) => {
      console.log("listener", event);
    });
    puzzleDB.execAsync(
      `
      pragma journal_mode = WAL;
      create table if not exists test (id integer primary key not null, value text not null, intValue integer);
    `,
    );
  }, []);

  const getAll = () => {
    const t = Date.now();
    puzzleDB.getAllAsync("select * from test").then((data) => {
      console.log("getAllAsync", data);
      setData(data);
      console.log(Date.now() - t);
    });
  };

  const insertOne = async () => {
    const statement = await puzzleDB.prepareAsync(
      "insert into test (id, value, intValue) values ($id, $value, $intValue)",
    );
    let result = await statement.executeAsync({
      $id: Math.floor(Math.random() * 1000),
      $value: "hello",
      $intValue: 1000,
    });
    console.log("insert one", result);
    getAll();
  };

  const newBase = async () => {
    const baseDB = await SQLite.openDatabaseAsync("base.db");
    await baseDB.execAsync(
      `
      pragma journal_mode = WAL;
      create table if not exists test (id integer primary key not null, value text not null, intValue integer);
    `,
    );
    await baseDB.execAsync(
      'insert into test (value, intValue) values ("base", 100)',
    );
    const res = await baseDB.getAllAsync("select * from test");
    console.log("newbase test", res);
  };

  return (
    <View style={[{ paddingTop: insets.top }]}>
      {/*<CameraView style={{ height: 100 }} facing={cameraType}></CameraView>*/}
      {/*<Camera*/}
      {/*  device={device}*/}
      {/*  isActive={activeCamera}*/}
      {/*  style={{ width: "100%", height: 200 }}*/}
      {/*/>*/}
      {/*<Button title="getAll" onPress={getAll} />*/}
      {/*<Button title="insertOne" onPress={insertOne} />*/}
      {/*<Button title="newBase" onPress={newBase} />*/}
      {/*{data.map((item) => (*/}
      {/*  <View key={item.id}>*/}
      {/*    <Text>{JSON.stringify(item)}</Text>*/}
      {/*  </View>*/}
      {/*))}*/}
    </View>
  );
};

export default Home;

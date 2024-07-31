import { createNativeStackNavigator } from "@react-navigation/native-stack";
import FollowLayout from "./FollowLayout";

const StackRoot = createNativeStackNavigator();

const HomeStack = () => {
  return (
    <StackRoot.Navigator
      screenOptions={{ headerShown: false, animation: "fade" }}
    >
      {["#C20114", "#39A2AE", "#CBA135", "#23CE6B", "#090C02"].map((d) => (
        <StackRoot.Screen key={d} name={d} component={FollowLayout} />
      ))}
    </StackRoot.Navigator>
  );
};

export default HomeStack;

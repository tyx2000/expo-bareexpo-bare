import { useWindowDimensions } from "react-native";
import {
  useDerivedValue,
  useSharedValue,
  withRepeat,
  withTiming,
} from "react-native-reanimated";
import {
  Canvas,
  Fill,
  interpolateColors,
  LinearGradient,
  vec,
} from "@shopify/react-native-skia";
import { useEffect } from "react";

const startColors = [
  "rgba(34, 193, 195, 0.4)",
  "rgba(34,193,195,0.4)",
  "rgba(63,94,251,1)",
  "rgba(253,29,29,0.4)",
];
const endColors = [
  "rgba(0,212,255,0.4)",
  "rgba(253,187,45,0.4)",
  "rgba(252,70,107,1)",
  "rgba(252,176,69,0.4)",
];

export const LinearGradientAnimation = () => {
  const { width, height } = useWindowDimensions();
  const colorIndex = useSharedValue(0);

  useEffect(() => {
    (colorIndex.value = withRepeat(
      withTiming(startColors.length - 1, { duration: 1000 }),
    )),
      -1,
      true;
  }, []);

  const gradientColors = useDerivedValue(() => [
    interpolateColors(colorIndex.value, [0, 1, 2, 3], startColors),
    interpolateColors(colorIndex.value, [0, 1, 2, 3], endColors),
  ]);

  return (
    <Canvas style={{ flex: 1 }}>
      <Fill>
        <LinearGradient
          start={vec(0, 0)}
          end={vec(width, height)}
          colors={gradientColors}
        />
      </Fill>
    </Canvas>
  );
};

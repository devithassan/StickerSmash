import React, { useEffect } from 'react';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withSequence,
  withTiming,
} from 'react-native-reanimated';

import { useTheme } from '@/components/theme-context';

export function HelloWave() {
  const { colors } = useTheme();

  // 🔁 animation driver
  const rotate = useSharedValue(0);

  useEffect(() => {
    rotate.value = withRepeat(
      withSequence(
        withTiming(25, { duration: 150 }),
        withTiming(0, { duration: 150 })
      ),
      4, // repeat count
      false
    );
  }, []);

  // 🎯 animated style
  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ rotate: `${rotate.value}deg` }],
    };
  });

  return (
    <Animated.Text
      style={[
        {
          fontSize: 28,
          lineHeight: 32,
          marginTop: -6,

          // optional theme consistency (not required but clean)
          color: colors.text,
        },
        animatedStyle,
      ]}
    >
      👋
    </Animated.Text>
  );
}
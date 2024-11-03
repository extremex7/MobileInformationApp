import React, { useEffect, useRef } from "react";
import { View, Animated, Easing } from "react-native";
import Svg, { Circle, Text as SvgText, G } from "react-native-svg";

const CIRCLE_LENGTH = 280; // Circumference of progress circle
const CIRCLE_RADIUS = CIRCLE_LENGTH / (2 * Math.PI);

export default function Loader({ isActive, speed }) {
  const rotateAnim = useRef(new Animated.Value(0)).current;
  const speedAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (isActive) {
      Animated.loop(
        Animated.sequence([
          Animated.timing(rotateAnim, {
            toValue: 1,
            duration: 2000,
            easing: Easing.linear,
            useNativeDriver: true,
          }),
        ])
      ).start();
    } else {
      rotateAnim.setValue(0);
    }
  }, [isActive]);

  useEffect(() => {
    Animated.timing(speedAnim, {
      toValue: speed,
      duration: 500,
      useNativeDriver: false,
    }).start();
  }, [speed]);

  const rotation = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "360deg"],
  });

  return (
    <View className="items-center justify-center">
      <Animated.View style={{ transform: [{ rotate: rotation }] }}>
        <Svg width={300} height={300} viewBox="0 0 180 180">
          {/* Background Circle */}
          <Circle
            cx="90"
            cy="90"
            r={CIRCLE_RADIUS}
            stroke="#374151"
            strokeWidth="12"
            fill="transparent"
          />

          {/* Progress Circle */}
          <Circle
            cx="90"
            cy="90"
            r={CIRCLE_RADIUS}
            stroke="#10b981"
            strokeWidth="12"
            strokeDasharray={CIRCLE_LENGTH}
            strokeDashoffset={CIRCLE_LENGTH * (1 - speed / 100)}
            strokeLinecap="round"
            fill="transparent"
          />

          {/* Speed Text */}
          <SvgText
            x="90"
            y="85"
            fontSize="24"
            fill="#ffffff"
            textAnchor="middle"
          >
            {speed.toFixed(1)}
          </SvgText>

          <SvgText
            x="90"
            y="110"
            fontSize="14"
            fill="#9ca3af"
            textAnchor="middle"
          >
            Mbps
          </SvgText>
        </Svg>
      </Animated.View>
    </View>
  );
}

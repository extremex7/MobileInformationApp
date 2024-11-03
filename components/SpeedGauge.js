import React, { useEffect, useRef } from "react";
import { View, Text, Animated, Easing } from "react-native";
import LottieView from "lottie-react-native";
import Svg, { Circle, Text as SvgText } from "react-native-svg";

const CIRCLE_LENGTH = 280;
const CIRCLE_RADIUS = CIRCLE_LENGTH / (2 * Math.PI);

const SpeedGauge = ({ isActive, speed, status }) => {
  const rotateAnim = useRef(new Animated.Value(0)).current;
  const speedAnim = useRef(new Animated.Value(0)).current;
  const lottieRef = useRef(null);

  useEffect(() => {
    if (isActive) {
      startRotationAnimation();
      startSpeedAnimation();
    } else {
      resetAnimations();
    }
  }, [isActive, speed]);

  const startRotationAnimation = () => {
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
  };

  const startSpeedAnimation = () => {
    if (lottieRef.current) {
      lottieRef.current.play();
    }
  };

  const resetAnimations = () => {
    rotateAnim.setValue(0);
    speedAnim.setValue(0);
    if (lottieRef.current) {
      lottieRef.current.reset();
    }
  };

  const rotation = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "360deg"],
  });

  const getSpeedColor = (speed) => {
    if (speed >= 100) return "#10b981";
    if (speed >= 50) return "#2563eb";
    if (speed >= 25) return "#f59e0b";
    return "#ef4444";
  };

  return (
    <View className="items-center justify-center">
      <Animated.View style={{ transform: [{ rotate: rotation }] }}>
        <Svg width={300} height={300} viewBox="0 0 180 180">
          <Circle
            cx="90"
            cy="90"
            r={CIRCLE_RADIUS}
            stroke="#374151"
            strokeWidth="12"
            fill="transparent"
          />
          <Circle
            cx="90"
            cy="90"
            r={CIRCLE_RADIUS}
            stroke={getSpeedColor(speed)}
            strokeWidth="12"
            strokeDasharray={CIRCLE_LENGTH}
            strokeDashoffset={CIRCLE_LENGTH * (1 - speed / 100)}
            strokeLinecap="round"
            fill="transparent"
          />
          <LottieView
            ref={lottieRef}
            style={{
              width: 200,
              height: 200,
              position: "absolute",
              top: -10,
              left: -10,
            }}
            source={require("../assets/animations/SpeedAnim.json")}
            autoPlay={false}
            loop={false}
          />
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
      {status && (
        <Text className="text-gray-400 mt-4 text-center">{status}</Text>
      )}
    </View>
  );
};

export default SpeedGauge;

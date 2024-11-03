import { View, Text } from 'react-native';
import { useEffect, useState } from 'react';
import { Accelerometer, Gyroscope, Magnetometer } from 'expo-sensors';

export default function SensorsScreen() {
  const [accelerometer, setAccelerometer] = useState({ x: 0, y: 0, z: 0 });
  const [gyroscope, setGyroscope] = useState({ x: 0, y: 0, z: 0 });
  const [magnetic, setMagnetic] = useState({ x: 0, y: 0, z: 0 });

  useEffect(() => {
    Accelerometer.setUpdateInterval(1000);
    Gyroscope.setUpdateInterval(1000);
    Magnetometer.setUpdateInterval(1000);

    const subscriptions = [
      Accelerometer.addListener(setAccelerometer),
      Gyroscope.addListener(setGyroscope),
      Magnetometer.addListener(setMagnetic)
    ];

    return () => {
      subscriptions.forEach(subscription => subscription.remove());
    };
  }, []);

  return (
    <View className="flex-1 bg-gray-900 p-4">
      <View className="bg-gray-800 rounded-lg p-4 mb-4">
        <Text className="text-white text-xl font-bold mb-2">Accelerometer</Text>
        <Text className="text-green-500">X: {accelerometer.x.toFixed(2)}</Text>
        <Text className="text-green-500">Y: {accelerometer.y.toFixed(2)}</Text>
        <Text className="text-green-500">Z: {accelerometer.z.toFixed(2)}</Text>
      </View>

      <View className="bg-gray-800 rounded-lg p-4 mb-4">
        <Text className="text-white text-xl font-bold mb-2">Gyroscope</Text>
        <Text className="text-green-500">X: {gyroscope.x.toFixed(2)}</Text>
        <Text className="text-green-500">Y: {gyroscope.y.toFixed(2)}</Text>
        <Text className="text-green-500">Z: {gyroscope.z.toFixed(2)}</Text>
      </View>

      <View className="bg-gray-800 rounded-lg p-4">
        <Text className="text-white text-xl font-bold mb-2">Magnetometer</Text>
        <Text className="text-green-500">X: {magnetic.x.toFixed(2)}</Text>
        <Text className="text-green-500">Y: {magnetic.y.toFixed(2)}</Text>
        <Text className="text-green-500">Z: {magnetic.z.toFixed(2)}</Text>
      </View>
    </View>
  );
}

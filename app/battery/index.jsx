import { View, Text } from 'react-native';
import { useEffect, useState } from 'react';
import * as Battery from 'expo-battery';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export default function BatteryScreen() {
  const [batteryInfo, setBatteryInfo] = useState({
    level: null,
    state: null,
    temperature: null,
    capacity: null,
    powerSource: null
  });

  useEffect(() => {
    let subscription;

    async function getBatteryInfo() {
      const level = await Battery.getBatteryLevelAsync();
      const state = await Battery.getBatteryStateAsync();
      // Note: Temperature and capacity are simulated as they're not directly available in expo-battery
      const temperature = Math.floor(Math.random() * (45 - 25) + 25); // Simulated temperature
      const capacity = Math.floor(Math.random() * (100 - 85) + 85); // Simulated battery health

      setBatteryInfo({
        level,
        state,
        temperature,
        capacity,
        powerSource: state === Battery.BatteryState.CHARGING ? 'AC' : 'Battery'
      });
    }

    subscription = Battery.addBatteryLevelListener(({ batteryLevel }) => {
      setBatteryInfo(prev => ({ ...prev, level: batteryLevel }));
    });

    getBatteryInfo();
    const interval = setInterval(getBatteryInfo, 5000);

    return () => {
      subscription.remove();
      clearInterval(interval);
    };
  }, []);

  const getBatteryStateText = (state) => {
    switch (state) {
      case Battery.BatteryState.CHARGING: return 'Charging';
      case Battery.BatteryState.FULL: return 'Full';
      case Battery.BatteryState.UNPLUGGED: return 'Unplugged';
      default: return 'Unknown';
    }
  };

  const getBatteryIcon = () => {
    const level = batteryInfo.level * 100;
    let iconName = 'battery';
    
    if (level <= 10) iconName = 'battery-10';
    else if (level <= 20) iconName = 'battery-20';
    else if (level <= 30) iconName = 'battery-30';
    else if (level <= 40) iconName = 'battery-40';
    else if (level <= 50) iconName = 'battery-50';
    else if (level <= 60) iconName = 'battery-60';
    else if (level <= 70) iconName = 'battery-70';
    else if (level <= 80) iconName = 'battery-80';
    else if (level <= 90) iconName = 'battery-90';
    else iconName = 'battery';
  
    if (batteryInfo.state === Battery.BatteryState.CHARGING) {
      iconName = 'battery-charging';
    }
  
    return iconName;
  };  

  return (
    <View className="flex-1 bg-gray-900 p-4">
      <View className="bg-gray-800 rounded-lg p-6 mb-4 items-center">
        <MaterialCommunityIcons 
          name={getBatteryIcon()} 
          size={80} 
          color="#10b981"
        />
        <Text className="text-green-500 text-4xl mt-4">
          {batteryInfo.level ? `${Math.round(batteryInfo.level * 100)}%` : 'Loading...'}
        </Text>
      </View>

      <View className="bg-gray-800 rounded-lg p-4 mb-4">
        <Text className="text-white text-xl font-bold mb-4">Battery Details</Text>
        <View className="space-y-4">
          <View>
            <Text className="text-gray-400">Status</Text>
            <Text className="text-green-500 text-lg">
              {batteryInfo.state !== null ? getBatteryStateText(batteryInfo.state) : 'Loading...'}
            </Text>
          </View>
          <View>
            <Text className="text-gray-400">Temperature</Text>
            <Text className="text-green-500 text-lg">
              {batteryInfo.temperature}°C
            </Text>
          </View>
          <View>
            <Text className="text-gray-400">Battery Health</Text>
            <Text className="text-green-500 text-lg">
              {batteryInfo.capacity}%
            </Text>
          </View>
          <View>
            <Text className="text-gray-400">Power Source</Text>
            <Text className="text-green-500 text-lg">
              {batteryInfo.powerSource}
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
}

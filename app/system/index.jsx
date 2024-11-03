import { View, Text, ScrollView } from 'react-native';
import { useEffect, useState } from 'react';
import * as Device from 'expo-device';

export default function SystemScreen() {
  const [deviceInfo, setDeviceInfo] = useState(null);

  const formatLabel = (key) => {
    return key
      .replace(/([A-Z])/g, ' $1')
      .split(' ')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };

  useEffect(() => {
    const getDeviceInfo = async () => {
      const isRootedDevice = await Device.isRootedExperimentalAsync();
      
      setDeviceInfo({
        brand: Device.brand,
        deviceName: await Device.deviceName,
        manufacturer: Device.manufacturer,
        modelName: Device.modelName,
        modelId: Device.modelId,
        designName: Device.designName,
        productName: Device.productName,
        deviceYearClass: Device.deviceYearClass,
        totalMemory: (Device.totalMemory / (1024 * 1024 * 1024)).toFixed(2) + ' GB',
        supportedCpuArchitectures: Device.supportedCpuArchitectures?.join(', '),
        osName: Device.osName,
        osVersion: Device.osVersion,
        osBuildId: Device.osBuildId,
        osInternalBuildId: Device.osInternalBuildId,
        platformApiLevel: Device.platformApiLevel,
        deviceType: Device.deviceType,
        isDevice: Device.isDevice ? 'Physical Device' : 'Emulator',
        isRooted: isRootedDevice ? 'Yes' : 'No'
      });
    };

    getDeviceInfo();
  }, []);

  return (
    <ScrollView className="flex-1 bg-gray-900">
      <View className="p-4">
        <View className="bg-gray-800 rounded-lg p-4 mb-4">
          <Text className="text-white text-xl font-bold mb-4">Device Information</Text>
          {deviceInfo && Object.entries(deviceInfo).map(([key, value]) => (
            <View key={key} className="mb-4 border-b border-gray-700 pb-2">
              <Text className="text-gray-400 text-sm uppercase tracking-wider mb-1">
                {formatLabel(key)}
              </Text>
              <Text className="text-green-500 text-lg">
                {value || 'Not Available'}
              </Text>
            </View>
          ))}
        </View>
      </View>
    </ScrollView>
  );
}

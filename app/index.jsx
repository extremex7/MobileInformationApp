import { View, Text } from "react-native";
import { useEffect, useState } from "react";
import * as Device from "expo-device";

export default function SystemScreen() {
  const [systemInfo, setSystemInfo] = useState(null);

  useEffect(() => {
    const getSystemInfo = async () => {
      setSystemInfo({
        // Device Info
        brand: Device.brand,
        modelName: Device.modelName,
        deviceName: Device.deviceName,
        deviceYearClass: await Device.deviceYearClass,

        // OS Info
        osName: Device.osName,
        osVersion: Device.osVersion,
        platformApiLevel: Device.platformApiLevel,

        // Hardware Info
        totalMemory: Device.totalMemory,
        supportedCpuArchitectures: Device.supportedCpuArchitectures,
        isDevice: Device.isDevice,
        manufacturer: Device.manufacturer,

        // Additional Info
        designName: Device.designName,
        productName: Device.productName,
      });
    };

    getSystemInfo();
    const interval = setInterval(getSystemInfo, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <View className="flex-1 bg-gray-900 p-4">
      <View className="bg-gray-800 rounded-lg p-4 mb-4">
        <Text className="text-white text-xl font-bold mb-4">
          System Information
        </Text>
        {systemInfo && (
          <>
            <View className="mb-2">
              <Text className="text-gray-400">Manufacturer</Text>
              <Text className="text-green-500 text-lg">
                {systemInfo.manufacturer}
              </Text>
            </View>
            <View className="mb-2">
              <Text className="text-gray-400">Model</Text>
              <Text className="text-green-500 text-lg">
                {systemInfo.modelName}
              </Text>
            </View>
            <View className="mb-2">
              <Text className="text-gray-400">Device Name</Text>
              <Text className="text-green-500 text-lg">
                {systemInfo.deviceName}
              </Text>
            </View>
            <View className="mb-2">
              <Text className="text-gray-400">OS</Text>
              <Text className="text-green-500 text-lg">
                {systemInfo.osName} {systemInfo.osVersion}
              </Text>
            </View>
            <View className="mb-2">
              <Text className="text-gray-400">API Level</Text>
              <Text className="text-green-500 text-lg">
                {systemInfo.platformApiLevel}
              </Text>
            </View>
            <View className="mb-2">
              <Text className="text-gray-400">CPU Architecture</Text>
              <Text className="text-green-500 text-lg">
                {systemInfo.supportedCpuArchitectures?.join(", ")}
              </Text>
            </View>
            <View className="mb-2">
              <Text className="text-gray-400">Total Memory</Text>
              <Text className="text-green-500 text-lg">
                {systemInfo.totalMemory
                  ? `${(systemInfo.totalMemory / (1024 * 1024 * 1024)).toFixed(
                      2
                    )} GB`
                  : "N/A"}
              </Text>
            </View>
            <View className="mb-2">
              <Text className="text-gray-400">Device Year Class</Text>
              <Text className="text-green-500 text-lg">
                {systemInfo.deviceYearClass}
              </Text>
            </View>
          </>
        )}
      </View>
    </View>
  );
}

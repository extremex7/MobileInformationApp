import { View, Text } from 'react-native';
import { useEffect, useState } from 'react';
import * as FileSystem from 'expo-file-system';

export default function StorageScreen() {
  const [storageInfo, setStorageInfo] = useState(null);

  useEffect(() => {
    async function getStorageInfo() {
      const fileInfo = await FileSystem.getFreeDiskStorageAsync();
      const totalSpace = await FileSystem.getTotalDiskCapacityAsync();
      
      // Convert to GB
      const freeSpaceGB = (fileInfo / 1024 / 1024 / 1024).toFixed(2);
      const totalSpaceGB = (totalSpace / 1024 / 1024 / 1024).toFixed(2);
      const usedSpaceGB = (totalSpaceGB - freeSpaceGB).toFixed(2);
      const usedPercentage = ((usedSpaceGB / totalSpaceGB) * 100).toFixed(1);

      setStorageInfo({
        free: freeSpaceGB,
        total: totalSpaceGB,
        used: usedSpaceGB,
        percentage: usedPercentage
      });
    }

    getStorageInfo();
  }, []);

  return (
    <View className="flex-1 bg-gray-900 p-4">
      <View className="bg-gray-800 rounded-lg p-4 mb-4">
        <Text className="text-white text-xl font-bold mb-4">Storage Information</Text>
        {storageInfo && (
          <>
            <View className="mb-3">
              <Text className="text-gray-400">Total Space</Text>
              <Text className="text-green-500 text-lg">{storageInfo.total} GB</Text>
            </View>
            <View className="mb-3">
              <Text className="text-gray-400">Used Space</Text>
              <Text className="text-green-500 text-lg">{storageInfo.used} GB ({storageInfo.percentage}%)</Text>
            </View>
            <View className="mb-3">
              <Text className="text-gray-400">Free Space</Text>
              <Text className="text-green-500 text-lg">{storageInfo.free} GB</Text>
            </View>
          </>
        )}
      </View>
    </View>
  );
}

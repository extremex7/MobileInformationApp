import { View, Text, ScrollView, RefreshControl } from "react-native";
import { useEffect, useState, useCallback } from "react";
import { NativeModules } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const { BatteryHealth } = NativeModules;

export default function BatteryScreen() {
  const [batteryInfo, setBatteryInfo] = useState(null);
  const [refreshing, setRefreshing] = useState(false);

  const getBatteryInfo = async () => {
    try {
      const info = await BatteryHealth.getBatteryHealth();
      setBatteryInfo(info);
    } catch (error) {
      console.log("Battery info error:", error);
    }
  };

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await getBatteryInfo();
    setRefreshing(false);
  }, []);

  useEffect(() => {
    getBatteryInfo();
  }, []);

  return (
    <ScrollView
      className="flex-1 bg-gray-900"
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      <View className="p-4">
        <View className="bg-gray-800 rounded-lg p-4 mb-4">
          <View className="flex-row items-center justify-between mb-4">
            <Text className="text-white text-xl font-bold">Battery Health</Text>
            <MaterialCommunityIcons name="battery" size={24} color="#10b981" />
          </View>
          {batteryInfo && (
            <>
              <View className="mb-2">
                <Text className="text-gray-400 text-sm uppercase tracking-wider mb-1">
                  Battery Capacity
                </Text>
                <Text className="text-green-500 text-lg">
                  {batteryInfo.capacity}%
                </Text>
              </View>
              <View className="mb-2">
                <Text className="text-gray-400 text-sm uppercase tracking-wider mb-1">
                  Charge Counter
                </Text>
                <Text className="text-green-500 text-lg">
                  {batteryInfo.chargeCounter} mAh
                </Text>
              </View>
              <View className="mb-2">
                <Text className="text-gray-400 text-sm uppercase tracking-wider mb-1">
                  Status
                </Text>
                <Text className="text-green-500 text-lg">
                  {batteryInfo.status === 2 ? "Charging" : "Not Charging"}
                </Text>
              </View>
            </>
          )}
        </View>
      </View>
    </ScrollView>
  );
}

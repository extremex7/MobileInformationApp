import {
  View,
  Text,
  ScrollView,
  RefreshControl,
  Platform,
  Pressable,
} from "react-native";
import { useEffect, useState, useCallback } from "react";
import * as Network from "expo-network";
import { MaterialCommunityIcons } from "@expo/vector-icons";

export default function NetworkScreen() {
  const [networkInfo, setNetworkInfo] = useState(null);
  const [refreshing, setRefreshing] = useState(false);

  const getNetworkInfo = async () => {
    try {
      const networkState = await Network.getNetworkStateAsync();
      const ip = await Network.getIpAddressAsync();
      const ipv4 = await Network.getIpAddressAsync({ type: "4" });
      const ipv6 = await Network.getIpAddressAsync({ type: "6" });

      const isAirplaneMode =
        Platform.OS === "android"
          ? await Network.isAirplaneModeEnabledAsync()
          : null;

      setNetworkInfo({
        type: networkState.type,
        isConnected: networkState.isConnected,
        isInternetReachable: networkState.isInternetReachable,
        isWifiEnabled: networkState.isWifiEnabled,
        ip,
        ipv4,
        ipv6,
        ...(Platform.OS === "android" && { isAirplaneMode }),
      });
    } catch (error) {
      console.log("Network info:", error);
    }
  };

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await getNetworkInfo();
    setRefreshing(false);
  }, []);

  useEffect(() => {
    getNetworkInfo();
  }, []);

  const getNetworkIcon = (type) => {
    switch (type) {
      case "wifi":
        return "wifi";
      case "cellular":
        return "signal-cellular-3";
      case "bluetooth":
        return "bluetooth";
      case "ethernet":
        return "ethernet";
      case "vpn":
        return "vpn";
      default:
        return "network-off";
    }
  };

  return (
    <ScrollView
      className="flex-1 bg-gray-900"
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      <View className="p-4">
        {/* Connection Status */}
        <View className="bg-gray-800 rounded-lg p-4 mb-4">
          <View className="flex-row items-center justify-between mb-4">
            <Text className="text-white text-xl font-bold">
              Connection Status
            </Text>
            {networkInfo && (
              <MaterialCommunityIcons
                name={getNetworkIcon(networkInfo.type)}
                size={24}
                color="#10b981"
              />
            )}
          </View>
          {networkInfo && (
            <>
              <View className="mb-2">
                <Text className="text-gray-400 text-sm uppercase tracking-wider mb-1">
                  Connection Type
                </Text>
                <Text className="text-green-500 text-lg capitalize">
                  {networkInfo.type}
                </Text>
              </View>
              <View className="mb-2">
                <Text className="text-gray-400 text-sm uppercase tracking-wider mb-1">
                  Status
                </Text>
                <Text className="text-green-500 text-lg">
                  {networkInfo.isConnected ? "Connected" : "Disconnected"}
                </Text>
              </View>
            </>
          )}
        </View>

        {/* IP Information */}
        <View className="bg-gray-800 rounded-lg p-4 mb-4">
          <Text className="text-white text-xl font-bold mb-4">
            IP Information
          </Text>
          {networkInfo && (
            <>
              <View className="mb-2">
                <Text className="text-gray-400 text-sm uppercase tracking-wider mb-1">
                  IPv4 Address
                </Text>
                <Text className="text-green-500 text-lg">
                  {networkInfo.ipv4}
                </Text>
              </View>
              <View className="mb-2">
                <Text className="text-gray-400 text-sm uppercase tracking-wider mb-1">
                  IPv6 Address
                </Text>
                <Text className="text-green-500 text-lg">
                  {networkInfo.ipv6 || "Not Available"}
                </Text>
              </View>
            </>
          )}
        </View>

        {/* Additional Network Details */}
        <View className="bg-gray-800 rounded-lg p-4">
          <Text className="text-white text-xl font-bold mb-4">
            Additional Details
          </Text>
          {networkInfo && (
            <>
              <View className="mb-2">
                <Text className="text-gray-400 text-sm uppercase tracking-wider mb-1">
                  Internet Access
                </Text>
                <Text className="text-green-500 text-lg">
                  {networkInfo.isInternetReachable
                    ? "Available"
                    : "Not Available"}
                </Text>
              </View>
              {Platform.OS === "android" && (
                <View className="mb-2">
                  <Text className="text-gray-400 text-sm uppercase tracking-wider mb-1">
                    Airplane Mode
                  </Text>
                  <Text className="text-green-500 text-lg">
                    {networkInfo.isAirplaneMode ? "Enabled" : "Disabled"}
                  </Text>
                </View>
              )}
              <View className="mb-2">
                <Text className="text-gray-400 text-sm uppercase tracking-wider mb-1">
                  WiFi Enabled
                </Text>
                <Text className="text-green-500 text-lg">
                  {networkInfo.isWifiEnabled ? "Yes" : "No"}
                </Text>
              </View>
            </>
          )}
        </View>
      </View>
    </ScrollView>
  );
}

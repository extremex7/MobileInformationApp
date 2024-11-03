import * as Network from "expo-network";
import * as Location from "expo-location";

export default class NetworkInfo {
  static async getNetworkDetails() {
    const networkState = await Network.getNetworkStateAsync();
    const ipAddress = await Network.getIpAddressAsync();
    const ipv4 = await Network.getIpAddressAsync({ type: "4" });
    const ipv6 = await Network.getIpAddressAsync({ type: "6" });

    return {
      type: networkState.type,
      isConnected: networkState.isConnected,
      isInternetReachable: networkState.isInternetReachable,
      isWifiEnabled: networkState.isWifiEnabled,
      ip: ipAddress,
      ipv4,
      ipv6,
      provider: await this.getProviderName(networkState.type),
    };
  }

  static async getProviderName(type) {
    if (type === Network.NetworkStateType.CELLULAR) {
      const info = await Network.getNetworkStateAsync();
      return info?.carrier || "Cellular";
    }
    return type === Network.NetworkStateType.WIFI ? "WiFi" : type;
  }

  static async getLocation() {
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        return null;
      }

      const location = await Location.getCurrentPositionAsync({});
      const address = await Location.reverseGeocodeAsync({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      });

      if (address[0]) {
        return {
          city: address[0].city,
          country: address[0].country,
        };
      }
      return null;
    } catch (error) {
      return null;
    }
  }
}

import { Tabs } from "expo-router";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Provider } from "react-redux";
import store from "../store";

export default function AppLayout() {
  return (
    <Provider store={store}>
      <Tabs
        screenOptions={{
          tabBarStyle: { backgroundColor: "#1f2937" },
          tabBarActiveTintColor: "#10b981",
          tabBarInactiveTintColor: "#9ca3af",
          headerStyle: { backgroundColor: "#1f2937" },
          headerTintColor: "#ffffff",
        }}
      >
        <Tabs.Screen
          name="index"
          options={{
            title: "Overview",
            tabBarIcon: ({ color }) => (
              <MaterialCommunityIcons name="home" size={24} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="network"
          options={{
            title: "Network",
            tabBarIcon: ({ color }) => (
              <MaterialCommunityIcons name="wifi" size={24} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="system"
          options={{
            title: "System",
            tabBarIcon: ({ color }) => (
              <MaterialCommunityIcons
                name="desktop-tower-monitor"
                size={24}
                color={color}
              />
            ),
          }}
        />
        <Tabs.Screen
          name="battery"
          options={{
            title: "Battery",
            tabBarIcon: ({ color }) => (
              <MaterialCommunityIcons name="battery" size={24} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="sensors"
          options={{
            title: "Sensors",
            tabBarIcon: ({ color }) => (
              <MaterialCommunityIcons name="gauge" size={24} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="storage"
          options={{
            title: "Storage",
            tabBarIcon: ({ color }) => (
              <MaterialCommunityIcons name="harddisk" size={24} color={color} />
            ),
          }}
        />
      </Tabs>
    </Provider>
  );
}

import { Stack } from "expo-router";

export default function NetworkLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          headerShown: false,
        }}
      />
      {/* <Stack.Screen 
        name="speed-test" 
        options={{
          title: 'Speed Test',
          headerStyle: { backgroundColor: '#1f2937' },
          headerTintColor: '#ffffff',
          headerBackTitle: 'Network',
        }}
      /> */}
    </Stack>
  );
}

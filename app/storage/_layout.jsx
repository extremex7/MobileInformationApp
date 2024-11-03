import { Stack } from 'expo-router';

export default function StorageLayout() {
  return (
    <Stack>
      <Stack.Screen 
        name="index" 
        options={{
          headerShown: false
        }}
      />
    </Stack>
  );
}

import React from "react";
import { Stack } from "expo-router";

const PublicLayout = () => {
  return (
    <Stack
      screenOptions={{
        headerStyle: { backgroundColor: "#6c47ff" },
        headerTintColor: "#fff",
        headerBackTitle: "Back",
      }}
    >
      <Stack.Screen name="login" options={{ headerShown: false }} />
      <Stack.Screen name="register" options={{ headerShown: false }} />
      <Stack.Screen name="reset" options={{ headerTitle: "Reset Password" }} />
      <Stack.Screen name="welcome" options={{ headerShown: false }} />
    </Stack>
  );
};
export default PublicLayout;

import { preventAutoHideAsync, hideAsync } from "expo-splash-screen";
import { useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import { useFonts } from "expo-font";
import "../global.css";
import GlobalProvider from "@/context/GlobalProvider";
import { ClerkProvider, useAuth } from "@clerk/clerk-expo";
import { Slot, useRouter, useSegments } from "expo-router";
import { getItemAsync, setItemAsync } from "expo-secure-store";

// Keep the splash screen visible while we fetch resources
preventAutoHideAsync();

const clerkApiKey = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY;

const tokenCache = {
  async getToken(key: string) {
    try {
      return getItemAsync(key);
    } catch (error) {
      console.error("Error getting token:", error);
      return null;
    }
  },
  async saveToken(key: string, value: string) {
    try {
      await setItemAsync(key, value);
    } catch (error) {
      console.error("Error saving token:", error);
      return;
    }
  },
};

function InitialLayout() {
  const { isLoaded, isSignedIn } = useAuth();
  const segments = useSegments();
  const router = useRouter();

  const [fontsLoaded, fontError] = useFonts({
    "Roboto-Bold": require("../assets/fonts/Roboto-Bold.ttf"),
    "Roboto-Light": require("../assets/fonts/Roboto-Light.ttf"),
    "Roboto-Regular": require("../assets/fonts/Roboto-Regular.ttf"),
  });

  useEffect(() => {
    if (fontError) {
      console.error("Error loading fonts:", fontError);
      return;
    }

    if (fontsLoaded && isLoaded) {
      hideAsync();
    }
  }, [fontsLoaded, fontError, isLoaded]);

  useEffect(() => {
    if (!isLoaded || !fontsLoaded) return;

    const inAuthGroup = segments[0] === "(auth)";
    const inPublicGroup = segments[0] === "(public)";

    if (isSignedIn && !inAuthGroup) {
      setTimeout(() => router.replace("/home"), 0);
    } else if (!isSignedIn && !inPublicGroup) {
      setTimeout(() => router.replace("/welcome"), 0);
    }
  }, [isLoaded, fontsLoaded, isSignedIn]);

  if (!isLoaded || !fontsLoaded) return null;

  return <Slot />;
}

export default function RootLayout() {
  return (
    <>
      <ClerkProvider tokenCache={tokenCache} publishableKey={clerkApiKey}>
        <GlobalProvider>
          <InitialLayout />
          <StatusBar backgroundColor="#161622" style="light" />
        </GlobalProvider>
      </ClerkProvider>
    </>
  );
}

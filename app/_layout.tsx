import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import "../global.css";
import GlobalProvider from "@/context/GlobalProvider";
import { ClerkProvider, useAuth } from "@clerk/clerk-expo";
import { Slot, useRouter, useSegments } from "expo-router";
import * as SecureStore from "expo-secure-store";

const tokenCache = {
  async getToken(key: string) {
    try {
      return SecureStore.getItemAsync(key);
    } catch (error) {
      console.error("Error getting token:", error);
      return null;
    }
  },
  async saveToken(key: string, value: string) {
    try {
      await SecureStore.setItemAsync(key, value);
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

  useEffect(() => {
    if(!isLoaded) return;

    const inTabsGroup = segments[0] === "(auth)";

    if (isSignedIn && !inTabsGroup) {
      router.replace("/home");
    } else if (!isSignedIn) {
      router.replace("/login");
    }
  }, [isSignedIn])

  if(!isLoaded) return null;

  return <Slot/>;
}

export default function RootLayout() {
  return (
    <>
      <ClerkProvider tokenCache={tokenCache}>
        <GlobalProvider>
          <InitialLayout />
          <StatusBar backgroundColor="#161622" style="light" />
        </GlobalProvider>
      </ClerkProvider>
    </>
  );
}

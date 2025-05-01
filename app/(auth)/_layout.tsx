import { Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { useAuth } from "@clerk/clerk-expo";

const TabsPage = () => {
  const { isSignedIn } = useAuth();

  return (
    <Tabs
      screenOptions={{
        headerStyle: {
          backgroundColor: "#6c47ff",
        },
        headerTintColor: "#fff",
        tabBarActiveTintColor: "#F97316",
        tabBarLabelStyle: {
          fontSize: 12,
          paddingTop: 5,
        },
        tabBarStyle: {
          height: 60,
          justifyContent: "center",
          alignItems: "center",
        }
      }}
    >
      <Tabs.Screen
        name="menu"
        options={{
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="restaurant-outline" size={size+4} color={color} />
          ),
          tabBarLabel: "Menu",
        }}
        redirect={!isSignedIn}
      />
      <Tabs.Screen
        name="purchase"
        options={{
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="cart-outline" size={size+4} color={color} />
          ),
          tabBarLabel: "Purchase",
        }}
        redirect={!isSignedIn}
      />
      <Tabs.Screen
        name="feedback"
        options={{
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <Ionicons
              name="chatbubble-ellipses-outline"
              size={size+4}
              color={color}
            />
          ),
          tabBarLabel: "Feedback",
        }}
        redirect={!isSignedIn}
      />
      <Tabs.Screen
        name="profile"
        options={{
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="person-outline" size={size+4} color={color} />
          ),
          tabBarLabel: "My Profile",
        }}
        redirect={!isSignedIn}
      />
    </Tabs>
  );
};

export default TabsPage;

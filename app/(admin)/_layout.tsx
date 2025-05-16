import React from "react";
import { Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

const AdminTabs = () => {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: "#F97316",
        tabBarInactiveTintColor: "#888",
        tabBarLabelStyle: {
          fontSize: 12,
          paddingTop: 5,
        },
        tabBarStyle: {
          height: 60,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#fff",
        },
      }}
    >
      <Tabs.Screen
        name="analytics"
        options={{
          title: "Analytics",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="stats-chart" size={size+2} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="menu-management"
        options={{
          title: "Menu",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="restaurant" size={size+2} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="user-management"
        options={{
          title: "Users",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="people" size={size+2} color={color} />
          ),
        }}
      />
    </Tabs>
  );
};

export default AdminTabs;

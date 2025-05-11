import React from "react";
import { View, ActivityIndicator } from "react-native";

export default function LoadingSpinner({ size = 40, color = "#f97316" }) {
  return (
    <View className="flex items-center justify-center">
      <ActivityIndicator size={size} color={color} />
    </View>
  );
}

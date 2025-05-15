import { View, Text } from "react-native";

export default function AdminDashboard() {
  return (
    <View className="flex-1 justify-center items-center bg-white">
      <Text className="text-3xl font-bold mb-4">Admin Dashboard</Text>
      <Text className="text-base text-gray-600">
        Welcome, Admin! Here you can manage users, view reports, and perform
        administrative tasks.
      </Text>
      {/* Add more admin features here */}
    </View>
  );
};



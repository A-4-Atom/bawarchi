import { View, Text } from "react-native";

const UserManagementScreen = () => {
  return (
    <View className="flex-1 justify-center items-center bg-white">
      <Text className="text-3xl font-bold mb-4">User Management</Text>
      <Text className="text-base text-gray-600">
        Create and manage user accounts for the mess system.
      </Text>
    </View>
  );
};

export default UserManagementScreen;

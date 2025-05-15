import { View, Text } from "react-native";

const MenuManagementScreen = () => {
  return (
    <View className="flex-1 justify-center items-center bg-white">
      <Text className="text-3xl font-bold mb-4">Menu Management</Text>
      <Text className="text-base text-gray-600">
        Add, edit, or remove menu items for the mess.
      </Text>
    </View>
  );
};

export default MenuManagementScreen;

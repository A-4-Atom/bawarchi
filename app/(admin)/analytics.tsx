import { View, Text } from "react-native";

const AnalyticsScreen = () => {
  return (
    <View className="flex-1 justify-center items-center bg-white">
      <Text className="text-3xl font-bold mb-4">Analytics</Text>
      <Text className="text-base text-gray-600">
        View mess usage statistics, feedback trends, and more.
      </Text>
    </View>
  );
};

export default AnalyticsScreen;

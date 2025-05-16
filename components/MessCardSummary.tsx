import { View, Text, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";

const MessCardSummary = () => {
  const router = useRouter();

  // Hardcoded data for now
  const currentPlan = "Monthly mess card";
  const validUntil = "June 14, 2025";
  const daysRemaining = 30;
  const feedbackCount = 12;

  return (
    <View className="bg-white rounded-2xl shadow p-6 w-full max-w-2xl self-center mt-6 mb-12">
      <Text className="text-2xl font-bold mb-1">Mess Card Summary</Text>
      <Text className="text-base text-gray-500 mb-6">
        Your mess card details and statistics
      </Text>
      <View className="flex-row justify-between items-center border-b border-gray-200 pb-4 mb-4">
        <View>
          <Text className="text-base font-semibold">Current Plan</Text>
          <Text className="text-sm text-gray-500">{currentPlan}</Text>
        </View>
        <TouchableOpacity
          className="border border-gray-300 rounded-md px-4 py-2 bg-[#f9f6f3]"
          onPress={() => router.push("/purchase")}
        >
          <Text className="text-base font-medium text-gray-700 ">
            View Details
          </Text>
        </TouchableOpacity>
      </View>
      <View className="flex-row justify-between items-center border-b border-gray-100 pb-4 mb-4">
        <View>
          <Text className="text-base font-semibold">Days Remaining</Text>
          <Text className="text-sm text-gray-500">
            Valid until {validUntil}
          </Text>
        </View>
        <Text className="text-xl font-bold">{daysRemaining} days</Text>
      </View>
      <View className="flex-row justify-between items-center mb-4">
        <View>
          <Text className="text-base font-semibold">Feedback Provided</Text>
          <Text className="text-sm text-gray-500">
            Number of reviews submitted
          </Text>
        </View>
        <Text className="text-xl font-bold">{feedbackCount}</Text>
      </View>
      <TouchableOpacity
        className="bg-[#f9f6f3] rounded-md py-3 mt-2 border border-gray-200"
        onPress={() => router.push("/feedback")}
      >
        <Text className="text-center text-base font-medium text-gray-800">
          Submit New Feedback
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default MessCardSummary;

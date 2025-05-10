import { useGlobalContext } from "@/context/GlobalProvider";
import { View, Text } from "react-native";
import Rating from "./Rating";

export default function RecentFeedbacks() {
  const { feedbacks } = useGlobalContext()!;
  return (
    <View className="bg-white rounded-xl p-4 shadow mb-10">
      <Text className="mb-1 text-4xl font-bold">Recent Feedbacks</Text>
      <Text className="text-base text-gray-500 mb-4">
        What others are saying
      </Text>
      {feedbacks.map((feedback, index) => (
        <View key={index} className="mb-4 flex">
          <View className="flex-row justify-between mb-2">
            <Text className="text-lg font-semibold">{feedback.item.name}</Text>
            <Rating rating={feedback.rating} iconSize={18} showNumber={false} />
          </View>
          <Text className="text-gray-500">{feedback.comment}</Text>
          {index < feedbacks.length - 1 && (
            <View className="border-b border-gray-200 my-2 mt-3" />
          )}
        </View>
      ))}
    </View>
  );
}

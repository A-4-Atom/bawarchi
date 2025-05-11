import { Text, ScrollView, View } from "react-native";
import FeedbackForm from "../../components/FeedbackForm";
import RecentFeedbacks from "../../components/RecentFeedbacks";
import LoadingSpinner from "@/components/LoadingSpinner";
import { useGlobalContext } from "@/context/GlobalProvider";

const Feedback = () => {
  const { loading } = useGlobalContext()!;
  return (
    <ScrollView className="flex-1 bg-[#f9f6f3] px-4 py-6 mt-10">
      <Text className="mb-1 text-4xl font-bold pt-2 mt-8">Feedback</Text>
      <Text className="text-base text-gray-500 mb-4 ">
        Help us improve by rating today's meals
      </Text>
      {loading ? (
        <View className="w-full h-[500px] flex justify-center items-center">
          <LoadingSpinner size={40} color="#f97316" />
        </View>
      ) : (
        <>
          <FeedbackForm />
          <RecentFeedbacks />
        </>
      )}
    </ScrollView>
  );
};

export default Feedback;

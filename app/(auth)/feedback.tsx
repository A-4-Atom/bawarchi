import { Text, ScrollView } from "react-native";
import FeedbackForm from "../../components/FeedbackForm";
import RecentFeedbacks from "../../components/RecentFeedbacks";

const Feedback = () => {

  return (
    <ScrollView className="flex-1 bg-[#f9f6f3] px-4 py-6 mt-10">
      <Text className="mb-1 text-4xl font-bold pt-2 mt-8">Feedback</Text>
      <Text className="text-base text-gray-500 mb-4 ">
        Help us improve by rating today's meals
      </Text>
      <FeedbackForm />
      <RecentFeedbacks />
    </ScrollView>
  );
};

export default Feedback;

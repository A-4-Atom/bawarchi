import { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  Pressable,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { RadioButton } from "react-native-paper";
import { menuData } from "../../data";
import StarRating from "../../components/StarRating";

const allMenuItems = [
  ...menuData.breakfast,
  ...menuData.lunch,
  ...menuData.dinner,
];

const Feedback = () => {
  const [selectedItem, setSelectedItem] = useState<string | null>(null);
  const [rating, setRating] = useState(0);
  const [comments, setComments] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = () => {
    // Here you would send feedback to backend
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 2000);
    setSelectedItem(null);
    setRating(0);
    setComments("");
  };

  return (
    <ScrollView className="flex-1 bg-[#f9f6f3] px-4 py-6 mt-10">
      <Text className="mb-1 text-4xl font-bold pt-2 mt-8">Feedback</Text>
      <Text className="text-base text-gray-500 mb-4 ">
        Help us improve by rating today's meals
      </Text>
      <View className="bg-white rounded-xl p-4 mb-4 shadow">
        <Text className="text-lg font-bold mb-1">Submit Feedback</Text>
        <Text className="text-xs text-gray-500 mb-2">
          Select a meal item and share your thoughts
        </Text>
        {/* Meal Items as Radio Buttons */}
        <View className="flex-row flex-wrap mb-4 gap-x-8 gap-y-2">
          {allMenuItems.map((item, idx) => (
            <Pressable
              key={item.name}
              className="flex-row items-center mb-1 w-1/2"
              onPress={() => setSelectedItem(item.name)}
            >
              <RadioButton.Android
                value={item.name}
                status={selectedItem === item.name ? "checked" : "unchecked"}
                onPress={() => setSelectedItem(item.name)}
                color="#f97316"
              />
              <Text className="text-base">
                {item.name}
                {item.tags.includes("Vegetarian") && (
                  <Text className="text-green-600 text-xs font-semibold">
                    {" "}
                    (Veg)
                  </Text>
                )}
              </Text>
            </Pressable>
          ))}
        </View>
        {/* Rating */}
        <Text className="text-base font-semibold mt-2 mb-1">Rating</Text>
        <StarRating rating={rating} onChange={setRating} size={32} />
        {/* Comments */}
        <Text className="text-base font-semibold mt-4 mb-1">
          Comments (Optional)
        </Text>
        <TextInput
          className="bg-gray-100 rounded-lg p-3 min-h-[60px] text-base"
          placeholder="Share your experience..."
          value={comments}
          onChangeText={setComments}
          multiline
        />
        {/* Submit Button */}
        <TouchableOpacity
          className={`w-full py-3 rounded-lg mt-6 ${
            selectedItem && rating ? "bg-orange-400" : "bg-orange-200"
          }`}
          disabled={!selectedItem || !rating}
          onPress={handleSubmit}
        >
          <Text className="text-center text-white text-base font-semibold">
            {submitted ? "Thank you!" : "Submit Feedback"}
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default Feedback;

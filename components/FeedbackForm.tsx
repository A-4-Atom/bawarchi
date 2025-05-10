import {
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Pressable,
} from "react-native";
import { RadioButton } from "react-native-paper";
import { useState } from "react";
import StarRating from "./StarRating";
import { useGlobalContext } from "@/context/GlobalProvider";
import { useAuth } from "@clerk/clerk-expo";
import axios from "axios";

export default function FeedbackForm() {
  const { menuItems } = useGlobalContext()!;
  const { userId, getToken } = useAuth();
  const [selectedItem, setSelectedItem] = useState<string | null>(null);
  const [rating, setRating] = useState(0);
  const [comments, setComments] = useState("");
  const [submitted, setSubmitted] = useState(false);

  // Flatten menuItems from context (handle undefined or empty)
  const menuItemList = [
    ...(menuItems.BREAKFAST || []),
    ...(menuItems.LUNCH || []),
    ...(menuItems.DINNER || []),
  ];

  const backendUrl = process.env.EXPO_PUBLIC_BACKEND_URL;

  const handleSubmit = async () => {
    try {
      const token = await getToken();
      await axios.post(
        `${backendUrl}/api/feedback`,
        {
          rating,
          comment: comments || "",
          clerkId: userId,
          itemId: menuItemList.find((item) => item.name === selectedItem)?.id,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
    } catch (error) {
      if (error instanceof Error) {
        console.error("Error submitting feedback:", error.message);
      } else {
        console.error("Error submitting feedback:", error);
      }
    }
    setSubmitted(true);
    setSelectedItem(null);
    setRating(0);
    setComments("");
  };

  return (
    <View className="bg-white rounded-xl p-4 mb-4 shadow">
      <Text className="text-lg font-bold mb-1">Submit Feedback</Text>
      <Text className="text-md text-gray-500 mb-2">
        Select a meal item and share your thoughts
      </Text>

      <View className="flex-row flex-wrap mb-4 gap-x-8 gap-y-2">
        {menuItemList.length === 0 ? (
          <Text className="text-gray-400">No menu items available.</Text>
        ) : (
          menuItemList.map((item, idx) => (
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
              <Text className="text-base">{item.name}</Text>
            </Pressable>
          ))
        )}
      </View>

      <Text className="text-base font-semibold mt-2 mb-1">Rating</Text>
      <StarRating rating={rating} onChange={setRating} size={32} />

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
  );
}

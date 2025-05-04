import { View, Pressable } from "react-native";
import { Ionicons } from "@expo/vector-icons";

interface StarRatingProps {
  rating: number;
  onChange: (rating: number) => void;
  size?: number;
}

const StarRating = ({ rating, onChange, size = 28 }: StarRatingProps) => {
  return (
    <View style={{ flexDirection: "row" }}>
      {[1, 2, 3, 4, 5].map((star) => (
        <Pressable key={star} onPress={() => onChange(star)} hitSlop={8}>
          <Ionicons
            name={star <= rating ? "star" : "star-outline"}
            size={size}
            color="#FFB800"
            style={{ marginHorizontal: 2 }}
          />
        </Pressable>
      ))}
    </View>
  );
};

export default StarRating;

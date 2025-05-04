import { View, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";

interface RatingProps {
  rating: number;
  showNumber?: boolean;
  iconSize?: number;
}

const Rating = ({ rating, showNumber = true, iconSize = 18 }: RatingProps) => {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 >= 0.5;
  const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

  return (
    <View className="flex-row items-center gap-1">
      {[...Array(fullStars)].map((_, i) => (
        <Ionicons
          key={`full-${i}`}
          name="star"
          size={iconSize}
          color="#FFB800"
        />
      ))}
      {hasHalfStar && (
        <Ionicons name="star-half" size={iconSize} color="#FFB800" />
      )}
      {[...Array(emptyStars)].map((_, i) => (
        <Ionicons
          key={`empty-${i}`}
          name="star-outline"
          size={iconSize}
          color="#FFB800"
        />
      ))}
      {showNumber && (
        <Text className="text-sm text-gray-600 ml-1">{rating.toFixed(1)}</Text>
      )}
    </View>
  );
};

export default Rating;

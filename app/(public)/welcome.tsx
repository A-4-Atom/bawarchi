import {
  Text,
  Image,
  TouchableOpacity,
  View,
  FlatList,
  useWindowDimensions,
  Animated,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useState, useRef, useEffect } from "react";
import { router } from "expo-router";

const slides = [
  {
    id: "1",
    title: "Choose Meal",
    description:
      "Pick your favorite from our delicious options your perfect meal awaits!",
    image: require("../../assets/images/thali.png"),
  },
  {
    id: "2",
    title: "Get a Plan",
    description: "No more guessing meals, grab a plan and eat smart every day!",
    image: require("../../assets/images/chole.png"),
  },
  {
    id: "3",
    title: "Beat The Queue",
    description: "Skip the line, not the meal. Order ahead and save time!",
    image: require("../../assets/images/dosa.png"),
  },
];

const bgColors = ["#FFD484", "#FF8340", "#9FCE73"];

export default function Welcome() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const { width } = useWindowDimensions();
  const animation = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(animation, {
      toValue: currentIndex,
      duration: 140,
      useNativeDriver: false,
    }).start();
  }, [currentIndex]);

  const bgColor = animation.interpolate({
    inputRange: Array.from({ length: slides.length }, (_, i) => i),
    outputRange: bgColors
  });

  interface ScrollEvent {
    nativeEvent: {
      contentOffset: {
        x: number;
      };
    };
  }

  const handleScroll = (event: ScrollEvent): void => {
    const index = Math.round(event.nativeEvent.contentOffset.x / width);
    setCurrentIndex(index);
  };

  return (
    <Animated.View
      style={{
        flex: 1,
        backgroundColor: bgColor,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <SafeAreaView className="h-full w-full items-center justify-center gap-6">
        <FlatList
          data={slides}
          keyExtractor={(item) => item.id}
          className="flex-grow-0"
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          onScroll={handleScroll}
          renderItem={({ item }) => (
            <View className="w-screen items-center px-6">
              <Image source={item.image} className="h-64 w-64 my-6" />
              <Text className="text-3xl font-bold text-center">
                {item.title}
              </Text>
              <Text className="text-center text-base text-gray-700 mt-3">
                {item.description}
              </Text>
            </View>
          )}
        />
        <View className="flex-row mt-4">
          {slides.map((_, index) => (
            <View
              key={index}
              className={`h-2 w-2 rounded-full mx-1 ${
                currentIndex === index ? "bg-black" : "bg-gray-300"
              }`}
            />
          ))}
        </View>
        <TouchableOpacity
          className="bg-[#FF9B17] rounded-full px-10 py-3 mt-6"
          onPress={() => router.push("/(public)/login")}
        >
          <Text className="text-white text-2xl font-bold">Get Started</Text>
        </TouchableOpacity>
      </SafeAreaView>
    </Animated.View>
  );
}

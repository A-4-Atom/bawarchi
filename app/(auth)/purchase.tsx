import { useState } from "react";
import { View, Text, ScrollView, Pressable } from "react-native";
import { RadioButton } from "react-native-paper";

const mealPlans = [
  { label: "Breakfast Only", price: 1500 },
  { label: "Lunch Only", price: 2000 },
  { label: "Dinner Only", price: 2000 },
  { label: "Any Two Meals", price: 3500 },
  { label: "All Meals", price: 4500 },
];

const durations = [
  { label: "Daily (Pay as you go)", value: "daily", discount: 0 },
  { label: "Weekly", value: "weekly", discount: 0.05 },
  { label: "Monthly", value: "monthly", discount: 0.1 },
];

const Purchase = () => {
  const [selectedMeal, setSelectedMeal] = useState<number | null>(null);
  const [selectedDuration, setSelectedDuration] = useState<string | null>(null);

  const meal = selectedMeal !== null ? mealPlans[selectedMeal] : null;
  const duration = durations.find((d) => d.value === selectedDuration);

  const subtotal = meal ? meal.price : 0;
  const discount = meal && duration ? subtotal * duration.discount : 0;
  const total = subtotal - discount;

  return (
    <ScrollView className="flex-1 bg-[#f9f6f3] px-4 py-6 mt-16">
      <Text className="mb-1 text-4xl font-bold pt-5">
        Purchase Mess Card
      </Text>
      <Text className="text-base text-gray-500 mb-4 ">
        Choose a meal plan that suits your needs.
      </Text>

      {/* Select Meal Plan */}
      <View className="bg-white rounded-xl p-4 mb-4 shadow">
        <Text className="text-lg font-bold mb-1">Select Meal Plan</Text>
        <Text className="text-xs text-gray-500 mb-2">
          Choose which meals you want to include
        </Text>
        {mealPlans.map((plan, idx) => (
          <Pressable
            key={plan.label}
            className="flex-row items-center py-2"
            onPress={() => setSelectedMeal(idx)}
          >
            <RadioButton.Android
              value={plan.label}
              status={selectedMeal === idx ? "checked" : "unchecked"}
              onPress={() => setSelectedMeal(idx)}
              color="#f97316"
            />
            <Text className="flex-1 text-base">{plan.label}</Text>
            <Text className="text-base font-semibold text-orange-500">
              ₹{plan.price}/month
            </Text>
          </Pressable>
        ))}
      </View>

      {/* Select Duration */}
      <View className="bg-white rounded-xl p-4 mb-4 shadow">
        <Text className="text-lg font-bold mb-1">Select Duration</Text>
        <Text className="text-xs text-gray-500 mb-2">
          Choose how long you want the plan
        </Text>
        {durations.map((d) => (
          <Pressable
            key={d.value}
            className="flex-row items-center py-2"
            onPress={() => setSelectedDuration(d.value)}
          >
            <RadioButton.Android
              value={d.value}
              status={selectedDuration === d.value ? "checked" : "unchecked"}
              onPress={() => setSelectedDuration(d.value)}
              color="#f97316"
            />
            <Text className="flex-1 text-base">{d.label}</Text>
            <Text className="text-xs text-green-600 font-semibold">
              {d.discount > 0 ? `${d.discount * 100}% discount` : "No discount"}
            </Text>
          </Pressable>
        ))}
      </View>

      {/* Order Summary */}
      <View className="bg-white rounded-xl p-4 mb-10 shadow">
        <Text className="text-lg font-bold mb-2">Order Summary</Text>
        <View className="flex-row justify-between mb-1">
          <Text className="text-sm text-gray-600">Selected Plan:</Text>
          <Text className="text-sm font-semibold">
            {meal ? meal.label : "None selected"}
          </Text>
        </View>
        <View className="flex-row justify-between mb-1">
          <Text className="text-sm text-gray-600">Duration:</Text>
          <Text className="text-sm font-semibold">
            {duration ? duration.label : "None selected"}
          </Text>
        </View>
        <View className="flex-row justify-between mb-1">
          <Text className="text-sm text-gray-600">Subtotal:</Text>
          <Text className="text-sm">₹{subtotal}</Text>
        </View>
        <View className="flex-row justify-between mb-1">
          <Text className="text-sm text-gray-600">Discount:</Text>
          <Text className="text-sm text-green-600">₹{discount}</Text>
        </View>
        <View className="flex-row justify-between mb-3 mt-2">
          <Text className="text-base font-bold text-orange-600">Total:</Text>
          <Text className="text-base font-bold text-orange-600">₹{total}</Text>
        </View>
        <Pressable
          className={`w-full py-3 rounded-lg ${
            meal && duration ? "bg-orange-400" : "bg-orange-200"
          }`}
          disabled={!meal || !duration}
        >
          <Text className="text-center text-white text-base font-semibold">
            Proceed to Payment
          </Text>
        </Pressable>
      </View>
    </ScrollView>
  );
};

export default Purchase;

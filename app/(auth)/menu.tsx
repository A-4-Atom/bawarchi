import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useState } from "react";
import { menuData, MenuItem } from "../../data";
import Rating from "../../components/Rating";

type TabType = "breakfast" | "lunch" | "dinner";

const Menu = () => {
  const [activeTab, setActiveTab] = useState<TabType>("breakfast");

  const tabs = [
    { id: "breakfast" as TabType, label: "Breakfast" },
    { id: "lunch" as TabType, label: "Lunch" },
    { id: "dinner" as TabType, label: "Dinner" },
  ];

  return (
    <SafeAreaView className="flex-1 bg-[#f9f6f3]">
      <View className="flex-1 bg-[#f9f6f3] mt-6">
        {/* Header */}
        <View className="py-4 px-4 bg-[#f9f6f3] rounded-xl mb-4 mt-5">
          <Text className="text-4xl font-bold">Mess Menu</Text>
          <Text className="text-gray-500 mt-1 text-base py-2">
            Check what's cooking in the mess today
          </Text>
        </View>

        {/* Tabs */}
        <View className="flex-row px-4 border-b border-gray-200 w-full items-center justify-between mb-2">
          {tabs.map((tab) => (
            <TouchableOpacity
              key={tab.id}
              onPress={() => setActiveTab(tab.id)}
              className={`py-2 px-6 ${
                activeTab === tab.id ? "border-b-2 border-orange-400" : ""
              }`}
            >
              <Text
                className={`${
                  activeTab === tab.id
                    ? "text-orange-500 font-bold"
                    : "text-gray-600"
                } text-lg font-semibold`}
              >
                {tab.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Menu Items */}
        <ScrollView className="flex-1 px-4 pt-2">
          {menuData[activeTab].map((item: MenuItem, index: number) => (
            <View key={index} className="bg-white p-4 rounded-xl mb-4 shadow">
              <Text className="text-2xl font-bold text-gray-800 mb-1">
                {item.name}
              </Text>
              <Text className="text-gray-500 text-base mb-2">
                {item.description}
              </Text>
              <View className="mt-2 mb-2">
                <Rating rating={item.rating} />
              </View>
              <View className="flex-row mt-1 gap-2 flex-wrap">
                {item.tags.map((tag: string, tagIndex: number) => (
                  <View
                    key={tagIndex}
                    className={`px-3 py-1 rounded-full ${
                      tag === "Vegetarian"
                        ? "bg-green-500 bg-opacity-20"
                        : tag === "Healthy"
                        ? "bg-orange-400 bg-opacity-20"
                        : "bg-gray-400 bg-opacity-20"
                    }`}
                  >
                    <Text
                      className={`text-xs font-semibold text-white`}
                    >
                      {tag}
                    </Text>
                  </View>
                ))}
              </View>
            </View>
          ))}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default Menu;

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
    <SafeAreaView className="flex-1 bg-[#f5f3ed]">
      <View className="flex-1 bg-[#FCFBF8 mt-6">
        {/* Header */}
        <View className="py-6 px-4 bg-[#f5f3ed] mt-5">
          <Text className="text-4xl font-bold">Mess Menu</Text>
          <Text className="text-gray-600 mt-1 text-xl py-2">
            Check what's cooking in the mess today
          </Text>
        </View>

        {/* Tabs */}
        <View className="flex-row px-4 border-b border-gray-200 w-full items-center justify-between">
          {tabs.map((tab) => (
            <TouchableOpacity
              key={tab.id}
              onPress={() => setActiveTab(tab.id)}
              className={`py-3 px-6 ${
                activeTab === tab.id ? "border-b-2 border-[#F97316]" : ""
              }`}
            >
              <Text
                className={`${
                  activeTab === tab.id
                    ? "text-[#F97316] font-bold"
                    : "text-gray-600"
                } text-lg font-[Roboto-Bold]`}
              >
                {tab.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Menu Items */}
        <ScrollView className="flex-1 px-4 pt-4">
          {menuData[activeTab].map((item: MenuItem, index: number) => (
            <View
              key={index}
              className="bg-[#FFF] p-4 rounded-lg mb-4 shadow-sm"
            >
              <Text className="text-3xl font-bold text-gray-800">
                {item.name}
              </Text>
              <Text className="text-gray-600 mt-1 text-md">{item.description}</Text>
              <View className="mt-4">
                <Rating rating={item.rating} />
              </View>
              <View className="flex-row mt-2 gap-3">
                {item.tags.map((tag: string, tagIndex: number) => (
                  <View
                    key={tagIndex}
                    className={`px-3 py-1 rounded-full ${
                      tag === "Vegetarian"
                        ? "bg-[#16A34A] bg-opacity-20"
                        : tag === "Healthy"
                        ? "bg-[#F97316] bg-opacity-20"
                        : "bg-gray-400"
                    }`}
                  >
                    <Text className="text-xs text-white font-[Roboto-Bold]">
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

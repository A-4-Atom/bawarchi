import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  FlatList,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useState, useEffect } from "react";
import { useGlobalContext } from "@/context/GlobalProvider";
import { weekDays } from "@/constants/constants";
import Rating from "../../components/Rating";

type TabType = "breakfast" | "lunch" | "dinner";

const Menu = () => {
  const global = useGlobalContext();
  const loadingMenu = global?.loadingMenu;
  const getMenuForDay = global?.getMenuForDay;
  const allMenus = global?.allMenus;
  const [activeTab, setActiveTab] = useState<TabType>("breakfast");
  const [selectedDay, setSelectedDay] = useState<string>(
    weekDays[new Date().getDay() === 0 ? 6 : new Date().getDay() - 1]
  );
  const [menu, setMenu] = useState<any>(allMenus?.[selectedDay] || {});

  const tabs = [
    { id: "breakfast" as TabType, label: "Breakfast" },
    { id: "lunch" as TabType, label: "Lunch" },
    { id: "dinner" as TabType, label: "Dinner" },
  ];

  // Fetch menu when selectedDay changes
  useEffect(() => {
    let isMounted = true;
    const fetchMenu = async () => {
      if (getMenuForDay) {
        const data = await getMenuForDay(selectedDay);
        if (isMounted && data) setMenu(data);
      }
    };
    if (!allMenus?.[selectedDay]) {
      fetchMenu();
    } else {
      setMenu(allMenus[selectedDay]);
    }
    return () => {
      isMounted = false;
    };
  }, [selectedDay, allMenus, getMenuForDay]);

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

        {/* Weekday Selector */}
        <FlatList
          data={weekDays}
          horizontal
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item) => item}
          className="px-4 mb-2"
          contentContainerStyle={{ gap: 8, alignItems: "center", height: 40 }}
          style={{ maxHeight: 40 }}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() => setSelectedDay(item)}
              className={`px-5 py-1 rounded-full mr-2 ${
                selectedDay === item ? "bg-orange-400" : "bg-orange-200"
              }`}
              style={{ height: 36, justifyContent: "center" }}
            >
              <Text
                className={`text-base font-semibold ${
                  selectedDay === item ? "text-white" : "text-orange-700"
                }`}
              >
                {item.charAt(0) + item.slice(1).toLowerCase()}
              </Text>
            </TouchableOpacity>
          )}
        />

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
                className={`$${
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

        {/* Meal Timings */}
        <View className="px-4 mb-2">
          {activeTab === "breakfast" && (
            <Text className="text-orange-500 text-md font-semibold text-center">
              Served from 7:00 AM to 9:30 AM
            </Text>
          )}
          {activeTab === "lunch" && (
            <Text className="text-orange-500 text-md font-semibold text-center">
              Served from 12:00 PM to 2:30 PM
            </Text>
          )}
          {activeTab === "dinner" && (
            <Text className="text-orange-500 text-md font-semibold text-center">
              Served from 6:00 PM - 8:30 PM
            </Text>
          )}
        </View>

        {/* Menu Items */}
        <ScrollView className="flex-1 px-4 pt-2">
          {loadingMenu ? (
            <Text className="text-center text-lg text-gray-500 mt-10">
              Loading menu...
            </Text>
          ) : menu && menu[activeTab.toUpperCase()] && menu[activeTab.toUpperCase()].length > 0 ? (
            menu[activeTab.toUpperCase()].map((item: any, index: number) => (
              <View key={index} className="bg-white p-4 rounded-xl mb-4 shadow">
                <View className="flex-row items-center justify-between mb-1">
                  <Text className="text-2xl font-bold text-gray-800">
                    {item.name}
                  </Text>
                  {item.price && (
                    <Text className="text-lg font-semibold text-black">
                      ₹{item.price}
                    </Text>
                  )}
                </View>
                <Text className="text-gray-500 text-base mb-2">
                  {item.description}
                </Text>
                <View className="mt-2 mb-2">
                  <Rating rating={item.rating} />
                </View>
                <View className="flex-row mt-1 gap-2 flex-wrap">
                  {item.tags && item.tags.map((tag: string, tagIndex: number) => (
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
                      <Text className={`text-xs font-semibold text-white`}>
                        {tag}
                      </Text>
                    </View>
                  ))}
                </View>
              </View>
            ))
          ) : (
            <Text className="text-center text-lg text-gray-400 mt-10">
              No menu items found.
            </Text>
          )}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default Menu;

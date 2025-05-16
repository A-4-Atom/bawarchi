import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import { useEffect, useState } from "react";
import { useGlobalContext } from "@/context/GlobalProvider";
import { weekDays } from "@/constants/constants";
import type { MenuData, MenuItem } from "@/types/types";
import DropDownPicker from "react-native-dropdown-picker";

const emptyMenu: MenuData = { BREAKFAST: [], LUNCH: [], DINNER: [] };

type MealType = "BREAKFAST" | "LUNCH" | "DINNER";

const MenuManagementScreen = () => {
  const { getMenuForDay, allMenus, loadingMenu } = useGlobalContext()!;
  const [selectedDay, setSelectedDay] = useState(
    weekDays[new Date().getDay() === 0 ? 6 : new Date().getDay() - 1]
  );
  const [menu, setMenu] = useState<MenuData>(
    allMenus[selectedDay] || emptyMenu
  );
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(selectedDay);
  const [items, setItems] = useState(
    weekDays.map((day) => ({
      label: day.charAt(0) + day.slice(1).toLowerCase(),
      value: day,
    }))
  );

  useEffect(() => {
    setValue(selectedDay);
  }, [selectedDay]);

  useEffect(() => {
    let isMounted = true;
    const fetchMenu = async () => {
      setLoading(true);
      const data = await getMenuForDay(selectedDay);
      if (isMounted) setMenu(data || emptyMenu);
      setLoading(false);
    };
    if (!allMenus[selectedDay]) {
      fetchMenu();
    } else {
      setMenu(allMenus[selectedDay] || emptyMenu);
    }
    return () => {
      isMounted = false;
    };
  }, [selectedDay, allMenus]);

  useEffect(() => {
    if (value !== selectedDay) {
      setSelectedDay(value);
    }
  }, [value]);

  const renderMealSection = (meal: MealType) => (
    <View key={meal} className="mb-8">
      <Text className="text-xl font-bold mb-2">
        {meal.charAt(0) + meal.slice(1).toLowerCase()}
      </Text>
      <View className="flex-row px-1 mb-1">
        <Text className="w-1/4 font-semibold">Name</Text>
        <Text className="w-1/2 font-semibold">Description</Text>
        <Text className="w-1/6 font-semibold">Actions</Text>
      </View>
      {menu[meal] && menu[meal].length > 0 ? (
        menu[meal].map(
          (item: MenuItem & { description?: string; vegetarian?: boolean }) => (
            <View
              key={item.id}
              className="flex-row items-center py-2 border-b border-gray-200"
            >
              <Text className="w-1/4">{item.name}</Text>
              <Text className="w-1/2 text-gray-500">
                {item.description || "-"}
              </Text>
              <View className="w-1/6 flex-row gap-x-2">
                <TouchableOpacity className="px-2 py-1 bg-gray-100 rounded border border-gray-300">
                  <Text className="text-xs text-gray-700">Edit</Text>
                </TouchableOpacity>
                <TouchableOpacity className="px-2 py-1 bg-red-100 rounded border border-red-300">
                  <Text className="text-xs text-red-600">Delete</Text>
                </TouchableOpacity>
              </View>
            </View>
          )
        )
      ) : (
        <Text className="text-gray-400 ml-2">No items</Text>
      )}
    </View>
  );

  return (
    <View className="flex-1 bg-[#f9f6f3] px-4 py-6 mt-12">
      <View className="flex-1 justify-center items-center">
        <Text className="text-3xl font-bold mb-1">Menu Management</Text>
        <Text className="text-base text-gray-600">
          Add, edit, or remove menu items for the mess.
        </Text>
      </View>
      <View className="flex-row justify-between items-center mb-6">
        <View>
          <Text className="text-2xl font-bold">Menu Items</Text>
          <Text className="text-base text-gray-500">Manage your mess menu</Text>
        </View>
        <TouchableOpacity
          className="bg-orange-400 px-4 py-2 rounded-lg"
          disabled
        >
          <Text className="text-white font-semibold">Add Menu Item</Text>
        </TouchableOpacity>
      </View>
      <View className="mb-6">
        <DropDownPicker
          open={open}
          value={value}
          items={items}
          setOpen={setOpen}
          setValue={setValue}
          setItems={setItems}
          containerStyle={{ width: 180 }}
          style={{ backgroundColor: "#fff", borderColor: "#ccc" }}
          dropDownContainerStyle={{
            backgroundColor: "#fff",
            borderColor: "#ccc",
          }}
          zIndex={1000}
        />
      </View>
      {loading || loadingMenu ? (
        <View className="h-40 justify-center items-center">
          <ActivityIndicator size="large" color="#f97316" />
        </View>
      ) : (
        <ScrollView>
          {renderMealSection("BREAKFAST")}
          {renderMealSection("LUNCH")}
          {renderMealSection("DINNER")}
        </ScrollView>
      )}
    </View>
  );
};

export default MenuManagementScreen;

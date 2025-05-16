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
import type { MenuData } from "@/types/types";
import DropDownPicker from "react-native-dropdown-picker";
import MenuMealSection from "@/components/MenuMealSection";

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

  return (
    <View className="flex-1 bg-[#f9f6f3] px-4 py-6 mt-12">
      <View className="justify-center items-center">
        <Text className="text-3xl font-bold mb-1">Menu Management</Text>
      </View>
      <View className="flex-row justify-between items-center mb-6 mt-6">
        <View>
          <Text className="text-2xl font-bold">Menu Items</Text>
          <Text className="text-base text-gray-500">Manage your mess menu</Text>
        </View>
        <TouchableOpacity
          className="bg-[#F97015] px-4 py-2 rounded-lg"
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
          <MenuMealSection meal="BREAKFAST" items={menu.BREAKFAST} />
          <MenuMealSection meal="LUNCH" items={menu.LUNCH} />
          <MenuMealSection meal="DINNER" items={menu.DINNER} />
        </ScrollView>
      )}
    </View>
  );
};

export default MenuManagementScreen;

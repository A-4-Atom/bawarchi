import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
  Modal,
  TextInput,
  Button,
} from "react-native";
import { useEffect, useState } from "react";
import { useGlobalContext } from "@/context/GlobalProvider";
import { weekDays } from "@/constants/constants";
import type { MenuData } from "@/types/types";
import DropDownPicker from "react-native-dropdown-picker";
import AddMenuItemModal from "@/components/AddMenuItemModal";
import EditMenuItemModal from "@/components/EditMenuItemModal";
import MenuMealSection from "@/components/MenuMealSection";
import axios from "axios";
import { useAuth } from "@clerk/clerk-react";

const emptyMenu: MenuData = { BREAKFAST: [], LUNCH: [], DINNER: [] };
const backendUrl = process.env.EXPO_PUBLIC_BACKEND_URL;

const MenuManagementScreen = () => {
  const { getMenuForDay, allMenus, loadingMenu } = useGlobalContext()!;
  const { getToken } = useAuth();
  const [selectedDay, setSelectedDay] = useState(
    weekDays[new Date().getDay() === 0 ? 6 : new Date().getDay() - 1]
  );
  const [menu, setMenu] = useState<MenuData>(
    allMenus[selectedDay] || emptyMenu
  );
  const [loading, setLoading] = useState(false);
  // Main screen dropdown state
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(selectedDay);
  const [items, setItems] = useState(
    weekDays.map((day) => ({
      label: day.charAt(0) + day.slice(1).toLowerCase(),
      value: day,
    }))
  );

  const [addDayItems, setAddDayItems] = useState(
    weekDays.map((day) => ({
      label: day.charAt(0) + day.slice(1).toLowerCase(),
      value: day,
    }))
  );

  // Modal state for Add Menu Item
  const [showAddModal, setShowAddModal] = useState(false);
  // Modal state for Edit Menu Item
  const [showEditModal, setShowEditModal] = useState(false);
  const [editItem, setEditItem] = useState<any>(null);
  // Helper to get day label for EditMenuItemModal
  const getDayLabel = (dayValue: string) => {
    const found = addDayItems.find((d) => d.value === dayValue);
    return found ? found.value : addDayItems[0].value;
  };

  // Handler for edit button
  const handleEdit = (item: any) => {
    setEditItem({
      ...item,
      day: getDayLabel(item.day || selectedDay),
      type: item.type || "BREAKFAST",
      description: item.description || "",
    });
    setShowEditModal(true);
  };

  // Handler for update (PATCH)
  const handleUpdate = async (updated: any) => {
    try {
      const token = await getToken();
      await axios.patch(
        `${backendUrl}/api/menu/${updated.id}`,
        {
          name: updated.name,
          day: updated.day,
          price: updated.price,
          type: updated.type,
          description: updated.description,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      alert("Menu item updated successfully!");
      // Refetch menu for the selected day
      const updatedMenu = await getMenuForDay(selectedDay, true);
      setMenu(updatedMenu || emptyMenu);
    } catch (error: any) {
      alert(`Error updating menu item: ${error.message}`);
    }
    setShowEditModal(false);
    setEditItem(null);
  };
  const mealTypes = [
    { label: "Breakfast", value: "BREAKFAST" },
    { label: "Lunch", value: "LUNCH" },
    { label: "Dinner", value: "DINNER" },
  ];

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
      {/* Add Menu Item Modal */}
      <AddMenuItemModal
        visible={showAddModal}
        onClose={() => setShowAddModal(false)}
        onAdd={async (item) => {
          try {
            const token = await getToken();
            const response = await axios.post(
              `${backendUrl}/api/menu/`,
              {
                name: item.name,
                day: item.day,
                price: item.price,
                type: item.type,
                description: item.description,
              },
              {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              }
            );
            console.log("Menu item added successfully:", response.data);
            alert("Menu item added successfully!");

            // Refetch the menu for the selected day, forcing a fetch
            const updatedMenu = await getMenuForDay(selectedDay, true);
            setMenu(updatedMenu || emptyMenu);
          } catch (error: any) {
            alert(`Error adding menu item: ${error.message}`);
          }
          setShowAddModal(false);
        }}
        dayOptions={addDayItems}
        mealTypes={mealTypes}
      />

      {/* Edit Menu Item Modal */}
      {editItem && (
        <EditMenuItemModal
          visible={showEditModal}
          onClose={() => {
            setShowEditModal(false);
            setEditItem(null);
          }}
          onUpdate={handleUpdate}
          dayOptions={addDayItems}
          mealTypes={mealTypes}
          initialData={editItem}
        />
      )}

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
          onPress={() => setShowAddModal(true)}
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
          <MenuMealSection
            meal="BREAKFAST"
            items={menu.BREAKFAST}
            onEdit={handleEdit}
          />
          <MenuMealSection
            meal="LUNCH"
            items={menu.LUNCH}
            onEdit={handleEdit}
          />
          <MenuMealSection
            meal="DINNER"
            items={menu.DINNER}
            onEdit={handleEdit}
          />
        </ScrollView>
      )}
    </View>
  );
};

export default MenuManagementScreen;

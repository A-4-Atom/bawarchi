import { View, Text } from "react-native";
import MenuItemRow from "./MenuItemRow";
import type { MenuItem } from "@/types/types";

interface MenuMealSectionProps {
  meal: string;
  items: (MenuItem & { description?: string })[];
}

const MenuMealSection = ({
  meal,
  items,
  onEdit,
  onDelete,
}: MenuMealSectionProps & {
  onEdit?: (item: MenuItem & { description?: string }) => void;
  onDelete?: (item: MenuItem & { description?: string }) => void;
}) => (
  <View className="mb-8">
    <Text className="text-2xl font-bold mb-2 mt-2">
      {meal.charAt(0) + meal.slice(1).toLowerCase()}
    </Text>
    <View className="flex-row px-1 mb-2">
      <Text className="w-1/4 font-semibold">Name</Text>
      <Text className="w-1/2 font-semibold">Description</Text>
      <Text className="w-1/6 font-semibold">Actions</Text>
    </View>
    {items && items.length > 0 ? (
      items.map((item) => (
        <MenuItemRow
          key={item.id}
          item={{ ...item, type: meal }}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))
    ) : (
      <Text className="text-gray-400 ml-2">No items</Text>
    )}
  </View>
);

export default MenuMealSection;

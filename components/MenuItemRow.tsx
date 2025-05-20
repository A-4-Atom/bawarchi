import { View, Text, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import type { MenuItem } from "@/types/types";

interface MenuItemRowProps {
  item: MenuItem & { description?: string; type?: string };
  onEdit?: (item: MenuItem & { description?: string; type?: string }) => void;
  onDelete?: (item: MenuItem & { description?: string; type?: string }) => void;
}

const MenuItemRow = ({ item, onEdit, onDelete }: MenuItemRowProps) => (
  <View className="flex-row items-center py-2 border-b border-gray-200">
    <Text className="w-1/4">{item.name}</Text>
    <Text className="w-1/2 text-gray-500 pr-1">{item.description || "-"}</Text>
    <View className="w-1/6 flex-row gap-x-3">
      <TouchableOpacity
        className="p-2 bg-gray-100 rounded border border-gray-300"
        onPress={() => onEdit && onEdit(item)}
      >
        <Ionicons name="create-outline" size={20} color="#374151" />
      </TouchableOpacity>
      <TouchableOpacity
        className="p-2 bg-red-100 rounded border border-red-300"
        onPress={() => onDelete && onDelete(item)}
      >
        <Ionicons name="trash-outline" size={20} color="#dc2626" />
      </TouchableOpacity>
    </View>
  </View>
);

export default MenuItemRow;

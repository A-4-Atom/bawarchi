import React, { useState, useEffect } from "react";
import { Modal, View, Text, TextInput, Button } from "react-native";
import DropDownPicker from "react-native-dropdown-picker";
import type { WeekDays } from "../types/types";

type DayType = WeekDays[number];

interface EditMenuItemModalProps {
  visible: boolean;
  onClose: () => void;
  onUpdate: (item: {
    id: string;
    name: string;
    price: number;
    description: string;
    day: DayType;
    type: string;
  }) => void;
  dayOptions: { label: string; value: DayType }[];
  mealTypes: { label: string; value: string }[];
  initialData: {
    id: string;
    name: string;
    price: number;
    description: string;
    day: DayType;
    type: string;
  };
}

const EditMenuItemModal: React.FC<EditMenuItemModalProps> = ({
  visible,
  onClose,
  onUpdate,
  dayOptions,
  mealTypes,
  initialData,
}) => {
  const [name, setName] = useState(initialData.name || "");
  const [price, setPrice] = useState(initialData.price || 0);
  const [description, setDescription] = useState(initialData.description || "");
  const [day, setDay] = useState<DayType>(initialData.day);
  const [dayOpen, setDayOpen] = useState(false);
  const [type, setType] = useState(initialData.type);
  const [typeOpen, setTypeOpen] = useState(false);

  // Reset form when modal opens or initialData changes
  useEffect(() => {
    if (visible) {
      setName(initialData.name || "");
      setPrice(initialData.price || 0);
      setDescription(initialData.description || "");
      setDay(initialData.day);
      setType(initialData.type);
    }
  }, [visible, initialData]);

  const handleUpdate = () => {
    onUpdate({
      id: initialData.id,
      name,
      price,
      description,
      day,
      type,
    });
  };

  return (
    <Modal visible={visible} transparent animationType="slide">
      <View className="flex-1 justify-center items-center bg-black/50">
        <View className="bg-white p-6 rounded-lg w-80">
          <Text className="text-lg font-bold mb-2">Edit Menu Item</Text>
          <TextInput
            placeholder="Name"
            value={name}
            onChangeText={setName}
            className="border p-2 mb-3 rounded"
          />
          <TextInput
            placeholder="Price"
            value={price === 0 ? "" : price.toString()}
            onChangeText={(text) => setPrice(parseFloat(text) || 0)}
            keyboardType="numeric"
            className="border p-2 mb-3 rounded"
          />
          <TextInput
            placeholder="Description"
            value={description}
            onChangeText={setDescription}
            multiline
            textAlignVertical="top"
            className="border p-2 mb-3 rounded"
            style={{ minHeight: 60 }}
          />
          <Text className="font-semibold mb-1 mt-2">Day</Text>
          <DropDownPicker
            open={dayOpen}
            value={day}
            items={dayOptions}
            setOpen={setDayOpen}
            setValue={setDay}
            setItems={() => {}}
            containerStyle={{ width: 180, marginBottom: 12 }}
            style={{ backgroundColor: "#fff", borderColor: "#ccc" }}
            dropDownContainerStyle={{
              backgroundColor: "#fff",
              borderColor: "#ccc",
            }}
            zIndex={2000}
          />
          <Text className="font-semibold mb-1 mt-2">Meal Type</Text>
          <DropDownPicker
            open={typeOpen}
            value={type}
            items={mealTypes}
            setOpen={setTypeOpen}
            setValue={setType}
            setItems={() => {}}
            containerStyle={{ width: 180, marginBottom: 12 }}
            style={{ backgroundColor: "#fff", borderColor: "#ccc" }}
            dropDownContainerStyle={{
              backgroundColor: "#fff",
              borderColor: "#ccc",
            }}
            zIndex={1500}
          />
          <View className="flex-row justify-end mt-4 gap-x-2">
            <View style={{ borderRadius: 8, overflow: "hidden" }}>
              <Button title="Cancel" color="#888" onPress={onClose} />
            </View>
            <View style={{ borderRadius: 8, overflow: "hidden" }}>
              <Button title="Update" color="#F97015" onPress={handleUpdate} />
            </View>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default EditMenuItemModal;

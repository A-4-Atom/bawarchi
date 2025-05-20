import React, { useState, useEffect } from "react";
import { Modal, View, Text, TextInput, Button } from "react-native";
import DropDownPicker from "react-native-dropdown-picker";
import type { WeekDays } from "../types/types";

type DayType = WeekDays[number];

interface AddMenuItemModalProps {
  visible: boolean;
  onClose: () => void;
  onAdd: (item: {
    name: string;
    price: number;
    description: string;
    day: DayType;
    type: string;
  }) => void;
  dayOptions: { label: string; value: DayType }[];
  mealTypes: { label: string; value: string }[];
}

const AddMenuItemModal: React.FC<AddMenuItemModalProps> = ({
  visible,
  onClose,
  onAdd,
  dayOptions,
  mealTypes,
}) => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [description, setDescription] = useState("");
  const [day, setDay] = useState<DayType>(dayOptions[0]?.value);
  const [dayOpen, setDayOpen] = useState(false);
  const [type, setType] = useState(mealTypes[0]?.value);
  const [typeOpen, setTypeOpen] = useState(false);

  // Reset form when modal opens
  useEffect(() => {
    if (visible) {
      setName("");
      setPrice(0);
      setDescription("");
      setDay(dayOptions[0]?.value);
      setType(mealTypes[0]?.value);
    }
  }, [visible, dayOptions, mealTypes]);

  const handleAdd = () => {
    onAdd({ name, price, description, day, type });
  };

  return (
    <Modal visible={visible} transparent animationType="slide">
      <View className="flex-1 justify-center items-center bg-black/50">
        <View className="bg-white p-6 rounded-lg w-80">
          <Text className="text-lg font-bold mb-2">Add Menu Item</Text>
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
            // Items are static, so we don't need to set them again
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
              <Button title="Add" color="#F97015" onPress={handleAdd} />
            </View>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default AddMenuItemModal;

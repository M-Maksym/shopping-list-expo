import { backgroundColors } from "@/constants/Colors";
import { useListCreation } from "@/context/ListCreationContext";
import { useRouter } from "expo-router";
import { FlatList, Pressable, Text, View } from "react-native";

export default function ColorPickerScreen() {
  const { setSelectedColor } = useListCreation();
  const router = useRouter();
  const handleColorSelect = (color: string) => {
    setSelectedColor(color);
    router.back();
  };
  return (
    <FlatList
      data={backgroundColors}
      renderItem={({ item }) => (
        <Pressable
          onPress={() => handleColorSelect(item)}
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <View
            style={{
              width: 40,
              height: 40,
              backgroundColor: item,
              borderRadius: 100,
            }}
          />
        </Pressable>
      )}
      numColumns={5}
      keyExtractor={(item) => item}
      automaticallyAdjustContentInsets
      contentInsetAdjustmentBehavior="automatic"
      contentContainerStyle={{
        padding: 16,
        paddingBottom: 100,
        gap: 16
      }}
    />
  );
}

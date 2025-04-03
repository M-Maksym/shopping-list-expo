import { ThemedText } from "@/components/ThemedText";
import { BodyScrollView } from "@/components/ui/BodyScrollView";
import Button from "@/components/ui/button";
import TextInput from "@/components/ui/text-input";
import { appleBlue, backgroundColors, emojies } from "@/constants/Colors";
import { useListCreation } from "@/context/ListCreationContext";
import { useAddShoppingListCallback } from "@/stores/ShopingListsStore";
import { Link, Stack, useRouter } from "expo-router";
import * as React from "react";
import { StyleSheet, Text, View } from "react-native";

export default function CreateScreen() {
  const router = useRouter();
  const [listName, setListName] = React.useState("");
  const [listDescription, setListDescription] = React.useState("");
  const { selectedColor, selectedEmoji, setSelectedColor, setSelectedEmoji } =
    useListCreation();

  const handleCreateList = () => {
    if (!listName) {
      alert("Please enter a name for your shopping list.");
      return;
    }
    const listId = useaddShoppingList(
      listName,
      listDescription,
      selectedEmoji,
      selectedColor
    );
    setListName("");
    setListDescription("");
    router.replace({
      pathname: "/list/[listId]",
      params: { listId },
    });
  };
  const useaddShoppingList = useAddShoppingListCallback();

  React.useEffect(() => {
    setSelectedEmoji(emojies[Math.floor(Math.random() * emojies.length)]);
    setSelectedColor(
      backgroundColors[Math.floor(Math.random() * backgroundColors.length)]
    );

    return () => {
      setSelectedEmoji("");
      setSelectedColor("");
    };
  }, []);
  return (
    <>
      <Stack.Screen
        options={{
          headerTitle: "New List",
          headerLargeTitle: false,
        }}
      />
      <BodyScrollView contentContainerStyle={styles.scrollViewContent}>
        <View style={styles.inputContainer}>
          <TextInput
            placeholder="Name"
            size="lg"
            variant="ghost"
            returnKeyType="done"
            onSubmitEditing={handleCreateList}
            onChangeText={setListName}
            value={listName}
            inputStyle={styles.titleInput}
            autoFocus
            containerStyle={styles.titleInputContainer}
          />
          <Link
            href={{
              pathname: "/emoji-picker",
            }}
            style={[styles.emojiButton, { borderColor: selectedColor }]}
          >
            <View style={styles.emojiContainer}>
              <Text>{selectedEmoji}</Text>
            </View>
          </Link>
          <Link
            href={{
              pathname: "/color-picker",
            }}
            style={[styles.emojiButton, { borderColor: selectedColor }]}
          >
            <View style={styles.emojiContainer}>
              <View
                style={{
                  width: 24,
                  height: 24,
                  borderRadius: 100,
                  backgroundColor: selectedColor,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              />
            </View>
          </Link>
        </View>
        <TextInput
          placeholder="Description"
          variant="ghost"
          returnKeyType="done"
          onSubmitEditing={handleCreateList}
          onChangeText={setListDescription}
          value={listDescription}
          inputStyle={styles.descriptionInput}
        />
        <Button
          onPress={handleCreateList}
          disabled={!listName}
          variant="ghost"
          textStyle={styles.createButtonText}
        >
          Create List
        </Button>
      </BodyScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  scrollViewContent: {
    padding: 16,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  titleInput: {
    fontWeight: "600",
    fontSize: 28,
    padding: 0,
  },
  titleInputContainer: {
    flexGrow: 1,
    flexShrink: 1,
    maxWidth: "auto",
    marginBottom: 0,
  },
  emojiButton: {
    padding: 1,
    borderWidth: 3,
    borderRadius: 100,
  },
  emojiContainer: {
    width: 28,
    height: 28,
    alignItems: "center",
    justifyContent: "center",
  },
  descriptionInput: {
    padding: 0,
  },
  createButtonText: {
    color: appleBlue,
    fontWeight: "normal",
  },
  colorButton: {
    padding: 1,
    borderWidth: 3,
    borderRadius: 100,
  },
  colorContainer: {
    width: 28,
    height: 28,
    alignItems: "center",
    justifyContent: "center",
  },
});

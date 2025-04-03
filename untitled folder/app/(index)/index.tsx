import { ThemedText } from "@/components/ThemedText";
import { BodyScrollView } from "@/components/ui/BodyScrollView";
import Button from "@/components/ui/button";
import { useClerk } from "@clerk/clerk-expo";
import { Link, Stack, useRouter } from "expo-router";
import { FlatList, Platform, Pressable, StyleSheet, View } from "react-native";
import * as React from "react";
import { IconSymbol } from "@/components/ui/IconSymbol";
import { appleBlue, backgroundColors } from "@/constants/Colors";
import { useShoppingListIds } from "@/stores/ShopingListsStore";
import { IconCircle } from "@/components/IconCircle";
import ShoppingListItem from "@/components/ShopingListItem";

export default function HomeScreen() {
  const router = useRouter();
  const shoppingLisdIds = useShoppingListIds();

  const handleNewListPress = () => {
    router.push("/list/new");
  };

  const renderHeaderRight = () => {
    return (
      <Pressable onPress={() => router.push("/(index)/list/new")}>
        <IconSymbol name="plus" color={appleBlue} />
      </Pressable>
    );
  };
  const renderHeaderLeft = () => {
    return (
      <Pressable onPress={() => router.push("/profile")}>
        <IconSymbol name="gear" color={appleBlue} />
      </Pressable>
    );
  };
  const renderEmptyList = () => (
    <BodyScrollView contentContainerStyle={style.emptyStateContainer}>
      <IconCircle
        emoji="🛒"
        backgroundColor={
          backgroundColors[Math.floor(Math.random() * backgroundColors.length)]
        }
      />
      <Button onPress={handleNewListPress} variant="ghost">
        Create your first list
      </Button>
    </BodyScrollView>
  );

  return (
    <>
      <Stack.Screen
        options={{
          headerRight: renderHeaderRight,
          headerLeft: renderHeaderLeft,
        }}
      />
      <FlatList
        data={shoppingLisdIds}
        renderItem={({ item: listId }) => <ShoppingListItem listId={listId} />}
        // renderItem={({ item: listId }) => (
        //   <Link href={{ pathname: "/list/[listId]", params: { listId } }}>
        //     {listId}
        //   </Link>
        // )}
        contentContainerStyle={style.listContainer}
        contentInsetAdjustmentBehavior="automatic"
        ListEmptyComponent={renderEmptyList}
      />
    </>
  );
}

const style = StyleSheet.create({
  listContainer: {
    paddingTop: 8,
  },
  emptyStateContainer: {
    alignItems: "center",
    gap: 8,
    paddingTop: 100,
  },
  headerButton: {
    padding: 8,
    paddingRight: 0,
    marginHorizontal: Platform.select({ web: 16, default: 0 }),
  },
  headerButtonLeft: {
    paddingLeft: 0,
  },
});

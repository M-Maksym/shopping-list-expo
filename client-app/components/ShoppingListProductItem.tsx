import React from "react";
import * as Haptics from "expo-haptics";
import { useRouter } from "expo-router";
import { Pressable, StyleSheet, View } from "react-native";
import ReanimatedSwipeable from "react-native-gesture-handler/ReanimatedSwipeable";
import Reanimated, {
  SharedValue,
  useAnimatedStyle,
} from "react-native-reanimated";
import { appleRed, borderColor } from "@/constants/Colors";
import {
  useDelShoppingListProductCallback,
  useShoppingListProductCell,
  useShoppingListValue,
} from "@/stores/ShoppingListStore";
import { ThemedText } from "./ThemedText";
import { IconSymbol } from "./ui/IconSymbol";

export default function ShoppingListProductItem({
  listId,
  productId,
}: {
  listId: string;
  productId: string;
}) {
  const router = useRouter();
  const [name] = useShoppingListProductCell(listId, productId, "name");
  const [color] = useShoppingListValue(listId, "color");
  const [isPurchased, setIsPurchased] = useShoppingListProductCell(
    listId,
    productId,
    "isPurchased"
  );

  const deleteCallback = useDelShoppingListProductCallback(listId, productId);

  const RightAction = (
    prog: SharedValue<number>,
    drag: SharedValue<number>
  ) => {
    const styleAnimation = useAnimatedStyle(() => {
      return {
        transform: [{ translateX: drag.value + 80 }],
      };
    });

    return (
      <Pressable
        onPress={() => {
          if (process.env.EXPO_OS === "ios") {
            Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
          }
          deleteCallback();
        }}
      >
        <Reanimated.View style={[styleAnimation, styles.rightAction]}>
          <IconSymbol name="trash.fill" size={24} color="white" />
        </Reanimated.View>
      </Pressable>
    );
  };

  return (
    <ReanimatedSwipeable
      key={productId}
      friction={2}
      enableTrackpadTwoFingerGesture
      rightThreshold={40}
      renderRightActions={RightAction}
      overshootRight={false}
      enableContextMenu
      containerStyle={{
        paddingBottom: 12,
        paddingHorizontal: 16,
      }}
    >
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          gap: 8,
        }}
      >
        <Pressable
          onPress={() => {
            if (process.env.EXPO_OS === "ios") {
              Haptics.notificationAsync(
                Haptics.NotificationFeedbackType.Success
              );
            }
            setIsPurchased(!isPurchased);
          }}
        >
          <IconSymbol
            name={isPurchased ? "checkmark.circle.fill" : "circle"}
            size={28}
            color={color}
          />
        </Pressable>
        <Pressable
          onPress={() => {
            router.push({
              pathname: "/list/[listId]/product/[productId]",
              params: { listId, productId },
            });
          }}
          style={styles.swipeable}
        >
          <ThemedText
            type="defaultSemiBold"
            numberOfLines={1}
            ellipsizeMode="tail"
            style={{
              maxWidth: "95%",
              opacity: isPurchased ? 0.5 : 1,
              textDecorationLine: isPurchased ? "line-through" : "none",
            }}
          >
            {name}
          </ThemedText>
          {/* <IconSymbol name="chevron.right" size={14} color="#A1A1AA" /> */}
        </Pressable>
      </View>
    </ReanimatedSwipeable>
  );
}

const styles = StyleSheet.create({
  swipeable: {
    flexGrow: 1,
    flexShrink: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: borderColor,
    gap: 8,
    paddingVertical: 8,
  },
  rightAction: {
    width: 80,
    height: 40,
    backgroundColor: appleRed,
    alignItems: "center",
    justifyContent: "center",
  },
});

import React from "react";
import { View, ViewStyle } from "react-native";
import { ThemedText } from "./ThemedText";

interface IconCircleProps {
  emoji: string;
  backgroundColor?: string;
  size?: number;
  style?: ViewStyle;
}

export function IconCircle({
  emoji,
  backgroundColor = "lightblue",
  size = 48,
  style,
}: IconCircleProps) {
  return (
    <View
      style={[
        {
          backgroundColor,
          width: size,
          height: size,
          borderRadius: 12,
          alignItems: "center",
          justifyContent: "center",
        },
        style,
      ]}
    >
      <ThemedText style={{ fontSize: 22 }}>{emoji}</ThemedText>
    </View>
  );
}

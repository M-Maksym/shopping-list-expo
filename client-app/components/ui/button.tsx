import { appleBlue, zincColors } from "@/constants/Colors";
import React from "react";
import { ActivityIndicator, Pressable, StyleSheet, TextStyle, useColorScheme, ViewStyle } from "react-native";
import { ThemedText } from "../ThemedText";
import { isLoaded } from "expo-font";

type ButtonVariant = "filled" | "outline" | "ghost";
type ButtonSize = "sm" | "md" | "lg";

interface ButtonProps {
    onPress?: ()=>void;
    variant?: ButtonVariant;
    size?: ButtonSize;
    disabled?: boolean;
    children: React.ReactNode;
    loading?: boolean;
    style?: ViewStyle;
    textStyle?: TextStyle;
}

export const Button: React.FC<ButtonProps> = ({
    onPress,
    variant = "filled",
    size = "md",
    disabled = false,
    children,
    loading = false,
    style,
    textStyle
}) => {
    const colorScheme = useColorScheme();
    const isDark = colorScheme === "dark";
    const sizeStyle: Record<ButtonSize, {height: number; fontSize: number; padding: number}> = {
        sm: { height: 36, fontSize: 14, padding: 12 },
        md: { height: 44, fontSize: 16, padding: 16 },
        lg: { height: 55, fontSize: 18, padding: 20 }
    }

    const getVariantStyle = () => {
        const baseStyle: ViewStyle = {
            borderRadius: 12,
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
        };
        switch (variant) {
            case "filled":
                return {
                   ...baseStyle,
                    backgroundColor: isDark? zincColors[50] : zincColors[900],
                };
            case "outline":
                return {
                   ...baseStyle,
                    backgroundColor: "transparent",
                    borderColor: isDark? zincColors[700] : zincColors[300],
                    borderWidth: 1,
                };
            case "ghost":
                return {
                   ...baseStyle,
                    backgroundColor: "transparent",
                    borderColor: isDark? "#212121" : "#ffffff",
                };
            default:
        }
    }
    const getTextColor = () => {
        if(disabled){
            return isDark? zincColors[500] : zincColors[400];
        }

        switch (variant) {
            case "filled":
                return isDark? zincColors[900] : zincColors[50];
            case "outline":
            case "ghost":
                return appleBlue
        }
    }

    return ( 
        <Pressable
            onPress={onPress}
            disabled={disabled || loading}
            style={[
                getVariantStyle(),
                {
                    height: sizeStyle[size].height,
                    paddingHorizontal: sizeStyle[size].padding,
                    opacity: disabled ? 0.5 : 1
                },
                style
            ]}
        >
            {loading ? (
                <ActivityIndicator color={getTextColor()}/>
            ) : (
                <ThemedText
                    style={StyleSheet.flatten([
                        {
                            fontSize: sizeStyle[size].fontSize,
                            color: getTextColor(),
                            textAlign: "center",
                            fontWeight: "700",
                            marginBottom: 0
                        }
                    ])}
                >{children}</ThemedText>
            )}
        </Pressable>
    )
}

export default Button;
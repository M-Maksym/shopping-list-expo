import Button from "@/components/ui/button";
import { ListCreationProvider } from "@/context/ListCreationContext";
import ShoppingListsStore from "@/stores/ShopingListsStore";
import { useUser } from "@clerk/clerk-expo";
import { Redirect, Stack, useRouter } from "expo-router";
import { Provider as TinyBaseProvider } from "tinybase/ui-react";

export default function HomeRouteLayout() {
  const router = useRouter();
  const { user } = useUser();
  if (!user) {
    return <Redirect href={"/(auth)"} />;
  }
  return (
    <TinyBaseProvider>
      <ShoppingListsStore />
      <ListCreationProvider>
        <Stack
          screenOptions={{
            ...(process.env.EXPO_OS !== "ios"
              ? {}
              : {
                  headerLargeTitle: true,
                  headerTransparent: true,
                  headerBlurEffect: "systemChromeMaterial",
                  headerLargeTitleShadowVisible: false,
                  headerShadowVisible: true,
                  headerLargeStyle: {
                    // NEW: Make the large title transparent to match the background.
                    backgroundColor: "transparent",
                  },
                }),
          }}
        >
          <Stack.Screen
            name="index"
            options={{ headerTitle: "Shopping list" }}
          />
          <Stack.Screen
            name="list/new/index"
            options={{
              presentation: "formSheet",
              sheetGrabberVisible: true,
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="/profile"
            options={{
              presentation: "formSheet",
              sheetGrabberVisible: true,
              headerShown: false,
              sheetAllowedDetents: [0.75, 1],
            }}
          />
          <Stack.Screen
            name="/list/new/scan"
            options={{
              presentation: "fullScreenModal",
              sheetGrabberVisible: false,
              headerLargeTitle: false,
              headerTitle: "Scan QR Code",
              headerLeft: () => (
                <Button variant="ghost" onPress={() => router.back()}>
                  Cancel
                </Button>
              ),
            }}
          />
          <Stack.Screen
            name="emoji-picker"
            options={{
              headerTitle: "Select an emoji",
              headerLargeTitle: false,
              presentation: "formSheet",
              sheetAllowedDetents: [0.5, 0.75, 1],
              sheetGrabberVisible: true,
            }}
          />
          <Stack.Screen
            name="color-picker"
            options={{
              headerTitle: "Select an color",
              headerLargeTitle: false,
              presentation: "formSheet",
              sheetAllowedDetents: [0.5, 0.75, 1],
              sheetGrabberVisible: true,
            }}
          />
          <Stack.Screen
            name="list/[listId]/product/[productId]"
            options={{
              presentation: "formSheet",
              sheetAllowedDetents: [0.75, 1],
              sheetGrabberVisible: true,
              headerLargeTitle: false,
              headerTitle: "Details",
            }}
          />
          <Stack.Screen
            name="list/[listId]/share"
            options={{
              presentation: "formSheet",
              sheetGrabberVisible: true,
              headerLargeTitle: false,
              headerTitle: "Invite",
            }}
          />
          <Stack.Screen
            name="profile"
            options={{
              presentation: "formSheet",
              sheetAllowedDetents: [0.75, 1],
              sheetGrabberVisible: true,
              headerShown: false,
            }}
          />
        </Stack>
      </ListCreationProvider>
    </TinyBaseProvider>
  );
}

import { useRouter } from "expo-router";
import {
  Alert,
  Image,
  Linking,
  Pressable,
  Share,
  StyleSheet,
  View,
} from "react-native";
import { ThemedText } from "@/components/ThemedText";
import { BodyScrollView } from "@/components/ui/BodyScrollView";
import Button from "@/components/ui/button";
import { appleRed } from "@/constants/Colors";
import { useClerk, useUser } from "@clerk/clerk-expo";

export default function ProfileScreen() {
  const { user } = useUser();
  const { signOut } = useClerk();
  const router = useRouter();

  const handleSignOut = async () => {
    await signOut();
    router.replace("/(auth)");
  };

  const handleDeleteAccount = async () => {
    try {
      Alert.alert(
        "Delete account",
        "Are you sure you want to delete your account? This action is irreversible.",
        [
          {
            text: "Cancel",
            style: "cancel",
          },
          {
            text: "Delete",
            onPress: async () => {
              await user?.delete();
              router.replace("/(auth)");
            },
            style: "destructive",
          },
        ]
      );
    } catch (error) {
      Alert.alert("Error", "Failed to delete account");
      console.error(error);
    }
  };

  return (
    <BodyScrollView contentContainerStyle={styles.container}>
      <View>
        <View style={styles.header}>
          {user?.imageUrl ? (
            <Image
              source={{ uri: user.imageUrl }}
              style={styles.profileImage}
            />
          ) : null}
          <View style={styles.userInfo}>
            <ThemedText type="defaultSemiBold" style={styles.email}>
              {user?.emailAddresses[0].emailAddress}
            </ThemedText>
            <ThemedText style={styles.joinDate}>
              Joined {user?.createdAt?.toDateString()}
            </ThemedText>
          </View>
        </View>
      </View>
      <View style={styles.section}>
        <ThemedText type="defaultSemiBold" style={styles.appTitle}>
          Shopping List: Sync & Share
        </ThemedText>
      </View>

      <Button
        onPress={handleSignOut}
        variant="ghost"
        textStyle={{ color: appleRed }}
      >
        Sign out
      </Button>

      <Button
        onPress={handleDeleteAccount}
        variant="ghost"
        textStyle={{ color: "gray" }}
      >
        Delete account
      </Button>
    </BodyScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    paddingTop: 32,
    gap: 24,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginRight: 16,
  },
  userInfo: {
    flex: 1,
  },
  email: {
    fontSize: 18,
    marginBottom: 4,
  },
  joinDate: {
    opacity: 0.7,
  },
  actionButtons: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 24,
    marginTop: 16,
  },
  actionButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  section: {
    backgroundColor: "rgba(150, 150, 150, 0.1)",
    borderRadius: 12,
    padding: 16,
    paddingVertical: 8,
  },
  appTitle: {
    textAlign: "center",
  },
  version: {
    textAlign: "center",
    opacity: 0.7,
  },
  infoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 8,
  },
  updateText: {
    color: "#34C759",
  },
});

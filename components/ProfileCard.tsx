import { View, Text, Image, Pressable } from "react-native";
import { useUser } from "@clerk/clerk-expo";
import { useRouter } from "expo-router";
import { useAuth } from "@clerk/clerk-expo";
import { Ionicons } from "@expo/vector-icons";

const ProfileCard = () => {
  const { user } = useUser();
  const { signOut } = useAuth();
  const router = useRouter();
  if (!user) return null;

  const profileImage = user.imageUrl || undefined;
  const initials = user.firstName?.[0]?.toUpperCase() || "U";
  const collegeName = user.unsafeMetadata?.collegeName || "-";
  const email = user.emailAddresses?.[0]?.emailAddress || "-";
  const memberSince = user.createdAt
    ? new Date(user.createdAt).toLocaleDateString("en-IN")
    : "-";

  // Handler for logout button
  const handleLogout = () => {
    signOut();
  };

  return (
    <View className="bg-white rounded-2xl shadow p-6 items-center w-full max-w-md self-center mt-2">
      {profileImage ? (
        <Image
          source={{ uri: profileImage }}
          className="w-20 h-20 rounded-full mb-3"
        />
      ) : (
        <View className="w-20 h-20 rounded-full bg-gray-200 mb-3 items-center justify-center">
          <Text className="text-3xl font-bold text-gray-500">{initials}</Text>
        </View>
      )}
      <Text className="text-2xl font-bold mt-1">
        {user.firstName} {user.lastName}
      </Text>
      {collegeName ? (
        <Text className="text-base text-gray-500 mb-2">
          {collegeName.toString()}
        </Text>
      ) : null}
      <View className="mt-2 w-full">
        <Text className="text-sm text-gray-700">Email</Text>
        <Text className="text-base mb-2">{email}</Text>
        <Text className="text-sm text-gray-700">Member since</Text>
        <Text className="text-base mb-4">{memberSince}</Text>
      </View>
      {user.unsafeMetadata?.isAdmin ? (
        <View className="w-full items-center mt-2">
          <Pressable className="w-full" onPress={() => router.push("/(admin)/analytics")}>
            <Text className="bg-[#F97015] text-white w-full text-center py-3 rounded-md font-semibold text-base">
              Admin Dashboard
            </Text>
          </Pressable>
        </View>
      ) : null}
      <Pressable
        className="w-full mt-6 flex-row justify-center items-center bg-red-500 py-3 rounded-md"
        onPress={handleLogout}
      >
        <Ionicons name="log-out-outline" size={22} color="#fff" />
        <Text className="text-white font-semibold text-base ml-2">Logout</Text>
      </Pressable>
    </View>
  );
};

export default ProfileCard;

import { Text, ScrollView } from "react-native";
import ProfileCard from "../../components/ProfileCard";
import MessCardSummary from "../../components/MessCardSummary";

const Profile = () => {
  return (
    <ScrollView className="flex-1 bg-[#f9f6f3] px-4 py-8 mt-7">
      <Text className="text-4xl font-bold mb-1 mt-8">My Profile</Text>
      <Text className="text-base text-gray-500 mb-6">
        Manage your account details and preferences
      </Text>
      <ProfileCard />
      <MessCardSummary />
    </ScrollView>
  );
};

export default Profile;

import {
  TextInput,
  View,
  Image,
  StyleSheet,
  TouchableOpacity,
  Text,
} from "react-native";
import { useSignUp } from "@clerk/clerk-expo";
import Spinner from "react-native-loading-spinner-overlay";
import { useState, useEffect } from "react";
import { Stack } from "expo-router";
import { Picker } from "@react-native-picker/picker";
import { useUser } from "@clerk/clerk-expo";

const Register = () => {
  const { isLoaded, signUp, setActive } = useSignUp();
  const { user } = useUser();
  const [name, setName] = useState("");
  const [college, setCollege] = useState("BVIMR");
  const [emailAddress, setEmailAddress] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [pendingVerification, setPendingVerification] = useState(false);
  const [code, setCode] = useState("");
  const [metadataUpdated, setMetadataUpdated] = useState(false);

  const onSignUpPress = async () => {
    if (!isLoaded) return;
    setLoading(true);

    try {
      await signUp.create({
        emailAddress,
        password,
      });

      await signUp.prepareEmailAddressVerification({ strategy: "email_code" });

      setPendingVerification(true);
    } catch (err: any) {
      alert(err.errors[0].message);
    } finally {
      setLoading(false);
    }
  };

  const onPressVerify = async () => {
    if (!isLoaded) {
      return;
    }
    setLoading(true);

    try {
      const completeSignUp = await signUp.attemptEmailAddressVerification({
        code,
      });

      await setActive({ session: completeSignUp.createdSessionId });

      await user?.update({
        unsafeMetadata: {
          fullName: name,
          collegeName: college,
        },
      });
    } catch (err: any) {
      alert(err.errors[0].message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const updateMetadata = async () => {
      if (user && !metadataUpdated && pendingVerification) {
        try {
          await user.update({
            unsafeMetadata: {
              fullName: name,
              collegeName: college,
            },
          });
          setMetadataUpdated(true);
        } catch (err: any) {
          console.error("Metadata update failed:", err);
        }
      }
    };

    updateMetadata();
  }, [user]);

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ headerBackVisible: true }} />
      <Spinner visible={loading} />

      {!pendingVerification && (
        <>
          <Image
            source={require("../../assets/images/registerImg.jpg")}
            style={styles.profileImage}
            resizeMode="contain"
          />
          <TextInput
            placeholder="Name"
            placeholderTextColor="#fff"
            value={name}
            onChangeText={setName}
            style={styles.inputField}
            autoCapitalize="words"
            inputMode="text"
          />
          <View style={styles.pickerContainer}>
            <Picker
              selectedValue={college}
              onValueChange={(itemValue) => setCollege(itemValue)}
              style={styles.picker}
              dropdownIconColor="#fff"
            >
              <Picker.Item label="BVIMR" value="BVIMR" />
              <Picker.Item label="BVICAM" value="BVICAM" />
              <Picker.Item label="BVCOE" value="BVCOE" />
            </Picker>
          </View>
          <TextInput
            placeholder="Email"
            placeholderTextColor="#fff"
            value={emailAddress}
            onChangeText={setEmailAddress}
            autoCapitalize="none"
            style={styles.inputField}
            inputMode="email"
          />
          <TextInput
            placeholder="Password"
            placeholderTextColor="#fff"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            style={styles.inputField}
            inputMode="text"
            autoCapitalize="none"
          />
          <View style={{ alignItems: "center", marginVertical: 10 }}>
            <Text style={styles.termsText}>
              By Registering you agree to our
            </Text>
            <Text style={styles.termsBold}>Terms & Conditions</Text>
          </View>
          <TouchableOpacity
            style={styles.registerButton}
            onPress={onSignUpPress}
          >
            <Text style={styles.registerButtonText}>Register</Text>
          </TouchableOpacity>
        </>
      )}

      {pendingVerification && (
        <>
          <Image
            source={require("../../assets/images/verifyImage.png")}
            className="w-1/2 h-64"
            resizeMode="contain" 
          />
          <View className="flex flex-col items-center justify-center mb-4 gap-5">
            <Text className="font-[Roboto-Bold] font-bold text-4xl">
              Verification
            </Text>
            <Text className="text-xl">Enter the OTP Sent in the E-Mail</Text>
          </View>
          <View className="w-full">
            <TextInput
              value={code}
              placeholder="Enter Code"
              style={styles.inputField}
              onChangeText={setCode}
              keyboardType="numeric"
            />
          </View>
          <TouchableOpacity
            style={styles.registerButton}
            onPress={onPressVerify}
          >
            <Text style={styles.registerButtonText}>Verify Email</Text>
          </TouchableOpacity>
        </>
      )}
    </View>
  );
};

export default Register;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF176",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 25,
  },
  profileImage: {
    width: 120,
    height: 120,
    marginBottom: 30,
    borderRadius: 60,
  },
  inputField: {
    width: "100%",
    height: 55,
    backgroundColor: "#F4B400",
    borderRadius: 15,
    paddingHorizontal: 20,
    marginBottom: 15,
    fontSize: 16,
    color: "#fff",
  },
  pickerContainer: {
    width: "100%",
    height: 55,
    backgroundColor: "#F4B400",
    borderRadius: 15,
    justifyContent: "center",
    marginBottom: 15,
    paddingHorizontal: 10,
  },
  picker: {
    color: "#fff",
    fontSize: 16,
  },
  termsText: {
    textAlign: "center",
    fontSize: 12,
    color: "#000",
  },
  termsBold: {
    fontWeight: "bold",
    color: "#000",
  },
  registerButton: {
    backgroundColor: "#FF9800",
    paddingVertical: 15,
    paddingHorizontal: 100,
    borderRadius: 30,
    marginTop: 20,
    boxShadow: "2px 4px 6px rgba(0, 0, 0, 0.3)", 
    elevation: 5,
  },
  registerButtonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
});

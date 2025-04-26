import {
  View,
  StyleSheet,
  TextInput,
  Text,
  TouchableOpacity,
  Image,
} from "react-native";
import React, { useState } from "react";
import { Stack } from "expo-router";
import { useSignIn } from "@clerk/clerk-expo";

const PwReset = () => {
  const [emailAddress, setEmailAddress] = useState("");
  const [password, setPassword] = useState("");
  const [code, setCode] = useState("");
  const [successfulCreation, setSuccessfulCreation] = useState(false);
  const { signIn, setActive } = useSignIn();

  // Request a passowrd reset code by email
  const onRequestReset = async () => {
    try {
      if (!signIn) return;
      await signIn.create({
        strategy: "reset_password_email_code",
        identifier: emailAddress,
      });
      setSuccessfulCreation(true);
    } catch (err: any) {
      alert(err.errors[0].message);
    }
  };

  // Reset the password with the code and the new password
  const onReset = async () => {
    try {
      if (!signIn) return;
      const result = await signIn.attemptFirstFactor({
        strategy: "reset_password_email_code",
        code,
        password,
      });
      console.log(result);
      alert("Password reset successfully");

      // Set the user session active, which will log in the user automatically
      await setActive({ session: result.createdSessionId });
    } catch (err: any) {
      alert(err.errors[0].message);
    }
  };

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ headerBackVisible: !successfulCreation }} />
      <Image
        source={require("../../assets/images/resetImage.png")}
        style={styles.resetImage}
        resizeMode="contain"
      />
      <Text className="text-center font-[Roboto-Bold] text-3xl my-4 mb-20">
        Reset Password
      </Text>

      {!successfulCreation && (
        <>
          <TextInput
            autoCapitalize="none"
            placeholder="Enter Email"
            value={emailAddress}
            onChangeText={setEmailAddress}
            style={styles.inputField}
          />
          <TouchableOpacity style={styles.resetButton} onPress={onRequestReset}>
            <Text style={styles.resetButtonText}>Send Reset Email</Text>
          </TouchableOpacity>
        </>
      )}

      {successfulCreation && (
        <>
          <View>
            <TextInput
              value={code}
              placeholder="Enter Code"
              style={styles.inputField}
              onChangeText={setCode}
              keyboardType="numeric"
            />
            <TextInput
              placeholder="Enter New password"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
              style={styles.inputField}
              inputMode="text"
              autoCapitalize="none"
            />
          </View>
          <TouchableOpacity style={styles.resetButton} onPress={onReset}>
            <Text style={styles.resetButtonText}>Set New Password</Text>
          </TouchableOpacity>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
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
  button: {
    margin: 8,
    alignItems: "center",
  },
  resetButton: {
    backgroundColor: "#FF9800",
    paddingVertical: 15,
    paddingHorizontal: 100,
    borderRadius: 30,
    marginTop: 20,
    boxShadow: "2px 4px 6px rgba(0, 0, 0, 0.3)", 
    elevation: 5,
    alignItems: "center",
  },
  resetButtonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
  resetImage: {
    width: 150,
    height: 150,
    marginBottom: 10,
    alignSelf: "center",
  },
});

export default PwReset;

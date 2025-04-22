import {
  TextInput,
  View,
  Image,
  StyleSheet,
  TouchableOpacity,
  Text,
} from 'react-native';
import { useSignUp } from '@clerk/clerk-expo';
import Spinner from 'react-native-loading-spinner-overlay';
import { useState } from 'react';
import { Stack } from 'expo-router';
import { Picker } from '@react-native-picker/picker';

const Register = () => {
  const { isLoaded, signUp, setActive } = useSignUp();

  const [name, setName] = useState('');
  const [college, setCollege] = useState('BVIMR');
  const [emailAddress, setEmailAddress] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const onSignUpPress = async () => {
    if (!isLoaded) return;
    setLoading(true);

    try {
      const result = await signUp.create({
        emailAddress,
        password,
      });

      await setActive({ session: result.createdSessionId });
    } catch (err: any) {
      alert(err.errors[0].message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ headerBackVisible: true }} />
      <Spinner visible={loading} />

      {/* Profile Icon */}
      <Image
        source={require('../../assets/profileImg.jpg')}
        style={styles.profileImage}
        resizeMode="contain"
      />

      {/* Name */}
      <TextInput
        placeholder="Name"
        placeholderTextColor="#fff"
        value={name}
        onChangeText={setName}
        style={styles.inputField}
      />

      {/* College Dropdown */}
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

      {/* Email */}
      <TextInput
        placeholder="Email"
        placeholderTextColor="#fff"
        value={emailAddress}
        onChangeText={setEmailAddress}
        autoCapitalize="none"
        style={styles.inputField}
      />

      {/* Password */}
      <TextInput
        placeholder="Password"
        placeholderTextColor="#fff"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={styles.inputField}
      />

      {/* Terms */}
      <View style={{ alignItems: 'center', marginVertical: 10 }}>
        <Text style={styles.termsText}>By Registering you agree to our</Text>
        <Text style={styles.termsBold}>Terms & Conditions</Text>
      </View>

      {/* Register Button */}
      <TouchableOpacity style={styles.registerButton} onPress={onSignUpPress}>
        <Text style={styles.registerButtonText}>Register</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Register;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF176',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 25,
  },
  profileImage: {
    width: 120,
    height: 120,
    marginBottom: 30,
    borderRadius: 60,
  },
  inputField: {
    width: '100%',
    height: 55,
    backgroundColor: '#F4B400',
    borderRadius: 15,
    paddingHorizontal: 20,
    marginBottom: 15,
    fontSize: 16,
    color: '#fff',
  },
  pickerContainer: {
    width: '100%',
    height: 55,
    backgroundColor: '#F4B400',
    borderRadius: 15,
    justifyContent: 'center',
    marginBottom: 15,
    paddingHorizontal: 10,
  },
  picker: {
    color: '#fff',
    fontSize: 16,
  },
  termsText: {
    textAlign: 'center',
    fontSize: 12,
    color: '#000',
  },
  termsBold: {
    fontWeight: 'bold',
    color: '#000',
  },
  registerButton: {
    backgroundColor: '#FF9800',
    paddingVertical: 15,
    paddingHorizontal: 50,
    borderRadius: 30,
    marginTop: 20,
    shadowColor: '#000',
    shadowOffset: { width: 2, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
  registerButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

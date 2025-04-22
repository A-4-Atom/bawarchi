import { useSignIn } from '@clerk/clerk-expo';
import { Link } from 'expo-router';
import React, { useState } from 'react';
import { 
  View, 
  StyleSheet, 
  TextInput,
  Image, 
  Button, 
  Pressable, 
  Text, 
  Alert, 
  TouchableOpacity, 
  ActivityIndicator 
} from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';

const Login = () => {
  const { signIn, setActive, isLoaded } = useSignIn();

  const [emailAddress, setEmailAddress] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  
  const onSignInPress = async () => {
    if (!isLoaded) {
      return;
    }
    setLoading(true);
    try {
      const completeSignIn = await signIn.create({
        identifier: emailAddress,
        password,
      });

      // This indicates the user is signed in
      await setActive({ session: completeSignIn.createdSessionId });
    } catch (err: any) {
      alert(err.errors[0].message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      {/* Top Image */}
      <View style={styles.imageContainer}>
        <Image
          source={require('../../assets/images/loginImg.jpg')}
          style={styles.topImage}
          resizeMode="cover"
        />
      </View>

      {/* Form Area */}
      <View style={styles.formContainer}>
        <Text style={styles.heading}>Sign In</Text>

        <TextInput
          placeholder="User Name"
          placeholderTextColor="#fff"
          value={emailAddress}
          onChangeText={setEmailAddress}
          style={styles.inputField}
        />
        <TextInput
          placeholder="Password"
          placeholderTextColor="#fff"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          style={styles.inputField}
        />

        {/* Remember me and forgot password */}
        <View style={styles.row}>
          <TouchableOpacity
            style={[styles.checkbox, rememberMe && styles.checkboxChecked]}
            onPress={() => setRememberMe(!rememberMe)}
          />
          <Text style={styles.rememberText}>Remember me</Text>

          <Pressable style={{ marginLeft: 'auto' }}>
            <Text style={styles.linkText}>Forgot Password?</Text>
          </Pressable>
        </View>

        {/* Login Button */}
        <TouchableOpacity onPress={onSignInPress} style={styles.loginButton}>
          {loading ? (
            <ActivityIndicator color="#000" />
          ) : (
            <Text style={styles.loginButtonText}>Login</Text>
          )}
        </TouchableOpacity>

        {/* Register */}
        <Text style={styles.registerText}>
          Don’t have an account?{' '}
          <Text style={styles.registerLink}>Register</Text> here!
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  imageContainer: {
    height: 300,
    overflow: 'hidden',
  },
  topImage: {
    width: '100%',
    height: '100%',
  },
  formContainer: {
    flex: 1,
    backgroundColor: '#FFA500',
    borderTopLeftRadius: 70,
    padding: 25,
    marginTop: -40, // to overlay slightly like in image
  },
  heading: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 20,
  },
  inputField: {
    height: 50,
    borderWidth: 1,
    borderColor: '#fff',
    borderRadius: 25,
    paddingHorizontal: 20,
    marginBottom: 15,
    color: '#fff',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  checkbox: {
    width: 15,
    height: 15,
    borderWidth: 1,
    borderColor: '#fff',
    marginRight: 8,
    borderRadius: 3,
  },
  checkboxChecked: {
    backgroundColor: '#000',
  },
  rememberText: {
    color: '#fff',
    fontSize: 12,
  },
  linkText: {
    color: '#fff',
    fontSize: 12,
    textDecorationLine: 'underline',
  },
  loginButton: {
    backgroundColor: '#FFEB3B',
    paddingVertical: 15,
    borderRadius: 30,
    alignItems: 'center',
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 2, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  loginButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
  },
  registerText: {
    textAlign: 'center',
    color: '#fff',
    fontSize: 12,
  },
  registerLink: {
    fontWeight: 'bold',
    textDecorationLine: 'underline',
  },
});


export default Login;
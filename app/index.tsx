import React, { useEffect, useState } from 'react';
import {
  View,
  StyleSheet,
  Image,
  Animated,
  ActivityIndicator,
  Text,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome'; // Import FontAwesome icons
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationProp } from '@react-navigation/native';

const Stack = createStackNavigator();



interface AppProps {
  navigation: NavigationProp<any, any>;
}

const App: React.FC<AppProps> = ({ navigation }) => {
  const [fontsLoaded, setFontsLoaded] = useState(false);
  const [opacity] = useState(new Animated.Value(0));
  const [isLoading, setIsLoading] = useState(true);
  const [isStarted, setIsStarted] = useState(false);
  

  useEffect(() => {
    Animated.timing(opacity, {
      toValue: 1,
      duration: 2000,
      useNativeDriver: true,
    }).start();

    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, [opacity]);

  const handleStart = () => {
    setIsStarted(true);
    navigation.reset({ index: 0, routes: [{ name: 'Index2' }] });
  };

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.imageContainer, { opacity }]}>
        <Image
          source={require('./image.png')}
          resizeMode="contain"
          style={styles.image}
        />
      </Animated.View>

      <View style={styles.inputContainer}>
        {isLoading && (
          <ActivityIndicator size="large" color="#FFFFFFFF" animating={true} />
        )}
      </View>

      <TouchableOpacity style={styles.button} onPress={handleStart}>
        <Text style={styles.buttonText}>Start</Text>
      </TouchableOpacity>
    </View>
  );
};

const Index2: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = () => {
    if (username && password) {
      setIsLoggedIn(true);
    } else {
      alert('Please fill in both username and password');
    }
  };

  const handleGmailLogin = () => {
    alert('Login with Gmail clicked');
  };

  const handleFacebookLogin = () => {
    alert('Login with Facebook clicked');
  };
  return (
    <View style={[styles.container, { backgroundColor: 'white' }]}>
      <Animated.View style={styles.imageContainer}>
        <Image
          source={require('./image1.png')}
          resizeMode="contain"
          style={styles.image}
        />
      </Animated.View>


      <TextInput
        style={styles.input}
        placeholder="Email"
        value={username}
        onChangeText={setUsername}
      />

      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />

      <TouchableOpacity
        style={styles.forgotPassword}
        onPress={() => alert('Reset Password')}
      >
        <Text style={[styles.buttonText, { color: '#000000FF' }]}>
          Forgot Password
        </Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Sign-In</Text>
      </TouchableOpacity>

      {isLoggedIn && <Text style={styles.successMessage}>Logged in successfully!</Text>}

      {/* Social Login Buttons */}
      <View style={styles.socialLoginContainer}>
        <TouchableOpacity
          style={[styles.socialButton, { backgroundColor: '#4285F4' }]}
          onPress={handleGmailLogin}
        >
          <Icon name="google" size={24} color="white" style={styles.icon} />
          <Text style={styles.socialButtonText}>Login with Gmail</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.socialButton, { backgroundColor: '#3b5998' }]}
          onPress={handleFacebookLogin}
        >
          <Icon name="facebook" size={24} color="white" style={styles.icon} />
          <Text style={styles.socialButtonText}>Login with Facebook</Text>
        </TouchableOpacity>

        <Text style={[styles.buttonText, { color: '#000000FF' }]}>
          Don't have a account? 
        </Text>
      </View>
    </View>
  );
};
const AppNavigator: React.FC = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="App">
        <Stack.Screen name="App" component={App} options={{ headerShown: false }} />
        <Stack.Screen name="Index2" component={Index2} options={{ headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EEC581',
    alignItems: 'center',
    justifyContent: 'center',
  },
  absoluteImageContainer: {
    position: 'absolute', // Positioning the image container absolutely
    top: 50, // Adjust this value to control the vertical position
    left: 0,
    right: 0,
    alignItems: 'center', // Center horizontally
    zIndex: 1, // Ensure the image is above other elements
  },
  image: {
    width: 300,
    height: 200,
  },
  input: {
    width: '90%',
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 10,
    marginBottom: 15,
    paddingLeft: 15,
    backgroundColor: '#f9f9f9', // Slight background color for better readability
  },
  errorInput: {
    borderColor: 'red', // Highlight invalid fields
  },
  button: {
    backgroundColor: '#EEC581',
    width: '90%',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
    // Add shadow to button for iOS and Android
    shadowColor: '#000',  // Shadow color for iOS
    shadowOffset: { width: 0, height: 5 }, // Shadow direction and distance
    shadowOpacity: 0.1,  // Shadow intensity
    shadowRadius: 10,  // Shadow blur radius
    elevation: 5, // Android shadow equivalent
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    textAlign: 'center',
  },
  forgotPassword: {
    marginBottom: 10,
    alignSelf: 'flex-end',
    marginRight: '5%',
  },
  successMessage: {
    marginTop: 20,
    color: 'green',
    fontSize: 16,
    textAlign: 'center',
  },
  image: {
    width: 300, // Reduce size to free up space
    height: 300,
    marginBottom: 20, // Add space below the image
  },
  imageContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20, // Push input boxes further up
  },
  inputContainer: {
    marginTop: 0,
    width: '80%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  socialLoginContainer: {
    marginTop: 0,
    width: '100%',
    alignItems: 'center',
    
  },
  socialButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
    borderRadius: 5,
    width: '80%',
    marginTop: 10,
    shadowColor: '#000',  // Shadow color for iOS
    shadowOffset: { width: 0, height: 5 }, // Shadow direction and distance
    shadowOpacity: 0.1,  // Shadow intensity
    shadowRadius: 10,  // Shadow blur radius
    elevation: 5, // Android shadow equivalent
  },
  socialButtonText: {
    color: 'white',
    fontSize: 13,
    textAlign: 'center',
    borderRadius: 5,
    marginLeft: 10,
    
  },
  icon: {
    marginRight: 10,
  },
  forgotPassword: {
    marginBottom: 5,
    alignSelf: 'flex-end', // Align the button to the right
    marginRight: 20, // Add some spacing from the right edge
  },
});
export default AppNavigator;

import { StatusBar } from "expo-status-bar";
import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Intro from './src/screens/intro';
import main from './src/screens/main';

const Stack = createStackNavigator();

const HomeScreen = ({ navigation }) => {
  return (
    <View
      style={{
        backgroundColor: "beige",
        flex: 1,
        marginTop:30,
        borderWidth: 1,
        borderColor: "beige",
        borderRadius: 15,
      }}
    >
      <Text style={styles.main}>Welcome To</Text>
      <Text
        style={{
          fontSize: 90,
          marginLeft: 10,
          fontFamily: "cursive",
          marginTop: -25,
        }}
      >
        Slidesnap
      </Text>

      <Text style={{ fontSize: 20, marginLeft: 20, color: "red" }}>
        Summarize your PPTs in seconds...!
      </Text>
      <Text style={{ fontSize: 16, marginLeft: 20 }}>Secure & 100% free</Text>

      {/* ✅ Navigate to Test Screen */}
      <TouchableOpacity 
        style={styles.getstartedbtn} 
        onPress={() => navigation.navigate('Intro')}
      >
        <Text style={{ color: "white", fontSize: 20 }}>Get Started</Text>
      </TouchableOpacity>
    </View>
  );
};

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen 
          name="Home" 
          component={HomeScreen} 
          options={{ headerShown: false }}
        />
        <Stack.Screen 
          name="Intro" 
          component={Intro} 
          options={{ headerTitle: 'App Introduction' }}
        />
        <Stack.Screen 
          name="main" 
          component={main} 
          options={{ headerTitle: 'Home' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  main: {
    fontSize: 100,
    marginTop: 100,
    marginLeft: 10,
  },
  getstartedbtn: {
    width: 150,
    backgroundColor: "#003366",
    height: 45,
    paddingLeft: 16,
    paddingTop: 9,
    borderWidth: 1,
    borderColor: "#003366",
    borderRadius: 5,
    marginTop: 25,
    marginLeft: 18,
  },
});

import { StatusBar } from 'expo-status-bar';
import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Intro from './src/screens/intro';
import Main from './src/screens/main';

const Stack = createStackNavigator();

const HomeScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>SlideSnap</Text>
      <Text style={styles.tagline}>Generate your PPTs in seconds </Text>
      <TouchableOpacity 
        style={styles.getStartedBtn} 
        onPress={() => navigation.navigate('Intro')}
      >
        <Text style={styles.btnText}>Get Started..!</Text>
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
          options={{ headerTitle: 'Introduction' }}
        />
        <Stack.Screen 
          name="Main" 
          component={Main} 
          options={{ headerTitle: 'Home' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: "beige",
  },
  title: {
    fontSize: 48,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
    color: "#333",
  },
  tagline: {
    fontSize: 18,
    marginBottom: 30,
    textAlign: "center",
    color: "#666",
  },
  getStartedBtn: {
    backgroundColor: "#003366",
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 25,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.5,
    shadowRadius: 6,
    elevation: 10,
  },
  btnText: {
    color: "#ffffff",
    fontSize: 18,
    fontWeight: "bold",
  },
});
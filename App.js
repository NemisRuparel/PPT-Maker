import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Animated,
  Dimensions,
  SafeAreaView,
  Image
} from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import { Ionicons } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import * as MailComposer from "expo-mail-composer";
import Intro from "./src/screens/intro";
import Main from "./src/screens/main";
import Slider from "@react-native-community/slider";

const { width, height } = Dimensions.get("window");
const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();
const SPACING = 20;

// Updated Dynamic Styles with Font Size
const getDynamicStyles = (isDarkTheme, fontSize) =>
  StyleSheet.create({
    container: {
      flexGrow: 1,
      backgroundColor: isDarkTheme ? "#1A1F2E" : "#F5F7FA",
      padding: SPACING,
    },
    title: {
      fontSize: 34 + fontSize,
      fontWeight: "800",
      color: isDarkTheme ? "#5CE1E6" : "#2A4D9C",
      letterSpacing: 1,
      textShadowColor: isDarkTheme ? "rgba(92, 225, 230, 0.3)" : "rgba(42, 77, 156, 0.2)",
      textShadowOffset: { width: 0, height: 2 },
      textShadowRadius: 6,
      marginTop: 20,
      textAlign: "center",
    },
    subtitle: {
      fontSize: 18 + fontSize,
      color: isDarkTheme ? "#A3BFFA" : "#6B7280",
      fontWeight: "500",
      marginVertical: SPACING / 2,
      textAlign: "center",
    },
    input: {
      width: "100%",
      backgroundColor: isDarkTheme ? "#2A2F42" : "#FFFFFF",
      color: isDarkTheme ? "#E2E8F0" : "#1F2937",
      padding: SPACING - 2,
      borderRadius: 10,
      marginBottom: SPACING,
      borderWidth: 1,
      borderColor: isDarkTheme ? "#3B82F6" : "#D1D5DB",
      fontSize: 16 + fontSize,
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.15,
      shadowRadius: 6,
      elevation: 3,
    },
    button: {
      backgroundColor: isDarkTheme ? "#3B82F6" : "#2A4D9C",
      paddingVertical: SPACING - 4,
      paddingHorizontal: SPACING * 2,
      borderRadius: 10,
      alignItems: "center",
      shadowColor: isDarkTheme ? "#3B82F6" : "#2A4D9C",
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.4,
      shadowRadius: 8,
      elevation: 6,
    },
    buttonText: {
      color: "#FFFFFF",
      fontSize: 18 + fontSize,
      fontWeight: "700",
    },
    card: {
      backgroundColor: isDarkTheme ? "rgba(42, 47, 66, 0.95)" : "rgba(255, 255, 255, 0.98)",
      borderRadius: 14,
      padding: SPACING,
      marginBottom: SPACING,
      borderWidth: 1,
      borderColor: isDarkTheme ? "#3B82F6" : "#E5E7EB",
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.25,
      shadowRadius: 10,
      elevation: 5,
    },
    featureTitle: {
      fontSize: 20 + fontSize,
      fontWeight: "700",
      color: isDarkTheme ? "#5CE1E6" : "#2A4D9C",
      marginBottom: SPACING / 2,
    },
    featureText: {
      fontSize: 16 + fontSize,
      color: isDarkTheme ? "#CBD5E1" : "#4B5563",
      lineHeight: 24,
    },
    banner: {
      backgroundColor: isDarkTheme ? "#10B981" : "#059669",
      borderRadius: 14,
      padding: SPACING * 1.5,
      marginVertical: SPACING,
      alignItems: "center",
      shadowColor: isDarkTheme ? "#10B981" : "#059669",
      shadowOffset: { width: 0, height: 6 },
      shadowOpacity: 0.4,
      shadowRadius: 10,
      elevation: 6,
    },
    bannerText: {
      fontSize: 22 + fontSize,
      fontWeight: "700",
      color: "#FFFFFF",
      textAlign: "center",
    },
    splashContainer: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: isDarkTheme ? "#1A1F2E" : "#F5F7FA",
    },
    splashText: {
      fontSize: 50 + fontSize,
      fontWeight: "900",
      color: isDarkTheme ? "#5CE1E6" : "#2A4D9C",
      letterSpacing: 2,
      textShadowColor: isDarkTheme ? "rgba(92, 225, 230, 0.5)" : "rgba(42, 77, 156, 0.5)",
      textShadowOffset: { width: 0, height: 4 },
      textShadowRadius: 10,
    },
    radioContainer: {
      flexDirection: "row",
      justifyContent: "space-around",
      width: "100%",
      marginTop: SPACING,
    },
    radioButton: {
      flexDirection: "row",
      alignItems: "center",
    },
    radioCircle: {
      width: 24,
      height: 24,
      borderRadius: 12,
      borderWidth: 2,
      marginRight: SPACING / 2,
      justifyContent: "center",
      alignItems: "center",
    },
    radioText: {
      fontSize: 16 + fontSize,
      fontWeight: "600",
    },
    settingRow: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      marginVertical: SPACING / 2,
    },
    slider: {
      width: "70%",
      height: 40,
    },
    resetButton: {
      backgroundColor: "#F59E0B",
      paddingVertical: SPACING - 4,
      paddingHorizontal: SPACING * 2,
      borderRadius: 10,
      alignItems: "center",
      marginTop: SPACING,
      shadowColor: "#F59E0B",
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.4,
      shadowRadius: 8,
      elevation: 6,
    },
    getStartedContainer: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: isDarkTheme ? "#1A1F2E" : "#F5F7FA",
    },
  });

// Splash Screen
const SplashScreen = ({ onFinish, isDarkTheme, fontSize }) => {
  const styles = getDynamicStyles(isDarkTheme, fontSize);
  const [fadeAnim] = useState(new Animated.Value(0));

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, { toValue: 1, duration: 3000, useNativeDriver: true }),
    ]).start();

    const timer = setTimeout(() => {
      Animated.timing(fadeAnim, { toValue: 0, duration: 800, useNativeDriver: true }).start(() =>
        onFinish()
      );
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <SafeAreaView style={styles.splashContainer}>
      <Animated.Text style={[styles.splashText, { opacity: fadeAnim }]}>
        ѕℓι∂єѕηαρ
      </Animated.Text>
    </SafeAreaView>
  );
};

// Attractive Get Started Screen (No LinearGradient, No 3D Animation)
const GetStartedScreen = ({ onFinish, isDarkTheme, fontSize }) => {
  const styles = getDynamicStyles(isDarkTheme, fontSize);
  const [fadeTitleAnim] = useState(new Animated.Value(0));
  const [fadeSubtitleAnim] = useState(new Animated.Value(0));
  const [scaleButtonAnim] = useState(new Animated.Value(0.8));
  const [translateYTitleAnim] = useState(new Animated.Value(50));
  const [translateYSubtitleAnim] = useState(new Animated.Value(50));

  useEffect(() => {
    Animated.sequence([
      Animated.parallel([
        Animated.timing(fadeTitleAnim, { toValue: 1, duration: 800, useNativeDriver: true }),
        Animated.timing(translateYTitleAnim, { toValue: 0, duration: 800, useNativeDriver: true }),
      ]),
      Animated.parallel([
        Animated.timing(fadeSubtitleAnim, { toValue: 1, duration: 800, useNativeDriver: true }),
        Animated.timing(translateYSubtitleAnim, { toValue: 0, duration: 800, useNativeDriver: true }),
      ]),
      Animated.spring(scaleButtonAnim, { toValue: 1, tension: 60, friction: 8, useNativeDriver: true }),
    ]).start();
  }, []);

  return (
    <SafeAreaView style={styles.getStartedContainer}>
      <Animated.View
        style={{
          opacity: fadeTitleAnim,
          transform: [{ translateY: translateYTitleAnim }],
        }}
      >
        <Text style={[styles.title, { fontSize: 40 + fontSize, color: isDarkTheme ? "#5CE1E6" : "#2A4D9C" }]}>
          Welcome to SlideSnap
        </Text>
      </Animated.View>
      <Animated.View
        style={{
          opacity: fadeSubtitleAnim,
          transform: [{ translateY: translateYSubtitleAnim }],
        }}
      >
        <Text style={[styles.subtitle, { fontSize: 20 + fontSize, marginVertical: SPACING * 2 }]}>
          Create stunning presentations effortlessly!
        </Text>
      </Animated.View>
      <Animated.View style={{ transform: [{ scale: scaleButtonAnim }] }}>
        <TouchableOpacity
          style={[
            styles.button,
            {
              backgroundColor: "#F59E0B",
              borderRadius: 20,
              paddingVertical: SPACING - 2,
              paddingHorizontal: SPACING * 3,
            },
          ]}
          onPress={onFinish}
        >
          <Text style={[styles.buttonText, { fontSize: 20 + fontSize }]}>Let’s Get Started</Text>
        </TouchableOpacity>
      </Animated.View>
    </SafeAreaView>
  );
};

// Name Input Screen
const NameInputScreen = ({ onFinish, isDarkTheme, fontSize, setUsername }) => {
  const styles = getDynamicStyles(isDarkTheme, fontSize);
  const [name, setName] = useState("");
  const [fadeAnim] = useState(new Animated.Value(0));

  useEffect(() => {
    Animated.timing(fadeAnim, { toValue: 1, duration: 800, useNativeDriver: true }).start();
  }, []);

  const handleContinue = () => {
    if (name.trim()) {
      setUsername(name.trim());
      onFinish();
    } else {
      alert("Please enter your name!");
    }
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView contentContainerStyle={styles.container}>
        <Animated.View style={{ opacity: fadeAnim }}>
          <Text style={[styles.title, { marginTop: 100 }]}>What’s Your Name?</Text>
          <Text style={styles.subtitle}>
            We’d love to personalize your experience!
          </Text>
          <TextInput
            style={styles.input}
            placeholder="Your Name"
            placeholderTextColor={isDarkTheme ? "#A3BFFA" : "#6B7280"}
            value={name}
            onChangeText={setName}
          />
          <TouchableOpacity style={styles.button} onPress={handleContinue}>
            <Text style={styles.buttonText}>Continue</Text>
          </TouchableOpacity>
        </Animated.View>
      </ScrollView>
    </SafeAreaView>
  );
};

// Updated Home Screen with Time-Based Greeting
const HomeScreen = ({ navigation, isDarkTheme, fontSize, username }) => {
  const styles = getDynamicStyles(isDarkTheme, fontSize);
  const [fadeAnim] = useState(new Animated.Value(0));
  const [scaleAnim] = useState(new Animated.Value(0.95));

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, { toValue: 1, duration: 800, useNativeDriver: true }),
      Animated.spring(scaleAnim, { toValue: 1, tension: 60, friction: 8, useNativeDriver: true }),
    ]).start();
  }, []);

  // Function to determine greeting based on specified time ranges
  const getTimeBasedGreeting = () => {
    const now = new Date();
    const currentHour = now.getHours();
    const currentMinute = now.getMinutes();

    if (currentHour >= 6 && currentHour < 12) {
      return "Good Morning";
    } else if (currentHour === 12 && currentMinute === 0) {
      return "Good Noon";
    } else if (currentHour >= 12 && currentHour < 18) {
      return "Good Afternoon";
    } else if (currentHour >= 18 && currentHour <= 21) {
      return "Good Evening";
    } else {
      return "Hello"; // Default for times outside 6 AM - 9 PM (e.g., night)
    }
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView contentContainerStyle={styles.container}>
        <Animated.View style={{ opacity: fadeAnim, transform: [{ scale: scaleAnim }] }}>
          <View style={{ alignItems: "center", marginTop: SPACING * 2.5 }}>
            <Text style={[styles.title, { marginRight: 170, marginTop: -30, marginBottom: 50, fontSize: 45, color: isDarkTheme ? "#ffffff" : "#000000" }]}>
              ѕℓι∂єѕηαρ
            </Text>
            <Text style={[styles.title, { marginTop: -20, marginBottom: 2, fontSize: 25,textAlign:'left',marginLeft:-100,width: 300 }]}>
              {getTimeBasedGreeting()}, {username}!
            </Text>
            <Text style={[styles.subtitle, { fontSize: 15, marginRight: 60 }]}>
              Forgot to make PPTs? No worry, we are here..! 😊
            </Text>
          </View>
          <View>
            <Image source={require('./assets/1.png')} style={{ width: 300, height: 300, marginLeft: 50 }} />
            <View style={styles.banner}>
              <Text style={styles.bannerText}>Present with Power</Text>
              <TouchableOpacity
                style={[styles.button, { backgroundColor: "#FFFFFF", marginTop: SPACING }]}
                onPress={() => navigation.navigate("Main", { isDarkTheme })}
              >
                <Text style={[styles.buttonText, { color: isDarkTheme ? "#10B981" : "#059669" }]}>
                  Get Started
                </Text>
              </TouchableOpacity>
            </View>
            <View style={styles.card}>
              <Text style={styles.featureTitle}>Your Workflow, Amplified</Text>
              <Text style={styles.featureText}>
                Import data and deliver impactful presentations with ease.
              </Text>
              <TouchableOpacity
                style={[styles.button, { marginTop: SPACING, backgroundColor: "#F59E0B" }]}
                onPress={() => navigation.navigate("Intro", { isDarkTheme })}
              >
                <Text style={styles.buttonText}>Learn More</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Animated.View>
      </ScrollView>
      <Text style={{ backgroundColor: isDarkTheme ? "#1A1F2E" : "#F5F7FA" }}>{'\n\n\n'}</Text>
    </SafeAreaView>
  );
};

// Feedback Screen
const FeedbackScreen = ({ isDarkTheme, fontSize }) => {
  const styles = getDynamicStyles(isDarkTheme, fontSize);
  const [rating, setRating] = useState(0);
  const [feedback, setFeedback] = useState("");
  const [suggestions, setSuggestions] = useState("");
  const [fadeAnim] = useState(new Animated.Value(0));

  useEffect(() => {
    Animated.timing(fadeAnim, { toValue: 1, duration: 800, useNativeDriver: true }).start();
  }, []);

  const sendFeedback = async () => {
    if (!rating || !feedback.trim()) return;
    const subject = `SlideSnap Feedback - ${rating}/5`;
    const body = `Rating: ${rating}/5\nFeedback: ${feedback}\nSuggestions: ${suggestions}`;
    const isAvailable = await MailComposer.isAvailableAsync();
    if (isAvailable) {
      await MailComposer.composeAsync({
        recipients: ["SlideSnap2025@gmail.com"],
        subject,
        body,
      });
    } else {
      alert("Email service unavailable");
    }
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView contentContainerStyle={styles.container}>
        <Animated.View style={{ opacity: fadeAnim }}>
          <Text style={[styles.title, { marginTop: 100, marginBottom: 30 }]}>Shape Our Future</Text>
          <View style={styles.card}>
            <View style={{ flexDirection: "row", justifyContent: "center", marginVertical: SPACING }}>
              {[1, 2, 3, 4, 5].map((star) => (
                <TouchableOpacity key={star} onPress={() => setRating(star)}>
                  <MaterialIcons
                    name="star"
                    size={34}
                    color={rating >= star ? "#F59E0B" : isDarkTheme ? "#475569" : "#D1D5DB"}
                    style={{ marginHorizontal: 4 }}
                  />
                </TouchableOpacity>
              ))}
            </View>
            <TextInput
              style={styles.input}
              placeholder="Your Insights"
              placeholderTextColor={isDarkTheme ? "#A3BFFA" : "#6B7280"}
              value={feedback}
              onChangeText={setFeedback}
              multiline
            />
            <TextInput
              style={styles.input}
              placeholder="Suggestions?"
              placeholderTextColor={isDarkTheme ? "#A3BFFA" : "#6B7280"}
              value={suggestions}
              onChangeText={setSuggestions}
              multiline
            />
            <TouchableOpacity
              style={[styles.button, { opacity: !rating || !feedback ? 0.6 : 1 }]}
              onPress={sendFeedback}
              disabled={!rating || !feedback}
            >
              <Text style={styles.buttonText}>Submit</Text>
            </TouchableOpacity>
          </View>
        </Animated.View>
      </ScrollView>
    </SafeAreaView>
  );
};

// Settings Screen
const SettingsScreen = ({ toggleTheme, isDarkTheme, fontSize, setFontSize, resetSettings }) => {
  const styles = getDynamicStyles(isDarkTheme, fontSize);
  const [fadeAnim] = useState(new Animated.Value(0));

  useEffect(() => {
    Animated.timing(fadeAnim, { toValue: 1, duration: 800, useNativeDriver: true }).start();
  }, []);

  const handleThemeChange = (theme) => {
    if (theme === "dark" && !isDarkTheme) toggleTheme();
    if (theme === "light" && isDarkTheme) toggleTheme();
  };

  const handleFontSizeChange = (value) => {
    setFontSize(value);
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={[styles.title, { marginTop: 100, marginBottom: 30 }]}>Appearance</Text>
        <View style={styles.card}>
          <Animated.View style={{ opacity: fadeAnim }}>
            <Text style={styles.featureTitle}>Appearance</Text>
            <View style={styles.radioContainer}>
              <TouchableOpacity style={styles.radioButton} onPress={() => handleThemeChange("light")}>
                <View
                  style={[
                    styles.radioCircle,
                    {
                      borderColor: isDarkTheme ? "#5CE1E6" : "#2A4D9C",
                      backgroundColor: !isDarkTheme ? (isDarkTheme ? "#5CE1E6" : "#2A4D9C") : "transparent",
                    },
                  ]}
                />
                <Text style={[styles.radioText, { color: isDarkTheme ? "#CBD5E1" : "#4B5563" }]}>Light</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.radioButton} onPress={() => handleThemeChange("dark")}>
                <View
                  style={[
                    styles.radioCircle,
                    {
                      borderColor: isDarkTheme ? "#5CE1E6" : "#2A4D9C",
                      backgroundColor: isDarkTheme ? (isDarkTheme ? "#5CE1E6" : "#2A4D9C") : "transparent",
                    },
                  ]}
                />
                <Text style={[styles.radioText, { color: isDarkTheme ? "#CBD5E1" : "#4B5563" }]}>Dark</Text>
              </TouchableOpacity>
            </View>
            <Text style={[styles.featureTitle, { marginTop: SPACING }]}>Font Size</Text>
            <View style={styles.settingRow}>
              <Text style={[styles.radioText, { color: isDarkTheme ? "#CBD5E1" : "#4B5563" }]}>
                {fontSize === 0 ? "Small" : "Large"}
              </Text>
              <Slider
                style={styles.slider}
                minimumValue={0}
                maximumValue={4}
                step={4}
                value={fontSize}
                onValueChange={handleFontSizeChange}
                minimumTrackTintColor={isDarkTheme ? "#3B82F6" : "#2A4D9C"}
                maximumTrackTintColor={isDarkTheme ? "#475569" : "#D1D5DB"}
                thumbTintColor={isDarkTheme ? "#5CE1E6" : "#2A4D9C"}
              />
            </View>
            <TouchableOpacity style={styles.resetButton} onPress={resetSettings}>
              <Text style={styles.buttonText}>Reset to Default</Text>
            </TouchableOpacity>
          </Animated.View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

// FAQs Screen
const FAQsScreen = ({ isDarkTheme, fontSize }) => {
  const styles = getDynamicStyles(isDarkTheme, fontSize);
  const faqs = [
    { question: "How do I begin?", answer: "Import your data, style it, and export." },
    { question: "Appearance options?", answer: "Go to Settings." },
    { question: "How to connect?", answer: "Use the Feedback screen." },
  ];

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={[styles.title, { marginTop: 100, marginBottom: 30 }]}>Questionarie</Text>
        {faqs.map((faq, index) => (
          <View key={index} style={styles.card}>
            <Text style={styles.featureTitle}>{faq.question}</Text>
            <Text style={[styles.featureText, { fontWeight: 400 }]}>{faq.answer}</Text>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

// Tab Navigator
const TabNavigator = ({ navigation, toggleTheme, isDarkTheme, fontSize, setFontSize, resetSettings, username }) => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: isDarkTheme ? "rgba(34, 30, 30, 0.95)" : "rgba(223, 223, 223, 0.98)",
          borderTopWidth: 0,
          elevation: 2,
          height: 70,
          paddingBottom: 10,
          paddingTop: 10,
          borderRadius: 16,
          marginHorizontal: SPACING,
          marginBottom: 15,
          shadowColor: "#000",
          shadowOffset: { width: 0, height: 4 },
          shadowOpacity: 0.3,
          shadowRadius: 10,
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
        },
        tabBarActiveTintColor: isDarkTheme ? "#5CE1E6" : "#2A4D9C",
        tabBarInactiveTintColor: isDarkTheme ? "#A3BFFA" : "#6B7280",
      }}
    >
      <Tab.Screen
        name="Home"
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home" size={size} color={color} />
          ),
        }}
      >
        {() => <HomeScreen navigation={navigation} isDarkTheme={isDarkTheme} fontSize={fontSize} username={username} />}
      </Tab.Screen>
      <Tab.Screen
        name="Feedback"
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="mail" size={size} color={color} />
          ),
        }}
      >
        {() => <FeedbackScreen isDarkTheme={isDarkTheme} fontSize={fontSize} />}
      </Tab.Screen>
      <Tab.Screen
        name="Settings"
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="cog" size={size} color={color} />
          ),
        }}
      >
        {() => (
          <SettingsScreen
            toggleTheme={toggleTheme}
            isDarkTheme={isDarkTheme}
            fontSize={fontSize}
            setFontSize={setFontSize}
            resetSettings={resetSettings}
          />
        )}
      </Tab.Screen>
      <Tab.Screen
        name="FAQ"
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="information-circle" size={size} color={color} />
          ),
        }}
      >
        {() => <FAQsScreen isDarkTheme={isDarkTheme} fontSize={fontSize} />}
      </Tab.Screen>
    </Tab.Navigator>
  );
};

// Main App
export default function App() {
  const [isDarkTheme, setIsDarkTheme] = useState(false);
  const [showSplash, setShowSplash] = useState(true);
  const [showGetStarted, setShowGetStarted] = useState(false);
  const [showNameInput, setShowNameInput] = useState(false);
  const [fontSize, setFontSize] = useState(2);
  const [username, setUsername] = useState("");

  const toggleTheme = () => setIsDarkTheme((prev) => !prev);
  const handleSplashFinish = () => {
    setShowSplash(false);
    setShowGetStarted(true);
  };
  const handleGetStartedFinish = () => {
    setShowGetStarted(false);
    setShowNameInput(true);
  };
  const handleNameInputFinish = () => setShowNameInput(false);
  const resetSettings = () => {
    setIsDarkTheme(false);
    setFontSize(0);
  };

  return (
    <NavigationContainer>
      <SafeAreaView style={{ flex: 1, backgroundColor: isDarkTheme ? "#1A1F2E" : "#F5F7FA" }}>
        {showSplash ? (
          <SplashScreen onFinish={handleSplashFinish} isDarkTheme={isDarkTheme} fontSize={fontSize} />
        ) : showGetStarted ? (
          <GetStartedScreen
            onFinish={handleGetStartedFinish}
            isDarkTheme={isDarkTheme}
            fontSize={fontSize}
          />
        ) : showNameInput ? (
          <NameInputScreen
            onFinish={handleNameInputFinish}
            isDarkTheme={isDarkTheme}
            fontSize={fontSize}
            setUsername={setUsername}
          />
        ) : (
          <Stack.Navigator
            screenOptions={{
              headerStyle: {
                backgroundColor: isDarkTheme ? "rgba(42, 47, 66, 0.95)" : "rgba(255, 255, 255, 0.98)",
                elevation: 0,
                shadowOpacity: 0,
              },
              headerTintColor: isDarkTheme ? "#5CE1E6" : "#2A4D9C",
              headerTitleStyle: { fontWeight: "700", fontSize: 20 + fontSize },
            }}
          >
            <Stack.Screen
              name="SlideSnap"
              options={{ headerShown: false }}
            >
              {({ navigation }) => (
                <TabNavigator
                  navigation={navigation}
                  toggleTheme={toggleTheme}
                  isDarkTheme={isDarkTheme}
                  fontSize={fontSize}
                  setFontSize={setFontSize}
                  resetSettings={resetSettings}
                  username={username}
                />
              )}
            </Stack.Screen>
            <Stack.Screen name="Intro" component={Intro} />
            <Stack.Screen name="Main" component={Main} />
          </Stack.Navigator>
        )}
      </SafeAreaView>
    </NavigationContainer>
  );
}
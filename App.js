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
import i18n from 'i18n-js';

// Language translations
const translations = {
  en: {
    welcome: "Welcome to SlideSnap",
    getStarted: "Let’s Get Started",
    namePrompt: "What’s Your Name?",
    personalize: "We’d love to personalize your experience!",
    continue: "Continue",
    forgotPPT: "Forgot to make PPTs? No worry, we are here..! 😊",
    presentPower: "Present with Power",
    getStartedBtn: "Get Started",
    workflow: "Your Workflow, Amplified",
    importData: "Import data and deliver impactful presentations with ease.",
    learnMore: "Learn More",
    shapeFuture: "Shape Our Future",
    insights: "Your Insights",
    suggestions: "Suggestions?",
    submit: "Submit",
    appearance: "Appearance",
    light: "Light",
    dark: "Dark",
    fontSize: "Font Size",
    small: "Small",
    large: "Large",
    language: "Language",
    reset: "Reset to Default",
    faq: "Questionarie",
    faq1q: "How do I begin?",
    faq1a: "Import your data, style it, and export.",
    faq2q: "Appearance options?",
    faq2a: "Go to Settings.",
    faq3q: "How to connect?",
    faq3a: "Use the Feedback screen."
  },
  gu: {
    welcome: "સ્લાઇડસ્નેપમાં સ્વાગત છે",
    getStarted: "ચાલો શરૂ કરીએ",
    namePrompt: "તમારું નામ શું છે?",
    personalize: "અમે તમારા અનુભવને વ્યક્તિગત કરવા માંગીએ છીએ!",
    continue: "ચાલુ રાખો",
    forgotPPT: "PPT બનાવવાનું ભૂલી ગયા? ચિંતા નહીં, અમે અહીં છીએ..! 😊",
    presentPower: "શક્તિશાળી રજૂઆત",
    getStartedBtn: "શરૂ કરો",
    workflow: "તમારું કાર્યપ્રવાહ, વિસ્તૃત",
    importData: "ડેટા આયાત કરો અને સરળતાથી પ્રભાવશાળી રજૂઆતો આપો.",
    learnMore: "વધુ જાણો",
    shapeFuture: "અમારું ભવિષ્ય ઘડો",
    insights: "તમારી આંતરદૃષ્ટિ",
    suggestions: "સૂચનો?",
    submit: "સબમિટ કરો",
    appearance: "દેખાવ",
    light: "પ્રકાશ",
    dark: "ઘેરો",
    fontSize: "ફોન્ટ સાઇઝ",
    small: "નાનું",
    large: "મોટું",
    language: "ભાષા",
    reset: "ડિફોલ્ટ પર રીસેટ કરો",
    faq: "પ્રશ્નોત્તરી",
    faq1q: "હું કેવી રીતે શરૂ કરું?",
    faq1a: "તમારો ડેટા આયાત કરો, તેને સ્ટાઇલ કરો અને નિકાસ કરો.",
    faq2q: "દેખાવના વિકલ્પો?",
    faq2a: "સેટિંગ્સ પર જાઓ.",
    faq3q: "કેવી રીતે જોડાવું?",
    faq3a: "ફીડબેક સ્ક્રીનનો ઉપયોગ કરો."
  },
  hi: {
    welcome: "स्लाइडस्नैप में आपका स्वागत है",
    getStarted: "चलें शुरू करें",
    namePrompt: "आपका नाम क्या है?",
    personalize: "हम आपके अनुभव को व्यक्तिगत बनाना चाहेंगे!",
    continue: "जारी रखें",
    forgotPPT: "PPT बनाना भूल गए? कोई चिंता नहीं, हम यहाँ हैं..! 😊",
    presentPower: "शक्तिशाली प्रस्तुति",
    getStartedBtn: "शुरू करें",
    workflow: "आपका कार्यप्रवाह, बढ़ाया गया",
    importData: "डेटा आयात करें और प्रभावशाली प्रस्तुतियाँ आसानी से दें।",
    learnMore: "और जानें",
    shapeFuture: "हमारा भविष्य आकार दें",
    insights: "आपकी अंतर्दृष्टि",
    suggestions: "सुझाव?",
    submit: "जमा करें",
    appearance: "दिखावट",
    light: "हल्का",
    dark: "गहरा",
    fontSize: "फॉन्ट आकार",
    small: "छोटा",
    large: "बड़ा",
    language: "भाषा",
    reset: "डिफ़ॉल्ट पर रीसेट करें",
    faq: "प्रश्नावली",
    faq1q: "मैं कैसे शुरू करूं?",
    faq1a: "अपना डेटा आयात करें, इसे स्टाइल करें और निर्यात करें।",
    faq2q: "दिखावट के विकल्प?",
    faq2a: "सेटिंग्स पर जाएं।",
    faq3q: "कैसे संपर्क करें?",
    faq3a: "फीडबैक स्क्रीन का उपयोग करें।"
  }
};

i18n.translations = translations;
i18n.fallbacks = true;
i18n.locale = "en"; // Default language

const { width, height } = Dimensions.get("window");
const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();
const SPACING = 20;

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
        style={{ opacity: fadeTitleAnim, transform: [{ translateY: translateYTitleAnim }] }}
      >
        <Text style={[styles.title, { fontSize: 40 + fontSize, color: isDarkTheme ? "#5CE1E6" : "#2A4D9C" }]}>
          {i18n.t('welcome')}
        </Text>
      </Animated.View>
      <Animated.View
        style={{ opacity: fadeSubtitleAnim, transform: [{ translateY: translateYSubtitleAnim }] }}
      >
        <Text style={[styles.subtitle, { fontSize: 20 + fontSize, marginVertical: SPACING * 2 }]}>
          {i18n.t('getStarted')}
        </Text>
      </Animated.View>
      <Animated.View style={{ transform: [{ scale: scaleButtonAnim }] }}>
        <TouchableOpacity
          style={[styles.button, { backgroundColor: "#F59E0B", borderRadius: 20, paddingVertical: SPACING - 2, paddingHorizontal: SPACING * 3 }]}
          onPress={onFinish}
        >
          <Text style={[styles.buttonText, { fontSize: 20 + fontSize }]}>
            {i18n.t('getStarted')}
          </Text>
        </TouchableOpacity>
      </Animated.View>
    </SafeAreaView>
  );
};

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
          <Text style={[styles.title, { marginTop: 100 }]}>
            {i18n.t('namePrompt')}
          </Text>
          <Text style={styles.subtitle}>
            {i18n.t('personalize')}
          </Text>
          <TextInput
            style={styles.input}
            placeholder="Your Name"
            placeholderTextColor={isDarkTheme ? "#A3BFFA" : "#6B7280"}
            value={name}
            onChangeText={setName}
          />
          <TouchableOpacity style={styles.button} onPress={handleContinue}>
            <Text style={styles.buttonText}>
              {i18n.t('continue')}
            </Text>
          </TouchableOpacity>
        </Animated.View>
      </ScrollView>
    </SafeAreaView>
  );
};

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
      return "Hello";
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
            <Text style={[styles.title, { marginTop: -20, marginBottom: 2, fontSize: 25, textAlign:'left', marginLeft:-100, width: 300 }]}>
              {getTimeBasedGreeting()}, {username}!
            </Text>
            <Text style={[styles.subtitle, { fontSize: 15, marginRight: 60 }]}>
              {i18n.t('forgotPPT')}
            </Text>
          </View>
          <View>
            <Image source={require('./assets/1.png')} style={{ width: 300, height: 300, marginLeft: 50 }} />
            <View style={styles.banner}>
              <Text style={styles.bannerText}>
                {i18n.t('presentPower')}
              </Text>
              <TouchableOpacity
                style={[styles.button, { backgroundColor: "#FFFFFF", marginTop: SPACING }]}
                onPress={() => navigation.navigate("Main", { isDarkTheme })}
              >
                <Text style={[styles.buttonText, { color: isDarkTheme ? "#10B981" : "#059669" }]}>
                  {i18n.t('getStartedBtn')}
                </Text>
              </TouchableOpacity>
            </View>
            <View style={styles.card}>
              <Text style={styles.featureTitle}>
                {i18n.t('workflow')}
              </Text>
              <Text style={styles.featureText}>
                {i18n.t('importData')}
              </Text>
              <TouchableOpacity
                style={[styles.button, { marginTop: SPACING, backgroundColor: "#F59E0B" }]}
                onPress={() => navigation.navigate("Intro", { isDarkTheme })}
              >
                <Text style={styles.buttonText}>
                  {i18n.t('learnMore')}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </Animated.View>
      </ScrollView>
      <Text style={{ backgroundColor: isDarkTheme ? "#1A1F2E" : "#F5F7FA" }}>{'\n\n\n'}</Text>
    </SafeAreaView>
  );
};

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
          <Text style={[styles.title, { marginTop: 100, marginBottom: 30 }]}>
            {i18n.t('shapeFuture')}
          </Text>
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
              placeholder={i18n.t('insights')}
              placeholderTextColor={isDarkTheme ? "#A3BFFA" : "#6B7280"}
              value={feedback}
              onChangeText={setFeedback}
              multiline
            />
            <TextInput
              style={styles.input}
              placeholder={i18n.t('suggestions')}
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
              <Text style={styles.buttonText}>
                {i18n.t('submit')}
              </Text>
            </TouchableOpacity>
          </View>
        </Animated.View>
      </ScrollView>
    </SafeAreaView>
  );
};

const SettingsScreen = ({ toggleTheme, isDarkTheme, fontSize, setFontSize, resetSettings }) => {
  const styles = getDynamicStyles(isDarkTheme, fontSize);
  const [fadeAnim] = useState(new Animated.Value(0));
  const [selectedLanguage, setSelectedLanguage] = useState("English");
  const [showDropdown, setShowDropdown] = useState(false);

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

  const languages = ["English", "Gujarati", "Hindi"];

  const handleLanguageSelect = (language) => {
    setSelectedLanguage(language);
    setShowDropdown(false);
    const locale = language === "English" ? "en" : language === "Gujarati" ? "gu" : "hi";
    i18n.locale = locale;
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={[styles.title, { marginTop: 100, marginBottom: 30 }]}>
          {i18n.t('appearance')}
        </Text>
        <View style={styles.card}>
          <Animated.View style={{ opacity: fadeAnim }}>
            <Text style={styles.featureTitle}>
              {i18n.t('appearance')}
            </Text>
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
                <Text style={[styles.radioText, { color: isDarkTheme ? "#CBD5E1" : "#4B5563" }]}>
                  {i18n.t('light')}
                </Text>
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
                <Text style={[styles.radioText, { color: isDarkTheme ? "#CBD5E1" : "#4B5563" }]}>
                  {i18n.t('dark')}
                </Text>
              </TouchableOpacity>
            </View>

            <Text style={[styles.featureTitle, { marginTop: SPACING }]}>
              {i18n.t('fontSize')}
            </Text>
            <View style={styles.settingRow}>
              <Text style={[styles.radioText, { color: isDarkTheme ? "#CBD5E1" : "#4B5563" }]}>
                {fontSize === 0 ? i18n.t('small') : i18n.t('large')}
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

            <Text style={[styles.featureTitle, { marginTop: SPACING }]}>
              {i18n.t('language')}
            </Text>
            <View style={styles.settingRow}>
              <TouchableOpacity
                style={{
                  width: "100%",
                  backgroundColor: isDarkTheme ? "#2A2F42" : "#FFFFFF",
                  padding: SPACING - 2,
                  borderRadius: 10,
                  borderWidth: 1,
                  borderColor: isDarkTheme ? "#3B82F6" : "#D1D5DB",
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
                onPress={() => setShowDropdown(!showDropdown)}
              >
                <Text style={[styles.radioText, { color: isDarkTheme ? "#CBD5E1" : "#4B5563" }]}>
                  {selectedLanguage}
                </Text>
                <Ionicons
                  name={showDropdown ? "chevron-up" : "chevron-down"}
                  size={20}
                  color={isDarkTheme ? "#CBD5E1" : "#4B5563"}
                />
              </TouchableOpacity>
            </View>

            {showDropdown && (
              <View
                style={{
                  width: "100%",
                  backgroundColor: isDarkTheme ? "#2A2F42" : "#FFFFFF",
                  borderRadius: 10,
                  borderWidth: 1,
                  borderColor: isDarkTheme ? "#3B82F6" : "#D1D5DB",
                  marginTop: 5,
                  position: "absolute",
                  top: 340,
                  zIndex: 1,
                }}
              >
                {languages.map((language) => (
                  <TouchableOpacity
                    key={language}
                    style={{
                      padding: SPACING - 2,
                      borderBottomWidth: language === languages[languages.length - 1] ? 0 : 1,
                      borderBottomColor: isDarkTheme ? "#3B82F6" : "#D1D5DB",
                    }}
                    onPress={() => handleLanguageSelect(language)}
                  >
                    <Text style={[styles.radioText, { color: isDarkTheme ? "#CBD5E1" : "#4B5563" }]}>
                      {language}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            )}

            <TouchableOpacity style={styles.resetButton} onPress={resetSettings}>
              <Text style={styles.buttonText}>
                {i18n.t('reset')}
              </Text>
            </TouchableOpacity>
          </Animated.View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const FAQsScreen = ({ isDarkTheme, fontSize }) => {
  const styles = getDynamicStyles(isDarkTheme, fontSize);
  const faqs = [
    { question: i18n.t('faq1q'), answer: i18n.t('faq1a') },
    { question: i18n.t('faq2q'), answer: i18n.t('faq2a') },
    { question: i18n.t('faq3q'), answer: i18n.t('faq3a') },
  ];

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={[styles.title, { marginTop: 100, marginBottom: 30 }]}>
          {i18n.t('faq')}
        </Text>
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
    i18n.locale = "en";
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
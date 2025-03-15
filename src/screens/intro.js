import React, { useState, useRef, useEffect } from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
  Animated,
  SafeAreaView,
  ScrollView,
} from "react-native";
import { Video } from "expo-av";
import { Ionicons } from "@expo/vector-icons";
import Slider from "@react-native-community/slider";

const SPACING = 20;

const Intro = ({ route }) => {
  const { isDarkTheme } = route.params;
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [videoProgress, setVideoProgress] = useState(0);
  const [videoDuration, setVideoDuration] = useState(1);
  const [fadeAnim] = useState(new Animated.Value(0));

  const controlColor = isDarkTheme ? "#5CE1E6" : "#2A4D9C";
  const sliderColor = isDarkTheme ? "#3B82F6" : "#F59E0B";
  
  const styles = getDynamicStyles(isDarkTheme, 0);

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 800,
      useNativeDriver: true,
    }).start();

    const interval = setInterval(async () => {
      if (videoRef.current) {
        const status = await videoRef.current.getStatusAsync();
        if (status?.isLoaded) {
          setVideoProgress(status.positionMillis);
          setVideoDuration(status.durationMillis || 1);
        }
      }
    }, 500);

    return () => clearInterval(interval);
  }, []);

  const togglePlayback = async () => {
    if (!videoRef.current) return;

    if (isPlaying) {
      await videoRef.current.pauseAsync();
    } else {
      await videoRef.current.playAsync();
    }
    setIsPlaying(!isPlaying);
  };

  const handleSliderChange = async (value) => {
    if (videoRef.current) {
      await videoRef.current.setPositionAsync(value);
    }
  };

  const skipBackward = async () => {
    if (videoRef.current) {
      const status = await videoRef.current.getStatusAsync();
      if (status?.isLoaded) {
        const newTime = Math.max(0, status.positionMillis - 10000);
        await videoRef.current.setPositionAsync(newTime);
      }
    }
  };

  const skipForward = async () => {
    if (videoRef.current) {
      const status = await videoRef.current.getStatusAsync();
      if (status?.isLoaded) {
        const newTime = Math.min(videoDuration, status.positionMillis + 10000);
        await videoRef.current.setPositionAsync(newTime);
      }
    }
  };

  const formatTime = (milliseconds) => {
    const totalSeconds = Math.floor(milliseconds / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  return (
    <SafeAreaView
      style={[
        styles.container,
        { backgroundColor: isDarkTheme ? "#1A1F2E" : "#F5F7FA" },
      ]}
    >
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <Text style={[styles.title, { color: controlColor }]}>
          SlideSnap Intro
        </Text>
        <Text style={[styles.subtitle, { color: isDarkTheme ? "#A3BFFA" : "#6B7280" }]}>
          Discover the Future of Presentations
        </Text>

        <Video
          ref={videoRef}
          source={require("../../assets/video/introduction.mp4")}
          style={styles.video}
          resizeMode="contain"
          useNativeControls={false}
        />

        <Animated.View style={[styles.controlContainer, { opacity: fadeAnim }]}>
          <TouchableOpacity style={styles.controlButton} onPress={skipBackward}>
            <Ionicons name="play-skip-back" size={32} color={controlColor} />
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.playButton,
              { backgroundColor: isDarkTheme ? "#3B82F6" : "#2A4D9C" },
            ]}
            onPress={togglePlayback}
          >
            <Ionicons
              name={isPlaying ? "pause" : "play"}
              size={34}
              color="#FFFFFF"
            />
          </TouchableOpacity>

          <TouchableOpacity style={styles.controlButton} onPress={skipForward}>
            <Ionicons name="play-skip-forward" size={32} color={controlColor} />
          </TouchableOpacity>
        </Animated.View>

        <Animated.View style={[styles.sliderContainer, { opacity: fadeAnim }]}>
          <Text style={[styles.timeText, { color: controlColor }]}>
            {formatTime(videoProgress)}
          </Text>
          <Slider
            style={styles.slider}
            minimumValue={0}
            maximumValue={videoDuration}
            value={videoProgress}
            onSlidingComplete={handleSliderChange}
            minimumTrackTintColor={sliderColor}
            maximumTrackTintColor={isDarkTheme ? "#475569" : "#D1D5DB"}
            thumbTintColor={controlColor}
          />
          <Text style={[styles.timeText, { color: controlColor }]}>
            {formatTime(videoDuration)}
          </Text>
        </Animated.View>

        <Text style={[styles.featureTitle, { textAlign: "center" }]}>
          Why SlideSnap?
        </Text>
        
        <View style={styles.card}>
          <Ionicons
            name="speedometer"
            size={26}
            color={isDarkTheme ? "#5CE1E6" : "#2A4D9C"}
            style={{ marginBottom: SPACING / 2 }}
          />
          <Text style={styles.featureTitle}>Precision Efficiency</Text>
          <Text style={styles.featureText}>Craft polished decks in record time.</Text>
        </View>

        <View style={styles.card}>
          <Ionicons
            name="bulb"
            size={26}
            color={isDarkTheme ? "#5CE1E6" : "#2A4D9C"}
            style={{ marginBottom: SPACING / 2 }}
          />
          <Text style={styles.featureTitle}>Smart Design</Text>
          <Text style={styles.featureText}>Elevate ideas with templates.</Text>
        </View>

        <View style={styles.card}>
          <Ionicons
            name="lock-closed"
            size={26}
            color={isDarkTheme ? "#5CE1E6" : "#2A4D9C"}
            style={{ marginBottom: SPACING / 2 }}
          />
          <Text style={styles.featureTitle}>Security</Text>
          <Text style={styles.featureText}>Enhanced security with local processing.</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const getDynamicStyles = (isDarkTheme, fontSize) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: isDarkTheme ? "#1A1F2E" : "#F5F7FA",
    },
    scrollView: {
      flex: 1,
      width: "100%",
    },
    scrollContent: {
      alignItems: "center",
      padding: SPACING,
      paddingBottom: SPACING * 2, // Extra padding at bottom
    },
    title: {
      fontSize: 28,
      fontWeight: "800",
      letterSpacing: 1,
      textShadowOffset: { width: 0, height: 2 },
      textShadowRadius: 6,
      marginTop: SPACING,
      marginBottom: SPACING / 2,
    },
    subtitle: {
      fontSize: 16,
      fontWeight: "500",
      marginBottom: SPACING * 2,
    },
    video: {
      width: "100%",
      height: 250,
    },
    controlContainer: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      width: "100%",
      marginTop: -30,
    },
    controlButton: {
      padding: 12,
      borderRadius: 10,
      marginTop: 15,
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.2,
      shadowRadius: 6,
    },
    playButton: {
      height: 45,
      width: 45,
      justifyContent: "center",
      alignItems: "center",
      borderRadius: 30,
      elevation: 6,
      paddingLeft:5,
      marginTop:15
    },
    sliderContainer: {
      width: "90%",
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      paddingHorizontal: 10,
      marginTop: -10,
      marginBottom:100
    },
    slider: {
      flex: 1,
      height: 40,
      marginHorizontal: 12,
    },
    timeText: {
      fontSize: 14,
      fontWeight: "600",
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
      width: "100%", // Ensure cards take full width
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
  });

export default Intro;
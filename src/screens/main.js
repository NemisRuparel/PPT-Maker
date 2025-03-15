import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
  ScrollView,
  Linking,
  Platform,
  ActivityIndicator,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import * as DocumentPicker from "expo-document-picker";
import * as IntentLauncher from "expo-intent-launcher";
import * as FileSystem from "expo-file-system";
import axios from "axios";

const Main = ({ route }) => {
  const { isDarkTheme } = route.params;
  const [selectedFile, setSelectedFile] = useState(null);
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [loading, setLoading] = useState(false);
  const [uploadStatus, setUploadStatus] = useState("");

  const styles = getDynamicStyles(isDarkTheme);

  const handleFileUpload = async (type) => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type:
          type === "template"
            ? ["application/vnd.openxmlformats-officedocument.presentationml.presentation"]
            : [
                "application/vnd.openxmlformats-officedocument.presentationml.presentation",
                "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
                "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
              ],
      });

      if (result.canceled) return;

      if (result.assets && result.assets.length > 0) {
        let fileUri = result.assets[0].uri;
        let fileName = result.assets[0].name || fileUri.split("/").pop();

        if (type === "template") {
          setSelectedTemplate({ name: fileName, uri: fileUri });
        } else {
          setSelectedFile({ name: fileName, uri: fileUri });
        }
      }
    } catch (error) {
      Alert.alert("Error", "Failed to upload file");
      console.error("Upload Error:", error);
    }
  };

  const handleViewFile = async (file) => {
    if (!file) return;

    try {
      if (Platform.OS === "android") {
        const contentUri = await FileSystem.getContentUriAsync(file.uri);
        IntentLauncher.startActivityAsync("android.intent.action.VIEW", {
          data: contentUri,
          flags: 1,
        });
      } else {
        const supported = await Linking.canOpenURL(file.uri);
        if (supported) {
          await Linking.openURL(file.uri);
        } else {
          Alert.alert("Error", "Cannot open this file");
        }
      }
    } catch (error) {
      Alert.alert("Error", "Unable to open file");
      console.error("File Open Error:", error);
    }
  };

  const handleRemoveFile = (type) => {
    if (type === "template") {
      setSelectedTemplate(null);
    } else {
      setSelectedFile(null);
    }
    setUploadStatus("");
  };

  const getMimeType = (filename) => {
    const ext = filename.split(".").pop().toLowerCase();
    switch (ext) {
      case "pptx":
        return "application/vnd.openxmlformats-officedocument.presentationml.presentation";
      case "docx":
        return "application/vnd.openxmlformats-officedocument.wordprocessingml.document";
      case "xlsx":
        return "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";
      default:
        return "application/octet-stream";
    }
  };

  const handleGeneratePresentation = async () => {
    if (!selectedFile) {
      Alert.alert("Error", "Please upload a reference file to generate slides.");
      return;
    }

    setLoading(true);
    setUploadStatus("");

    try {
      const formData = new FormData();
      formData.append("reference", {
        uri: selectedFile.uri,
        name: selectedFile.name,
        type: getMimeType(selectedFile.name),
      });
      if (selectedTemplate) {
        formData.append("template", {
          uri: selectedTemplate.uri,
          name: selectedTemplate.name,
          type: getMimeType(selectedTemplate.name),
        });
      }

      console.log("Sending files to server:", {
        reference: selectedFile.name,
        template: selectedTemplate?.name,
      });

      // Test connectivity with health endpoint
      // const healthCheck = await axios.get("http://10.0.2.2:5000/health");
      // console.log("Health check response:", healthCheck.data);

      const response = await axios.post(
        "http://192.168.80.65:5000/upload3", // Updated IP for Android Emulator
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          timeout: 15000, // 15-second timeout
        }
      );

      console.log("Server response:", response.data);
      setUploadStatus("Files uploaded successfully! Slides generated.");
      Alert.alert("Success", "Your slides have been generated!");
    } catch (error) {
      console.error("Detailed upload error:", {
        message: error.message,
        response: error.response?.data,
        status: error.response?.status,
        stack: error.stack,
      });
      const errorMsg = error.response?.data?.error || error.message;
      setUploadStatus(`Upload failed: ${errorMsg}`);
      Alert.alert("Error", `Failed to generate slides: ${errorMsg}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Create Slides</Text>
        <Text style={styles.subtitle}>Drop your files, craft your masterpiece</Text>
      </View>

      <View style={styles.uploadContainer}>
        <View style={styles.uploadBox}>
          <Ionicons name="cloud-upload-outline" size={40} color={isDarkTheme ? "#A5B4FC" : "#1E3A8A"} />
          <Text style={styles.uploadText}>Upload Reference</Text>
          <TouchableOpacity style={styles.uploadButton} onPress={() => handleFileUpload("reference")}>
            <Text style={styles.buttonText}>Choose File</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.uploadBox}>
          <Ionicons name="document-outline" size={40} color={isDarkTheme ? "#A5B4FC" : "#1E3A8A"} />
          <Text style={styles.uploadText}>Upload Template</Text>
          <TouchableOpacity style={styles.uploadButton} onPress={() => handleFileUpload("template")}>
            <Text style={styles.buttonText}>Choose File</Text>
          </TouchableOpacity>
        </View>
      </View>

      {(selectedFile || selectedTemplate) && (
        <View style={styles.filesContainer}>
          <Text style={styles.sectionTitle}>Your Files</Text>
          {selectedFile && (
            <View style={[styles.fileCard, { borderStyle: "solid" }]}>
              <Ionicons name="document-text-outline" size={24} color={isDarkTheme ? "#D1D5DB" : "#4B5563"} />
              <Text style={styles.fileName}>{selectedFile.name}</Text>
              <View style={styles.fileActions}>
                <TouchableOpacity onPress={() => handleViewFile(selectedFile)}>
                  <Ionicons name="eye" size={20} color={isDarkTheme ? "#A5B4FC" : "#1E3A8A"} />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => handleRemoveFile("reference")} style={styles.actionIcon}>
                  <Ionicons name="trash-outline" size={20} color="#EF4444" />
                </TouchableOpacity>
              </View>
            </View>
          )}
          {selectedTemplate && (
            <View style={[styles.fileCard, { borderStyle: "solid" }]}>
              <Ionicons name="albums-outline" size={24} color={isDarkTheme ? "#D1D5DB" : "#4B5563"} />
              <Text style={styles.fileName}>{selectedTemplate.name}</Text>
              <View style={styles.fileActions}>
                <TouchableOpacity onPress={() => handleViewFile(selectedTemplate)}>
                  <Ionicons name="eye" size={20} color={isDarkTheme ? "#A5B4FC" : "#1E3A8A"} />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => handleRemoveFile("template")} style={styles.actionIcon}>
                  <Ionicons name="trash-outline" size={20} color="#EF4444" />
                </TouchableOpacity>
              </View>
            </View>
          )}
        </View>
      )}

      {uploadStatus ? <Text style={[styles.subtitle, { marginBottom: 12 }]}>{uploadStatus}</Text> : null}

      <TouchableOpacity
        style={[styles.generateButton, { opacity: loading || !selectedFile ? 0.7 : 1 }]}
        onPress={handleGeneratePresentation}
        disabled={loading || !selectedFile}
      >
        {loading ? (
          <ActivityIndicator size="small" color="#FFFFFF" />
        ) : (
          <>
            <Ionicons name="sparkles" size={24} color="#FFFFFF" />
            <Text style={styles.generateButtonText}>Generate Slides</Text>
          </>
        )}
      </TouchableOpacity>
    </ScrollView>
  );
};

export default Main;

const getDynamicStyles = (isDarkTheme) =>
  StyleSheet.create({
    container: {
      flexGrow: 1,
      backgroundColor: isDarkTheme ? "#0F172A" : "#F9FAFB",
      padding: 20,
      alignItems: "center",
    },
    header: {
      alignItems: "center",
      marginBottom: 24,
    },
    title: {
      fontSize: 32,
      fontWeight: "800",
      color: isDarkTheme ? "#A5B4FC" : "#1E3A8A",
      textAlign: "center",
    },
    subtitle: {
      fontSize: 16,
      color: isDarkTheme ? "#D1D5DB" : "#6B7280",
      fontWeight: "400",
      textAlign: "center",
      marginTop: 4,
    },
    uploadContainer: {
      flexDirection: "column",
      gap: 10,
      justifyContent: "space-between",
      width: "100%",
      marginBottom: 24,
    },
    uploadBox: {
      flex: 1,
      backgroundColor: isDarkTheme ? "#1E293B" : "#ddd",
      borderRadius: 16,
      padding: 16,
      alignItems: "center",
      marginHorizontal: 8,
      borderWidth: 2,
      borderColor: isDarkTheme ? "#374151" : "#aaa",
      borderStyle: "dashed",
    },
    uploadText: {
      fontSize: 16,
      fontWeight: "600",
      color: isDarkTheme ? "#A5B4FC" : "#1E3A8A",
      marginVertical: 8,
    },
    uploadButton: {
      backgroundColor: isDarkTheme ? "#8B5CF6" : "#1E3A8A",
      paddingVertical: 8,
      paddingHorizontal: 16,
      borderRadius: 8,
      alignItems: "center",
    },
    buttonText: {
      color: "#FFFFFF",
      fontSize: 14,
      fontWeight: "600",
    },
    filesContainer: {
      width: "100%",
      marginBottom: 24,
    },
    sectionTitle: {
      fontSize: 18,
      fontWeight: "600",
      color: isDarkTheme ? "#A5B4FC" : "#1E3A8A",
      marginBottom: 12,
    },
    fileCard: {
      flexDirection: "row",
      alignItems: "center",
      backgroundColor: isDarkTheme ? "#1E293B" : "#FFFFFF",
      borderRadius: 12,
      padding: 12,
      marginVertical: 4,
      borderWidth: 2,
      borderColor: isDarkTheme ? "#374151" : "#E5E7EB",
      borderStyle: "dashed",
    },
    fileName: {
      fontSize: 14,
      color: isDarkTheme ? "#D1D5DB" : "#4B5563",
      flex: 1,
      marginLeft: 12,
      marginRight: 8,
    },
    fileActions: {
      flexDirection: "row",
      alignItems: "center",
    },
    actionIcon: {
      marginLeft: 16,
    },
    generateButton: {
      flexDirection: "row",
      backgroundColor: isDarkTheme ? "#10B981" : "#059669",
      paddingVertical: 14,
      paddingHorizontal: 32,
      borderRadius: 12,
      alignItems: "center",
      justifyContent: "center",
      width: "90%",
    },
    generateButtonText: {
      color: "#FFFFFF",
      fontSize: 18,
      fontWeight: "600",
      marginLeft: 8,
    },
  });
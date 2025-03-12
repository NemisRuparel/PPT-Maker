import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, Alert, ActivityIndicator, Platform } from 'react-native';
import * as DocumentPicker from 'expo-document-picker';
import * as IntentLauncher from 'expo-intent-launcher';
import * as FileSystem from 'expo-file-system';

const Main = () => {
  const [uploadVisible, setUploadVisible] = useState(false);
  const [text, setText] = useState('');
  const [selectedFile, setSelectedFile] = useState(null);
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleToggleUpload = () => {
    setUploadVisible(!uploadVisible);
  };

  const handleFileUpload = async (type) => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: type === 'template' 
          ? 'application/vnd.openxmlformats-officedocument.presentationml.presentation' 
          : 'application/vnd.openxmlformats-officedocument.presentationml.presentation,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      });

      if (result.canceled) return;

      if (result.assets && result.assets.length > 0) {
        let fileUri = result.assets[0].uri;
        let fileName = result.assets[0].name || fileUri.split('/').pop();

        if (type === 'template') {
          setSelectedTemplate({ name: fileName, uri: fileUri });
          Alert.alert('Template Uploaded', `You uploaded: ${fileName}`);
        } else {
          setSelectedFile({ name: fileName, uri: fileUri });
          Alert.alert('File Selected', `You selected: ${fileName}`);
        }
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to upload file');
      console.error("Upload Error:", error);
    }
  };

  const openFile = async (fileUri) => {
    if (!fileUri) {
      Alert.alert("Error", "No file found to open");
      return;
    }

    try {
      if (Platform.OS === 'android') {
        const cUri = await FileSystem.getContentUriAsync(fileUri);
        IntentLauncher.startActivityAsync("android.intent.action.VIEW", {
          data: cUri,
          flags: 1,
        });
      } else {
        Alert.alert("Error", "Opening files is only supported on Android for now.");
      }
    } catch (error) {
      Alert.alert("Error", "Cannot open file. Try opening it manually.");
      console.error("File Open Error:", error);
    }
  };

  const handleGenerate = () => {
    if (!text.trim() || (!selectedFile && !selectedTemplate)) {
      Alert.alert("Missing Data", "Please provide text input or upload a file.");
      return;
    }
    
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      Alert.alert("Success", "Your presentation is generated!");
    }, 3000);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Add Your Idea</Text>
      <TextInput
        style={styles.textArea}
        multiline={true}
        onChangeText={setText}
        value={text}
        numberOfLines={4}
        maxLength={200}
        placeholder="Type your idea..."
        placeholderTextColor="#666"
      />

      <TouchableOpacity style={styles.attachBtn} onPress={handleToggleUpload}>
        <Text style={styles.attachBtnText}>+ Attach Files</Text>
      </TouchableOpacity>
      
      {uploadVisible && (
        <View style={styles.uploadContainer}>
          <TouchableOpacity style={styles.uploadRefBtn} onPress={() => handleFileUpload('reference')}>
            <Text style={styles.uploadBtnText}>Upload Reference (.pptx, .docx, .xlsx)</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.uploadTempBtn} onPress={() => handleFileUpload('template')}>
            <Text style={styles.uploadBtnText}>Upload Template (.pptx)</Text>
          </TouchableOpacity>
        </View>
      )}

      {selectedFile && (
        <View style={styles.fileRow}>
          <Text style={styles.fileText}>{selectedFile.name}</Text>
          <TouchableOpacity onPress={() => openFile(selectedFile.uri)} style={styles.viewBtn}>
            <Text style={styles.viewBtnText}>View </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setSelectedFile(null)}>
            <Text style={styles.removeBtn}>Remove</Text>
          </TouchableOpacity>
        </View>
      )}

      {selectedTemplate && (
        <View style={styles.fileRow}>
          <Text style={styles.fileText}>{selectedTemplate.name}</Text>
          <TouchableOpacity onPress={() => openFile(selectedTemplate.uri)} style={styles.viewBtn}>
            <Text style={styles.viewBtnText}>View </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setSelectedTemplate(null)}>
            <Text style={styles.removeBtn}>Remove</Text>
          </TouchableOpacity>
        </View>
      )}

      {loading ? <ActivityIndicator size="large" color="#003366" style={{ marginTop: 20 }} /> : (
        <TouchableOpacity style={styles.generateBtn} onPress={handleGenerate}>
          <Text style={styles.generateBtnText}>Generate </Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

export default Main;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5F5DC',
    paddingHorizontal: 20,
  },
  heading: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#003366',
    marginBottom: 20,
    textAlign: 'center'
  },
  textArea: {
    width: '100%',
    height: 140,
    borderWidth: 1,
    padding: 10,
    textAlignVertical: 'top',
    fontSize: 16,
    borderRadius: 8,
    borderColor: '#003366',
    backgroundColor: '#fff',
    color: '#003366',
    marginBottom: 15,
  },
  attachBtn: {
    backgroundColor: '#003366',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 25,
    marginBottom: 10,
  },
  attachBtnText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  uploadContainer: {
    marginTop: 10,
  },
  uploadBtn: {
    backgroundColor: '#ccc',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 10,
    marginBottom: 10,
    alignItems: 'center',
  },
  uploadRefBtn: {
    backgroundColor: '#ccc',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 10,
    marginBottom: 10,
    alignItems: 'center',
    marginLeft:200,
    marginBottom:-65
  },
  uploadTempBtn: {
    backgroundColor: '#ccc',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 10,
    marginBottom: 10,
    alignItems: 'center',
    marginRight:200

  },
  uploadBtnText: {
    color: '#003366',
    fontSize: 16,
    fontWeight: 'bold',
  },
  generateBtn: {
    backgroundColor: '#003366',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 10,
    marginTop: 20,
    width:380,
    paddingRight:130
  },
  generateBtnText: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },
});

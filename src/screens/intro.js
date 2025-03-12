import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

const Intro = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>SlideSnap</Text>
      
      <Text style={styles.text}>
        Generate your PPTs instantly!{"\n"}
        No more wasted time—focus on what matters. {"\n"} Fast, secure, and completely free!
      </Text>

      <Text style={styles.funFact}>
        <Text style={{ fontWeight: 'bold' }}>Fun Fact: </Text>
        Your deadline is closer than you think! ⏳
      </Text>

      <TouchableOpacity 
        onPress={() => navigation.navigate('Main')}
        style={styles.btn}
      >
        <Text style={styles.btnText}>Generate Now</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Intro;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5F5DC',
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 40,
    fontWeight: 'bold',
    color: '#003366',
    marginBottom: 20,
    textAlign:'center',
    letterSpacing: 1.5,
  },
  text: {
    fontSize: 18,
    color: '#003366', 
    textAlign: 'center',
    marginBottom: 30,
    lineHeight: 26,
    fontWeight: '500',
  },
  funFact: {
    fontSize: 18,
    color: '#003366', 
    textAlign: 'center',
    marginBottom: 30,
    fontStyle: 'italic',
  },
  btn: {
    backgroundColor: "#003366",
    paddingVertical: 14,
    paddingHorizontal: 40,
    borderRadius: 30,
    shadowColor: "#003366",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.5,
    shadowRadius: 6,
    elevation: 10,
  },
  btnText: {
    color: "#ffffff",
    fontSize: 20,
    fontWeight: "bold",
    textTransform: 'uppercase',
  },
});

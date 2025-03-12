import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity} from 'react-native';

const Intro = ({navigation}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>
      <Text style={{fontWeight:900,fontSize:16,textAlign:'center'}}>Enhancing Presentation Excellence with SlideSnap {'\n\n'}</Text>
        In today's fast-paced, professional landscape, the ability to create visually compelling and distraction-free presentations is paramount. SlideSnap understands the significance of delivering a seamless user experience by ensuring that presentation content takes full precedence. By addressing key distractions, SlideSnap empowers users to craft professional, polished, and immersive presentations. This not only enhances the visual impact of the content but also elevates the overall user experience, ensuring that every presentation is both engaging and impactful.</Text>
      <Text style={styles.txt}>
      <Text style={{fontWeight:900,fontSize:16,textAlign:'center',margintop:150}}>Transform Your Presentations with SlideSnap {'\n\n'}</Text>
        In today's fast-paced, professional landscape, the ability to create visually compelling and distraction-free presentations is paramount. SlideSnap understands the significance of delivering a seamless user experience by ensuring that presentation content takes full precedence. By addressing key distractions, SlideSnap empowers users to craft professional, polished, and immersive presentations. This not only enhances the visual impact of the content but also elevates the overall user experience, ensuring that every presentation is both engaging and impactful.</Text>
        <Text style={{fontSize:20}}><Text style={{fontWeight:900}}>   Fun Fact : </Text>Hurry Up..! Deadline is coming..! 😁  </Text>
   <TouchableOpacity 
             onPress={() => navigation.navigate('main')}
           style={styles.btn}>
           <Text style={{ color: "white", fontSize: 20 }}
           >Generate Now</Text>
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
    backgroundColor: 'beige',
  },
  text: {
    marginTop:-100,
    fontSize: 14,
    color: 'black',
    textAlign:'justify',
    padding:20,
    fontWeight:400
  },
  txt: {
    fontSize: 14,
    color: 'black',
    textAlign:'justify',
    padding:20,
    fontWeight:400
  },
  btn: {
    width: 198,
    backgroundColor: "#003366",
    height: 45,
    paddingLeft: 30,
    paddingTop: 9,
    borderWidth: 1,
    borderColor: "#003366",
    borderRadius: 5,
    marginTop: 25,
    marginLeft: 18,
  },
});

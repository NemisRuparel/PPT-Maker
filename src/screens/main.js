import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput} from 'react-native';
// import { TextInput } from 'react-native-gesture-handler';
// import { Input } from '@/components/ui/input';


const main = () => {
const [text, setText] = useState('');
  return (
<View style={styles.container}>
        {/* <TextInput placeholder='Enter your desired idea here' style={styles.input} ></TextInput> */}
        <Text style={styles.title}>Enter Your Text:</Text>
<TextInput
         style={styles.textArea}
         multiline={true} // Allows multiline input
         numberOfLines={4} // Set the number of lines visible initially
         onChangeText={(inputText) => setText(inputText)}
         value={text}
         placeholder="Type something here..."
       />
           </View>
  );
};

export default main;

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
  input:{
    marginTop:300,
    width:350,
    height:100,
    borderWidth:2,
    borderRadius:5,
    borderColor:'white',
    backgroundColor:'white',
    color:'black',
    fontWeight:700,
    
    

  },
  textArea: {
    height: 150, // Set a height for the text area
    width: '80%', // Control width
    borderColor: '#ccc',
    borderWidth: 1,
    padding: 10,
    textAlignVertical: 'top', // Ensures text starts from the top
    fontSize: 16,
    borderRadius: 5,
  },
});

// import React, { useState } from 'react';
// import { View, TextInput, StyleSheet, Text } from 'react-native';

// export default function App() {
//   const [text, setText] = useState('');

//   return (
//     <View style={styles.container}>
//       <Text style={styles.title}>Enter Your Text:</Text>
//       <TextInput
//         style={styles.textArea}
//         multiline={true} // Allows multiline input
//         numberOfLines={4} // Set the number of lines visible initially
//         onChangeText={(inputText) => setText(inputText)}
//         value={text}
//         placeholder="Type something here..."
//       />
//       <Text style={styles.result}>Your input: {text}</Text>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     padding: 20,
//     backgroundColor: '#f0f0f0',
//   },
//   title: {
//     fontSize: 18,
//     marginBottom: 10,
//   },
//   result: {
//     marginTop: 20,
//     fontSize: 16,
//     color: '#333',
//   },
// });

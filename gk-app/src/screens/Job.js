
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';

const Job = ({ navigation, route }) => {
  const [taskTitle, setTaskTitle] = useState('');
  const { currentId, email, password } = route.params;
  const addressImg="https://s3-alpha-sig.figma.com/img/4d17/f963/f6ee0953600008083c32857b2d79ab5e?Expires=1730073600&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=hS-ZlesIgOFsNI5TzKLXkZNFNd30uIpua1HUhRhIbtBCswHqgN3RenDxUmffeBVTigaFKAneh-4gUSJv2RiFFxfitfJujxSxJQEr2NKXHI4YTVsdVEIRolkIghXgOOngwgFgAiOBvMqI1QZOvqY4aF~SWJemmW6jsCCZvoKZvFmdOY-JON7u6PIX1AC3HUbTmHbp7N3-0R5SZsccTBPMOcDGrDtauJrQUwyT9vmPgmE0eqyBCbdZW1Sm-XMz2UYGHzENW29Q~eVJl4B~iA3Uo7sJv1KoG4D0pSa9-jPly8UCXNY0uycWzvgSktSEe-WsNTqlKACVmOq38s9GRRtKmQ__";

  const handleFinish = () => {
    if (taskTitle.trim()) {
      const newTask = {
        id: currentId.toString(),
        title: taskTitle,
        check: false,
      };

      // Gửi yêu cầu POST để thêm task mới vào API
      fetch('https://671110e34eca2acdb5f37d96.mockapi.io/gkapp/demo', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newTask),
      })
        .then(response => response.json())
        .then(data => {
          navigation.navigate('Task', { newTask: data, email, password });
        })
        .catch(error => console.error('Error adding task:', error));
    } else {
      alert('Please enter a task title');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.tittleScreen}> <Icon name="arrow-left" size={24} color={"white"} marginRight={20} />Job</Text>
        </TouchableOpacity>

        <View style={styles.userInfo}>
          <Image
            source={{ uri: addressImg}}
            style={styles.avatar}
          />
          <View>
            <Text style={styles.userName}>{email}</Text>
            <Text style={styles.userMessage}>{password}</Text>
          </View>
        </View>
      </View>

      <View style={styles.body}>
        <View style={styles.title}>
          <Text style={styles.titleText}>ADD YOUR JOB</Text>
        </View>

        <View style={styles.inputJob}>
          <Icon name="file-text" size={24} color={"#999"} paddingHorizontal={10} />
          <TextInput
            placeholder="Enter your job"
            style={styles.input}
            value={taskTitle}
            onChangeText={setTaskTitle}
          />
        </View>

        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={handleFinish}>
            <Text style={styles.buttonText}>FINISH <Icon name='arrow-right' size={16} color={"white"} /></Text>
          </TouchableOpacity>
        </View>

        <View style={styles.avatar2Container}>
         <Image
            source={{ uri: addressImg }}
            style={styles.avatar2}
          />

        
        </View>

      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: "#333",
    // paddingTop:50,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
    tittleScreen:{
    fontSize:24,
    color:"white"
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    height: 40,
    width: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  avatar2:{
          height: 200,
    width: 200,
    borderRadius: 20,
    marginRight: 10
  },
  userName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
  },
  userMessage: {
    fontSize: 14,
    color: 'white',
  },
  body: {
    flex: 1,
    backgroundColor: 'white',
    paddingHorizontal: 10,
  },
  title: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 40,
  },
  titleText: {
    fontSize: 36,
    fontWeight: 'bold',
    color: "black",
  },
  inputJob: {
    flexDirection: "row",
    borderColor: "#999",
    borderWidth: 1,
    borderRadius: 8,
    alignItems: 'center',
    padding: 5,
  },
  input: {
    padding: 10,
        fontSize: 16,
    flex: 1,
  },
  buttonContainer: {
    alignItems: 'center',
    justifyContent: 'center',



    paddingVertical: 40,
  },
  button: {
    backgroundColor: "#00BFFF",
    padding: 5,
    borderRadius: 20,
    width: 200,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: "#999",
  },
  buttonText: {
    fontSize: 16,
    color: 'white',
    fontWeight: 'bold',
    padding: 10,
  },
  avatar2Container:{
    flex:1,
    justifyContent: "center",
    alignItems:"center"
  }
});

export default Job;



// import React, { useState, useEffect } from 'react';
// import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, ScrollView } from 'react-native';
// import Icon from 'react-native-vector-icons/Feather';

// const Job = ({ navigation, route }) => {
//   const { currentId, email, password, taskToEdit } = route.params;
//   const [taskTitle, setTaskTitle] = useState(taskToEdit ? taskToEdit.title : '');
//   const addressImg = "https://s3-alpha-sig.figma.com/img/4d17/f963/f6ee0953600008083c32857b2d79ab5e?Expires=1730073600&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=hS-ZlesIgOFsNI5TzKLXkZNFNd30uIpua1HUhRhIbtBCswHqgN3RenDxUmffeBVTigaFKAneh-4gUSJv2RiFFxfitfJujxSxJQEr2NKXHI4YTVsdVEIRolkIghXgOOngwgFgAiOBvMqI1QZOvqY4aF~SWJemmW6jsCCZvoKZvFmdOY-JON7u6PIX1AC3HUbTmHbp7N3-0R5SZsccTBPMOcDGrDtauJrQUwyT9vmPgmE0eqyBCbdZW1Sm-XMz2UYGHzENW29Q~eVJl4B~iA3Uo7sJv1KoG4D0pSa9-jPly8UCXNY0uycWzvgSktSEe-WsNTqlKACVmOq38s9GRRtKmQ__";

//   const handleFinish = () => {
//     if (taskTitle.trim()) {
//       const newTask = {
//         id: currentId.toString(),
//         title: taskTitle,
//         check: false,
//       };

//       const url = taskToEdit
//         ? `https://671110e34eca2acdb5f37d96.mockapi.io/gkapp/demo/${taskToEdit.id}`
//         : 'https://671110e34eca2acdb5f37d96.mockapi.io/gkapp/demo';

//       const method = taskToEdit ? 'PUT' : 'POST';

//       fetch(url, {
//         method: method,
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(newTask),
//       })
//         .then(response => response.json())
//         .then(data => {
//           navigation.navigate('Task', { newTask: data, email, password });
//         })
//         .catch(error => console.error('Error adding task:', error));
//     } else {
//       alert('Please enter a task title');
//     }
//   };

//   return (
//     <View style={styles.container}>
//       <View style={styles.header}>
//         <TouchableOpacity onPress={() => navigation.goBack()}>
//           <Text style={styles.tittleScreen}> <Icon name="arrow-left" size={24} color={"white"} marginRight={20} />Job</Text>
//         </TouchableOpacity>

//         <View style={styles.userInfo}>
//           <Image
//             source={{ uri: addressImg }}
//             style={styles.avatar}
//           />
//           <View>
//             <Text style={styles.userName}>{email}</Text>
//             <Text style={styles.userMessage}>{password}</Text>
//           </View>
//         </View>
//       </View>

//       <View style={styles.body}>
//         <View style={styles.title}>
//           <Text style={styles.titleText}>{taskToEdit ? 'EDIT YOUR JOB' : 'ADD YOUR JOB'}</Text>
//         </View>

//         <View style={styles.inputJob}>
//           <Icon name="file-text" size={24} color={"#999"} paddingHorizontal={10} />
//           <TextInput
//             placeholder="Enter your job"
//             style={styles.input}
//             value={taskTitle}
//             onChangeText={setTaskTitle}
//           />
//         </View>

//         <View style={styles.buttonContainer}>
//           <TouchableOpacity style={styles.button} onPress={handleFinish}>
//             <Text style={styles.buttonText}>{taskToEdit ? 'SAVE' : 'FINISH'} <Icon name='arrow-right' size={16} color={"white"} /></Text>
//           </TouchableOpacity>
//         </View>

//         <View style={styles.avatar2Container}>
//          <Image
//             source={{ uri: addressImg }}
//             style={styles.avatar2}
//           />
//         </View>
//       </View>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: 'white',
//   },
//   header: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     backgroundColor: "#333",
//     paddingHorizontal: 10,
//     paddingVertical: 5,
//   },
//   tittleScreen: {
//     fontSize: 24,
//     color: "white"
//   },
//   userInfo: {
//     flexDirection: 'row',
//     alignItems: 'center',
//   },
//   avatar: {
//     height: 40,
//     width: 40,
//     borderRadius: 20,
//     marginRight: 10,
//   },
//   avatar2: {
//     height: 200,
//     width: 200,
//     borderRadius: 20,
//     marginRight: 10
//   },
//   userName: {
//     fontSize: 18,
//     fontWeight: 'bold',
//     color: 'white',
//   },
//   userMessage: {
//     fontSize: 14,
//     color: 'white',
//   },
//   body: {
//     flex: 1,
//     backgroundColor: 'white',
//     paddingHorizontal: 10,
//   },
//   title: {
//     alignItems: 'center',
//     justifyContent: 'center',
//     paddingVertical: 40,
//   },
//   titleText: {
//     fontSize: 36,
//     fontWeight: 'bold',
//     color: "black",
//   },
//   inputJob: {
//     flexDirection: "row",
//     borderColor: "#999",
//     borderWidth: 1,
//     borderRadius: 8,
//     alignItems: 'center',
//     padding: 5,
//   },
//   input: {
//     padding: 10,
//     fontSize: 16,
//     flex: 1,
//   },
//   buttonContainer: {
//     alignItems: 'center',
//     justifyContent: 'center',
//     paddingVertical: 40,
//   },
//   button: {
//     backgroundColor: "#00BFFF",
//     padding: 5,
//     borderRadius: 20,
//     width: 200,
//     alignItems: 'center',
//     borderWidth: 1,
//     borderColor: "#999",
//   },
//   buttonText: {
//     fontSize: 16,
//     color: 'white',
//     fontWeight: 'bold',
//     padding: 10,
//   },
//   avatar2Container: {
//     flex: 1,
//     justifyContent: "center",
//     alignItems: "center"
//   }
// });

// export default Job;
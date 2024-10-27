
import React, { useState, useEffect, useCallback } from 'react'; 
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, FlatList, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import Dialog from 'react-native-dialog';
import { useFocusEffect } from '@react-navigation/native';

const Task = ({ navigation, route }) => {

  const addressImg = "https://s3-alpha-sig.figma.com/img/4d17/f963/f6ee0953600008083c32857b2d79ab5e?Expires=1730073600&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=hS-ZlesIgOFsNI5TzKLXkZNFNd30uIpua1HUhRhIbtBCswHqgN3RenDxUmffeBVTigaFKAneh-4gUSJv2RiFFxfitfJujxSxJQEr2NKXHI4YTVsdVEIRolkIghXgOOngwgFgAiOBvMqI1QZOvqY4aF~SWJemmW6jsCCZvoKZvFmdOY-JON7u6PIX1AC3HUbTmHbp7N3-0R5SZsccTBPMOcDGrDtauJrQUwyT9vmPgmE0eqyBCbdZW1Sm-XMz2UYGHzENW29Q~eVJl4B~iA3Uo7sJv1KoG4D0pSa9-jPly8UCXNY0uycWzvgSktSEe-WsNTqlKACVmOq38s9GRRtKmQ__";

  const { email, password } = route.params;
  const [taskData, setTaskData] = useState([]);
  const [filteredTaskData, setFilteredTaskData] = useState([]);
  const [editingTaskId, setEditingTaskId] = useState(null);
  const [newTitle, setNewTitle] = useState('');
  const [isDialogVisible, setIsDialogVisible] = useState(false);
  const [currentId, setCurrentId] = useState(1);
  const [filter, setFilter] = useState('all'); // State để quản lý trạng thái lọc

  // Hàm này sẽ gọi khi màn hình Task được focus lại (sau khi điều hướng từ Job)
  useFocusEffect(
    useCallback(() => {
      fetchData();
    }, [])
  );

  const fetchData = () => {
    fetch('https://671110e34eca2acdb5f37d96.mockapi.io/gkapp/demo')
      .then(response => response.json())
      .then(data => {
        setTaskData(data);
        setCurrentId(data.length + 1); // Set currentId to the next available id
        applyFilter(data, filter); // Áp dụng bộ lọc khi dữ liệu được tải
      })
      .catch(error => console.error('Error fetching data:', error));
  };

  const updateTask = (id, updatedTask) => {
    fetch(`https://671110e34eca2acdb5f37d96.mockapi.io/gkapp/demo/${id}`, {
      method: 'PUT', // Hoặc 'PATCH' nếu API hỗ trợ
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedTask),
    })
      .then(response => response.json())
      .then(data => {
        const updatedTasks = taskData.map(task => (task.id === id ? data : task));
        setTaskData(updatedTasks);
        applyFilter(updatedTasks, filter); // Áp dụng bộ lọc sau khi cập nhật
      })
      .catch(error => console.error('Error updating task:', error));
  };

  const deleteTask = (id) => {
    fetch(`https://671110e34eca2acdb5f37d96.mockapi.io/gkapp/demo/${id}`, {
      method: 'DELETE',
    })
      .then(() => {
        const updatedTasks = taskData.filter((task) => task.id !== id);
        setTaskData(updatedTasks);
        applyFilter(updatedTasks, filter); // Áp dụng bộ lọc sau khi xóa
      })
      .catch(error => console.error('Error deleting task:', error));
  };

  const toggleCheck = (id) => {
    const task = taskData.find(task => task.id === id);
    if (task) {
      const updatedTask = { ...task, check: !task.check };
      updateTask(id, updatedTask);
    }
  };

  const editTask = (id, currentTitle) => {
    setEditingTaskId(id);
    setNewTitle(currentTitle);
    setIsDialogVisible(true);
  };

  const handleSave = () => {
    const updatedTask = { ...taskData.find(task => task.id === editingTaskId), title: newTitle };
    updateTask(editingTaskId, updatedTask);
    setIsDialogVisible(false);
  };

  const applyFilter = (tasks, filter) => {
    let filteredTasks = tasks;
    if (filter === 'check') {
      filteredTasks = tasks.filter(task => task.check);
    } else if (filter === 'uncheck') {
      filteredTasks = tasks.filter(task => !task.check);
    }
    setFilteredTaskData(filteredTasks);
  };

  const handleFilterChange = (newFilter) => {
    setFilter(newFilter);
    applyFilter(taskData, newFilter);
  };

  const renderItem = ({ item }) => (
    <View style={styles.taskItem}>
      <Icon
        name={item.check ? "check-square" : "square"}
        size={24}
        color="green"
        onPress={() => toggleCheck(item.id)}
      />
      <Text style={styles.taskTitle}>{item.title}</Text>
      <View style={styles.taskActions}>
        <Icon name="trash" size={20} color="red" paddingHorizontal={10} onPress={() => deleteTask(item.id)} />
        <Icon name="edit" size={20} color="red" onPress={() => editTask(item.id, item.title)} />
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.tittleScreen}> <Icon name="arrow-left" size={24} color={"white"} marginRight={20} />Task</Text>
        </TouchableOpacity>

        <View style={styles.userInfor}>
          <Image
            source={{ uri: addressImg }}
            style={styles.avatar}
          />
          <View>
            <Text style={styles.userName}>{email}</Text>
            <Text style={styles.userMessage}>{password}</Text>
          </View>
        </View>
      </View>

      <View style={styles.body}>
        <View style={styles.inputSearch}>
          <Icon name="search" size={24} color={"#999"} paddingHorizontal={10} />
          <TextInput
            placeholder='Search'
            style={styles.searchBox}
          />
        </View>

        <View style={styles.filterButtons}>
          <TouchableOpacity
            style={[styles.filterButton, filter === 'all' && styles.activeFilterButton]}
            onPress={() => handleFilterChange('all')}
          >
            <Text style={styles.filterButtonText}>All</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.filterButton, filter === 'check' && styles.activeFilterButton]}
            onPress={() => handleFilterChange('check')}
          >
            <Text style={styles.filterButtonText}>Checked</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.filterButton, filter === 'uncheck' && styles.activeFilterButton]}
            onPress={() => handleFilterChange('uncheck')}
          >
            <Text style={styles.filterButtonText}>Unchecked</Text>
          </TouchableOpacity>
        </View>

        <FlatList
          numColumns={1}
          style={styles.taskList}
          data={filteredTaskData}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          // columnWrapperStyle={styles.row}
        />

        <View style={styles.buttonPosition}>
          <TouchableOpacity style={styles.addButton} onPress={() => navigation.navigate("Job", { currentId, email, password })}>
            <Icon name="plus" size={24} color="white" padding={10} />
          </TouchableOpacity>
        </View>
      </View>

      <Dialog.Container visible={isDialogVisible}>
        <Dialog.Title>Edit Task</Dialog.Title>
        <Dialog.Input
          placeholder="Enter new title"
          value={newTitle}
          onChangeText={setNewTitle}
        />
        <Dialog.Button label="Cancel" onPress={() => setIsDialogVisible(false)} />
        <Dialog.Button label="Save" onPress={handleSave} />
      </Dialog.Container>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    paddingVertical: 5,
    backgroundColor: '#333',
  },
  tittleScreen: {
    fontSize: 24,
    color: "white"
  },
  userInfor: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  userName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
  },
  userMessage: {
    fontSize: 12,
    color: 'white',
  },
  body: {
    flex: 1,
    backgroundColor: 'white',
    paddingHorizontal: 10,
  },
  searchBox: {
    padding: 10,
    fontSize: 16,
    flex: 1,
  },
  inputSearch: {
    borderColor: "#999",
    borderWidth: 1,
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 10,
    padding: 5,
    marginVertical: 10,
  },
  filterButtons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 10,
  },
  filterButton: {
    width: "30%",
    borderRadius: 5,
    padding: 5,
    borderWidth: 1,
    borderColor: 'orange',
    alignItems: 'center',
  },
  activeFilterButton: {
    backgroundColor: 'orange',
  },
  filterButtonText: {
    fontSize: 16,
  },
  taskList: {
    flex: 1,
  },
  // row: {
  //   flex: 1,
  //   justifyContent: "space-around"
  // },
  taskItem: {
    backgroundColor: '#f5f5f5',
    padding: 15,
    borderRadius: 8,
    marginVertical: 10,
    flex: 1,
    marginHorizontal: 5,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  taskTitle: {
    flex: 1,
    marginLeft: 10,
    fontSize: 16,
    color: '#333',
  },
  taskActions: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  buttonPosition: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  addButton: {
    backgroundColor: '#00BFFF',
    width: 200,
    padding: 5,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    margin: 20,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
});

export default Task;

// import React, { useState, useEffect, useCallback } from 'react'; 
// import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, FlatList, Alert } from 'react-native';
// import Icon from 'react-native-vector-icons/Feather';
// import { useFocusEffect } from '@react-navigation/native';

// const Task = ({ navigation, route }) => {

//   const addressImg = "https://s3-alpha-sig.figma.com/img/4d17/f963/f6ee0953600008083c32857b2d79ab5e?Expires=1730073600&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=hS-ZlesIgOFsNI5TzKLXkZNFNd30uIpua1HUhRhIbtBCswHqgN3RenDxUmffeBVTigaFKAneh-4gUSJv2RiFFxfitfJujxSxJQEr2NKXHI4YTVsdVEIRolkIghXgOOngwgFgAiOBvMqI1QZOvqY4aF~SWJemmW6jsCCZvoKZvFmdOY-JON7u6PIX1AC3HUbTmHbp7N3-0R5SZsccTBPMOcDGrDtauJrQUwyT9vmPgmE0eqyBCbdZW1Sm-XMz2UYGHzENW29Q~eVJl4B~iA3Uo7sJv1KoG4D0pSa9-jPly8UCXNY0uycWzvgSktSEe-WsNTqlKACVmOq38s9GRRtKmQ__";

//   const { email, password } = route.params;
//   const [taskData, setTaskData] = useState([]);
//   const [filteredTaskData, setFilteredTaskData] = useState([]);
//   const [currentId, setCurrentId] = useState(1);
//   const [filter, setFilter] = useState('all'); // State để quản lý trạng thái lọc

//   // Hàm này sẽ gọi khi màn hình Task được focus lại (sau khi điều hướng từ Job)
//   useFocusEffect(
//     useCallback(() => {
//       fetchData();
//     }, [])
//   );

//   const fetchData = () => {
//     fetch('https://671110e34eca2acdb5f37d96.mockapi.io/gkapp/demo')
//       .then(response => response.json())
//       .then(data => {
//         setTaskData(data);
//         setCurrentId(data.length + 1); // Set currentId to the next available id
//         applyFilter(data, filter); // Áp dụng bộ lọc khi dữ liệu được tải
//       })
//       .catch(error => console.error('Error fetching data:', error));
//   };

//   const updateTask = (id, updatedTask) => {
//     fetch(`https://671110e34eca2acdb5f37d96.mockapi.io/gkapp/demo/${id}`, {
//       method: 'PUT', // Hoặc 'PATCH' nếu API hỗ trợ
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify(updatedTask),
//     })
//       .then(response => response.json())
//       .then(data => {
//         const updatedTasks = taskData.map(task => (task.id === id ? data : task));
//         setTaskData(updatedTasks);
//         applyFilter(updatedTasks, filter); // Áp dụng bộ lọc sau khi cập nhật
//       })
//       .catch(error => console.error('Error updating task:', error));
//   };

//   const deleteTask = (id) => {
//     fetch(`https://671110e34eca2acdb5f37d96.mockapi.io/gkapp/demo/${id}`, {
//       method: 'DELETE',
//     })
//       .then(() => {
//         const updatedTasks = taskData.filter((task) => task.id !== id);
//         setTaskData(updatedTasks);
//         applyFilter(updatedTasks, filter); // Áp dụng bộ lọc sau khi xóa
//       })
//       .catch(error => console.error('Error deleting task:', error));
//   };

//   const toggleCheck = (id) => {
//     const task = taskData.find(task => task.id === id);
//     if (task) {
//       const updatedTask = { ...task, check: !task.check };
//       updateTask(id, updatedTask);
//     }
//   };

//   const editTask = (task) => {
//     navigation.navigate('Job', { currentId, email, password, taskToEdit: task });
//   };

//   const applyFilter = (tasks, filter) => {
//     let filteredTasks = tasks;
//     if (filter === 'check') {
//       filteredTasks = tasks.filter(task => task.check);
//     } else if (filter === 'uncheck') {
//       filteredTasks = tasks.filter(task => !task.check);
//     }
//     setFilteredTaskData(filteredTasks);
//   };

//   const handleFilterChange = (newFilter) => {
//     setFilter(newFilter);
//     applyFilter(taskData, newFilter);
//   };

//   const renderItem = ({ item }) => (
//     <View style={styles.taskItem}>
//       <Icon
//         name={item.check ? "check-square" : "square"}
//         size={24}
//         color="green"
//         onPress={() => toggleCheck(item.id)}
//       />
//       <Text style={styles.taskTitle}>{item.title}</Text>
//       <View style={styles.taskActions}>
//         <Icon name="trash" size={20} color="red" paddingHorizontal={10} onPress={() => deleteTask(item.id)} />
//         <Icon name="edit" size={20} color="red" onPress={() => editTask(item)} />
//       </View>
//     </View>
//   );

//   return (
//     <View style={styles.container}>
//       <View style={styles.header}>
//         <TouchableOpacity onPress={() => navigation.goBack()}>
//           <Text style={styles.tittleScreen}> <Icon name="arrow-left" size={24} color={"white"} marginRight={20} />Task</Text>
//         </TouchableOpacity>

//         <View style={styles.userInfor}>
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
//         <View style={styles.inputSearch}>
//           <Icon name="search" size={24} color={"#999"} paddingHorizontal={10} />
//           <TextInput
//             placeholder='Search'
//             style={styles.searchBox}
//           />
//         </View>

//         <View style={styles.filterButtons}>
//           <TouchableOpacity
//             style={[styles.filterButton, filter === 'all' && styles.activeFilterButton]}
//             onPress={() => handleFilterChange('all')}
//           >
//             <Text style={styles.filterButtonText}>All</Text>
//           </TouchableOpacity>
//           <TouchableOpacity
//             style={[styles.filterButton, filter === 'check' && styles.activeFilterButton]}
//             onPress={() => handleFilterChange('check')}
//           >
//             <Text style={styles.filterButtonText}>Checked</Text>
//           </TouchableOpacity>
//           <TouchableOpacity
//             style={[styles.filterButton, filter === 'uncheck' && styles.activeFilterButton]}
//             onPress={() => handleFilterChange('uncheck')}
//           >
//             <Text style={styles.filterButtonText}>Unchecked</Text>
//           </TouchableOpacity>
//         </View>

//         <FlatList
//           numColumns={2}
//           style={styles.taskList}
//           data={filteredTaskData}
//           renderItem={renderItem}
//           keyExtractor={(item) => item.id}
//           columnWrapperStyle={styles.row}
//         />

//         <View style={styles.buttonPosition}>
//           <TouchableOpacity style={styles.addButton} onPress={() => navigation.navigate("Job", { currentId, email, password })}>
//             <Icon name="plus" size={24} color="white" padding={10} />
//           </TouchableOpacity>
//         </View>
//       </View>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//   },
//   header: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'space-between',
//     paddingHorizontal: 10,
//     paddingVertical: 5,
//     backgroundColor: '#333',
//   },
//   tittleScreen: {
//     fontSize: 24,
//     color: "white"
//   },
//   userInfor: {
//     flexDirection: 'row',
//     alignItems: 'center',
//   },
//   avatar: {
//     width: 50,
//     height: 50,
//     borderRadius: 25,
//   },
//   userName: {
//     fontSize: 18,
//     fontWeight: 'bold',
//     color: 'white',
//   },
//   userMessage: {
//     fontSize: 12,
//     color: 'white',
//   },
//   body: {
//     flex: 1,
//     backgroundColor: 'white',
//     paddingHorizontal: 10,
//   },
//   searchBox: {
//     padding: 10,
//     fontSize: 16,
//     flex: 1,
//   },
//   inputSearch: {
//     borderColor: "#999",
//     borderWidth: 1,
//     flexDirection: 'row',
//     alignItems: 'center',
//     borderRadius: 10,
//     padding: 5,
//     marginVertical: 10,
//   },
//   filterButtons: {
//     flexDirection: 'row',
//     justifyContent: 'space-around',
//     marginVertical: 10,
//   },
//   filterButton: {
//     padding: 10,
//     borderRadius: 5,
//     borderWidth: 1,
//     borderColor: '#ccc',
//   },
//   activeFilterButton: {
//     backgroundColor: '#ddd',
//   },
//   filterButtonText: {
//     fontSize: 16,
//   },
//   taskList: {
//     flex: 1,
//   },
//   row: {
//     flex: 1,
//     justifyContent: "space-around"
//   },
//   taskItem: {
//     backgroundColor: '#f5f5f5',
//     padding: 15,
//     borderRadius: 8,
//     marginVertical: 10,
//     flex: 1,
//     marginHorizontal: 5,
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   taskTitle: {
//     flex: 1,
//     marginLeft: 10,
//     fontSize: 16,
//     color: '#333',
//   },
//   taskActions: {
//     flexDirection: 'row',
//     alignItems: 'center',
//   },
//   buttonPosition: {
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   addButton: {
//     backgroundColor: '#00BFFF',
//     width: 200,
//     padding: 5,
//     borderRadius: 30,
//     alignItems: 'center',
//     justifyContent: 'center',
//     margin: 20,
//   },
//   avatar: {
//     width: 40,
//     height: 40,
//     borderRadius: 20,
//     marginRight: 10,
//   },
// });

// export default Task;
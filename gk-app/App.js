// import React from 'react';
// import { View, StatusBar } from 'react-native';
// import { NavigationContainer } from '@react-navigation/native';
// import { createStackNavigator } from '@react-navigation/stack';
// import Home from './src/screens/Home';
// import Task from './src/screens/Task';
// import Job from './src/screens/Job';


// const Stack = createStackNavigator();

// const App = () => {
//   return (

//     <NavigationContainer>
//       <Stack.Navigator>
        
//         <Stack.Screen name="Home" component={Home} options={{headerShown: false}} />
//         <Stack.Screen name="Task" component={Task} options={{headerShown: false}} />
//         <Stack.Screen name="Job" component={Job} options={{headerShown: false}} />  
//       </Stack.Navigator>
//       <StatusBar backgroundColor="#333" barStyle="light-content" />
      
//     </NavigationContainer>
//   );
// };

// export default App;


import React from 'react';
import { View, StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import BottomTabNavigator from './src/screens/BottomTabNavigator';

const App = () => {
  return (
    <NavigationContainer>
      <BottomTabNavigator />
      <StatusBar backgroundColor="#333" barStyle="light-content" />
    </NavigationContainer>
  );
};

export default App;
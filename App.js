import { StatusBar } from 'expo-status-bar';
import {Button, Image} from 'react-native';

import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import favicon from './assets/favicon.png';
import { useNavigation } from '@react-navigation/native';
//pages
import HomePage from './Pages/HomePage';
import AddItemButton from './Components/TodoList/AddItemButton';
import NewTodoItemPage from './Pages/NewTodoItemPage';
import TodoListProvider from './Components/TodoList/TodoListData';

const Stack = createStackNavigator();

function MainNavigator() {

  const navigation = useNavigation();
  return (
    <Stack.Navigator
    screenOptions={{headerBackTitleVisible:false}}
    >
      
      <Stack.Screen name="Home" component={HomePage} 
      options={{
        headerStyle: {
        },
        headerRight: ()=> <AddItemButton onPressed={()=>navigation.navigate('Create New Item')}/>,// Sağ tarafta buton oluştur
        headerLeft: ()=> <Image source={favicon} style={{width: 40, height: 40, marginLeft: 20}}/>
      }}
      />
      <Stack.Screen name= "Create New Item" component={NewTodoItemPage}/>
    </Stack.Navigator>

    
    
  );
}

export default function App() {
  return(
  <NavigationContainer>
    <TodoListProvider>
        <MainNavigator/>
        <StatusBar style="auto" />
    </TodoListProvider>

  </NavigationContainer>

  )
}


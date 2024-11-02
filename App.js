import { StatusBar } from 'expo-status-bar';
import {Button, Image,View,ActivityIndicator} from 'react-native';

import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import favicon from './assets/favicon.png';
import { useNavigation } from '@react-navigation/native';
//pages
import HomePage from './Pages/HomePage';
import AddItemButton from './Components/TodoList/AddItemButton';
import NewTodoItemPage from './Pages/NewTodoItemPage';
import TodoListProvider from './Components/TodoList/TodoListData';

import { loadFonts } from './Components/CodeBase/Fonts/Fonts';
import { GlobalStyles } from './Components/CodeBase/Fonts/FontStyles';
import { useEffect, useState } from 'react';
const Stack = createStackNavigator();

function MainNavigator() {

  const navigation = useNavigation();
  return (
    <Stack.Navigator
    screenOptions={{headerBackTitleVisible:false}}
    >
      
      <Stack.Screen  name="Home" component={HomePage} 
      options={{
        headerTitleStyle: {...GlobalStyles.headerText,
          flex: 1,
        },
        headerRight: ()=> <AddItemButton onPressed={()=>navigation.navigate('Create New Item')}/>,// Sağ tarafta buton oluştur
        headerLeft: ()=> <Image source={favicon} style={{width: 40, height: 40, marginLeft: 20}}/>
      }}
      />
      <Stack.Screen name= "Create New Item" component={NewTodoItemPage}
      options={
        {
          headerTitleStyle: {...GlobalStyles.headerText,
            flex: 1,
          },
        }
      }
      />
    </Stack.Navigator>

    
    
  );
}

export default function App() {
  const [fontsLoaded, setFontsLoaded] = useState(false);

  useEffect(() => {
    loadFonts().then(() => {
        setFontsLoaded(true);
        console.log("Fonts loaded");
    }).catch((error) => {
        console.log(error);
    });
  } , []);

  if (!fontsLoaded) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }
  return(
    <NavigationContainer>
    <TodoListProvider>
        <MainNavigator/>
        <StatusBar style="auto" />
    </TodoListProvider>
    </NavigationContainer>
  );
}


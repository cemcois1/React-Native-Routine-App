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

const Stack = createStackNavigator();

function TopBar() {

  const navigation = useNavigation();
  return (
    <Stack.Navigator>
      
      <Stack.Screen name="test" component={HomePage} 
      options={{
        headerStyle: {
        },
        headerRight: ()=> <AddItemButton onPressed={()=>navigation.navigate('Test1')}/>,
        
           // Sağ tarafta buton oluştur
        headerLeft: ()=> <Image source={favicon} style={{width: 40, height: 40, marginLeft: 20}}/>
      }}
      />
      <Stack.Screen name= "Test1" component={NewTodoItemPage}/>
      <Stack.Screen name="TopBar" component={TopBar} />
    </Stack.Navigator>

    
    
  );
}

export default function App() {
  return(
    <NavigationContainer>

    <TopBar/>
    <StatusBar style="auto" />
    
    </NavigationContainer>
  )
}


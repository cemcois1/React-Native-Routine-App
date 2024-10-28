
import React from 'react';
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';
import TodoListView from '../Components/TodoList/TodoListView';

export default function HomePage({navigation}) {
  return (
    <View style={styles.container}>
        <TodoListView/>
      </View>
      
    );
}

const styles = StyleSheet.create({
    container: {
      //tüm ekranı kapla
      flex: 1,
      backgroundColor: '#fff',
    },
    header: {
      height: 85,
      backgroundColor: '#6200EE',
      justifyContent: 'center',
      alignItems: 'center',
    },
    headerText: {
      color: '#000',
      fontSize: 20,
      fontWeight: 'bold',
    },
    safeAreaContent: {
      flex: 1,
      backgroundColor: '#fff', // Safe Area içindeki içerik beyaz olacak
    },
    content: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    contentText: {
      fontSize: 18,
      color: '#000',
    },
  });

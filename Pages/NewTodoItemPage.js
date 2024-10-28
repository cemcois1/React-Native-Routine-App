
import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { Text, View, StyleSheet, TextInput, Button,KeyboardAvoidingView } from 'react-native';
import {useTodoList} from '../Components/TodoList/TodoListData';
export default function NewTodoItemPage() {


    const {todoList,setTodoList} = useTodoList();

    const navigator=useNavigation();
    const [taskName, setTaskName] = React.useState('');
    return (
        <KeyboardAvoidingView 
        behavior='height'
        style={styles.container}>
            <TextInput style={styles.input} placeholder="Task Name" onChangeText={(data)=>setTaskName(data)} />
            <Button title="Add Task" onPress={() =>{
                setTodoList([...todoList,{id:todoList.length+1,title:taskName,isDone:false}]);
                navigator.goBack();
            }}/>
        </KeyboardAvoidingView>
    );

}

const styles = StyleSheet.create(
    {container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    input: {
        width: '80%',
        padding: 10,
        borderWidth: 1,
        borderColor: '#ccc',
        marginBottom: 10,
    },
}
);

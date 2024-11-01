
import { useNavigation, useRoute } from '@react-navigation/native';
import React, { useCallback, useEffect } from 'react';
import { Text, View, StyleSheet, TextInput, Button,KeyboardAvoidingView } from 'react-native';
import {useTodoList} from '../Components/TodoList/TodoListData';

import uuid from 'react-native-uuid';
export default function NewTodoItemPage() {

    
    const route= useRoute();
    const {item}= route.params||{};

    const {todoList,setTodoList} = useTodoList();

    const navigator=useNavigation();
    const [taskName, setTaskName] = React.useState(item?.title||'');

    // Başlığı güncelle
    useEffect(() => {
        navigator.setOptions({
            title: item ? 'Edit Item' : 'Create New Item', // `item` varsa başlığı 'Edit Item' olarak değiştir
        });
    }, [navigator, item]);

    const HandleOnPress = useCallback(()=>{
        if(item){
            setTodoList(todoList.map((todoItem)=>todoItem.id===item.id?{...todoItem,title:taskName}:todoItem));
        }
        else{
            setTodoList([...todoList,{id:uuid.v4(),title:taskName,isDone:false}]);
        }
        navigator.goBack();
    })
    return (
        <KeyboardAvoidingView 
        behavior='height'
        style={styles.container}>
            <TextInput style={styles.input} placeholder="Task Name" defaultValue={taskName} onChangeText={(data)=>setTaskName(data)} />
            <Button title={!item?"Add Task":"Edit Task"} onPress={HandleOnPress}/>
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

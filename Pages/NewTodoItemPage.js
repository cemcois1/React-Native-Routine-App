
import { useNavigation, useRoute } from '@react-navigation/native';
import React, { useCallback, useEffect } from 'react';
import { Text, View, StyleSheet, TextInput, Button,KeyboardAvoidingView,LayoutAnimation } from 'react-native';
import {useTodoList} from '../Components/TodoList/TodoListData';

import uuid from 'react-native-uuid';
export default function NewTodoItemPage() {

    
    const route= useRoute();
    const {item}= route.params||{};

    const {todoList,setTodoList,saveList} = useTodoList();

    const navigator=useNavigation();
    const [taskName, setTaskName] = React.useState(item?.title||'');

    // Başlığı güncelle
    useEffect(() => {
        navigator.setOptions({
            title: item ? 'Edit Item' : 'Create New Item', // `item` varsa başlığı 'Edit Item' olarak değiştir
        });
        //klavyeyi aç
    }, [navigator, item]);

    const HandleOnPress = useCallback(()=>{
        let list = todoList;
        if(item){
            setTodoList(todoList.map((todoItem)=>todoItem.id===item.id?{...todoItem,title:taskName}:todoItem));

        }
        else{
                LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut); // Animasyonlu geçiş
                setTodoList([{id:uuid.v4(),title:taskName,isDone:false},...list]); // Yeni bir görev ekler
        }

        saveList([{id:uuid.v4(),title:taskName,isDone:false},...list]);
        console.log("Save List ");
        navigator.goBack();
    })
    return (
        <KeyboardAvoidingView 
        behavior='height'
        style={styles.container}>
            <TextInput autoFocus={true} style={styles.input} placeholder="Task Name" defaultValue={taskName} onChangeText={(data)=>setTaskName(data)} />
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

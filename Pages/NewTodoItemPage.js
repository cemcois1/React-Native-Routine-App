
import { useNavigation, useRoute } from '@react-navigation/native';
import React, { useCallback, useEffect } from 'react';
import { Text, View, StyleSheet, TextInput, Button,KeyboardAvoidingView,LayoutAnimation } from 'react-native';
import {useTodoList} from '../Components/TodoList/TodoListData';

import uuid from 'react-native-uuid';
import { GlobalStyles } from '../Components/CodeBase/Fonts/FontStyles';
import { TouchableOpacity } from 'react-native-gesture-handler';
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
        }
    );
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
            <TouchableOpacity  style={styles.buttonStyle} onPress={HandleOnPress}>
                <Text style={styles.buttonTextStyle}>{!item?"Add Task":"Edit Task"}</Text>
            </TouchableOpacity>
        </KeyboardAvoidingView>
    );

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    input: {
        ...GlobalStyles.secondaryText,
        width: '80%',
        padding: 10,
        borderWidth: 1,
        borderColor: '#ccc',
        marginBottom: 10,
    },
    buttonTextStyle: {
        textAlign: 'center',
        color: 'white',
        fontSize: 18, // Metin boyutunu büyütmek için
        fontWeight: 'bold',
    },
    buttonStyle: {
        ...GlobalStyles.primaryText,
        marginTop: 45,
        paddingVertical: 15, // Dikeyde daha fazla boşluk ekler
        paddingHorizontal: 40, // Yatayda daha fazla boşluk ekler
        backgroundColor: '#007BFF', // Farklı bir mavi renk
        borderRadius: 25, // Daha oval kenarlar için
        shadowColor: '#000', // Gölgeler ekler
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 3,
        elevation: 5, // Android için gölge efekti
    },
});

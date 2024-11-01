import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useState, createContext, useContext, useEffect } from "react";
import uuid from 'react-native-uuid';
// Context oluştur
const TodoListContext = createContext();

// `TodoListProvider` bileşeni
export default function TodoListProvider({ children }) {
    const getInitialData = () => [
        { id: uuid.v4(), title: 'Task 1', isDone: false },
        { id: uuid.v4(), title: 'Task 2', isDone: false },
        { id: uuid.v4(), title: 'Task 3', isDone: false },
        { id: uuid.v4(), title: 'Task 4', isDone: true },
    ];

    const [todoList, setTodoList] = useState([]);


   // Listeyi AsyncStorage'a kaydeder
   const saveList = async (list) => {
    try {
        const jsonValue = JSON.stringify(list);
        await AsyncStorage.setItem('todoList', jsonValue);
        //save bittiğinde debug at 
        console.log("Liste kaydedildi");
        console.log(list);
    } catch (e) {
        console.error('Listeyi kaydetme hatası:', e);
    }
};

    // AsyncStorage'dan listeyi yükler
    const loadList = async () => {
        try {
            const jsonValue = await AsyncStorage.getItem('todoList');
            
            if (jsonValue != null) {
                setTodoList(JSON.parse(jsonValue));
            } else {
                setTodoList(getInitialData());
            }
        } catch (e) {
            console.error('Listeyi yükleme hatası:', e);
            setTodoList(getInitialData());
        }
    };

    return (
        <TodoListContext.Provider value={{ todoList, setTodoList,saveList,loadList }}>
            {children}
        </TodoListContext.Provider>
    );
}

// `useTodoList` hook'u
export function useTodoList() {
    return useContext(TodoListContext);
}
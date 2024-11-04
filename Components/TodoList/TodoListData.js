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
    const saveList = async (list, openListKeyPrefix) => {
        try {
            const jsonValue = JSON.stringify(list);
            await AsyncStorage.setItem(`${openListKeyPrefix}todoList`, jsonValue);
            console.log(openListKeyPrefix + "Liste kaydedildi", list);
        } catch (e) {
            console.error('Listeyi kaydetme hatası:', e);
        }
    };

    // AsyncStorage'dan listeyi yükler
// AsyncStorage'dan listeyi yükler
const loadList = async (openListKeyPrefix) => {
    try {
        const jsonValue = await AsyncStorage.getItem(`${openListKeyPrefix}todoList`);
        console.log(openListKeyPrefix + " Liste ", JSON.parse(jsonValue).length>0?"yüklendi":'Yüklenemedi'
    );
        if (jsonValue != null) {
            const parsedList = JSON.parse(jsonValue);
            setTodoList(parsedList);
            return parsedList; // Veriyi döndür
        } else {
            const initialData = getInitialData();
            setTodoList(initialData);
            return initialData; // Başlangıç verilerini döndür
        }
    } catch (e) {
        console.error('Listeyi yükleme hatası:', e);
        const initialData = getInitialData();
        setTodoList(initialData);
        return initialData; // Hata durumunda başlangıç verilerini döndür
    }
};


    return (
        <TodoListContext.Provider value={{ todoList, setTodoList, saveList, loadList }}>
            {children}
        </TodoListContext.Provider>
    );
}

// `useTodoList` hook'u
export function useTodoList() {
    return useContext(TodoListContext);
}
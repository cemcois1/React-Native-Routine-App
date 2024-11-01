import React, { useState, createContext, useContext } from "react";
import uuid from 'react-native-uuid';
// Context oluştur
const TodoListContext = createContext();

// `TodoListProvider` bileşeni
export default function TodoListProvider({ children }) {
    const getInitialData = () => [
        { id: uuid.v4(), title: 'Task 1', isDone: false },
        { id: uuid.v4(), title: 'Task 2', isDone: true },
        { id: uuid.v4(), title: 'Task 3', isDone: false },
        { id: uuid.v4(), title: 'Task 4', isDone: true },
    ];

    const [todoList, setTodoList] = useState(getInitialData);

    return (
        <TodoListContext.Provider value={{ todoList, setTodoList }}>
            {children}
        </TodoListContext.Provider>
    );
}

// `useTodoList` hook'u
export function useTodoList() {
    return useContext(TodoListContext);
}
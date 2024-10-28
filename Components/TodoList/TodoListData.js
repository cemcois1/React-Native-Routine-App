import React, { useState, createContext, useContext } from "react";

// Context oluştur
const TodoListContext = createContext();

// `TodoListProvider` bileşeni
export default function TodoListProvider({ children }) {
    const getInitialData = () => [
        { id: 1, title: 'Task 1', isDone: false },
        { id: 2, title: 'Task 2', isDone: true },
        { id: 3, title: 'Task 3', isDone: false },
        { id: 4, title: 'Task 4', isDone: true },
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
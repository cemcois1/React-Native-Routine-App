import React,{ useState } from "react";


export default function TodoListData() {

    //Todo Bind  saved data
    const getInitialData = () => {
        return [
            { id: 1, title: 'Task 1', isDone: false },
            { id: 2, title: 'Task 2', isDone: true },
            { id: 3, title: 'Task 3', isDone: false },
            { id: 4, title: 'Task 4', isDone: true },
        ];
    }
    const [todoList, setTodoList] = useState(getInitialData);

return [todoList, setTodoList];
    


}
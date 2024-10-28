//todo item komponentlerini tutan liste
import React from 'react';
import { View, FlatList,StyleSheet,Text } from 'react-native';
import ToDoItem from './ToDoItem';
import  { useTodoList } from './TodoListData';


export default function TodoListView() {

    const {todoList} = useTodoList();
    return (
        <View style={styles.viewStyle}>

            {todoList.length > 0 ? (
                <FlatList
                    data={todoList}
                    renderItem={({ item }) => <ToDoItem item={item} />}
                    keyExtractor={item => item.id.toString()}
                />
            ) : (
                <Text style={styles.contentText}>Henüz Yapılacaklar yok bir tane girin 1</Text>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    contentText: {
        fontSize: 18,
        color: '#000',
        alignContent: 'center',
        textAlign: 'center',
    },
    viewStyle: {
        backgroundColor: '#ffff',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'stretch'
    },
});
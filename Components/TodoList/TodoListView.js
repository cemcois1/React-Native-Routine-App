//todo item komponentlerini tutan liste
import React, { useCallback } from 'react';
import { View, FlatList,StyleSheet,Text } from 'react-native';
import ToDoItem from './ToDoItem';
import  { useTodoList } from './TodoListData';
import { useNavigation } from '@react-navigation/native';
export default function TodoListView() {

    const {todoList,setTodoList} = useTodoList();
    const navigation = useNavigation();

    const HandleDelete = useCallback((id) => {
        setTodoList(prevTodoList => prevTodoList.filter(item => item.id !== id)); // Güncel listeye göre silme işlemi
    }, [setTodoList]);

    const handleEdit = (item) => {
        navigation.navigate('Create New Item', { item }); // item verisini sayfaya gönder
    };

    return (
        <View style={styles.viewStyle}>

            {todoList.length > 0 ? (
                <FlatList
                    data={todoList}
                    renderItem={({ item }) => <ToDoItem item={item} onDelete={HandleDelete} onEdit={handleEdit}
                    />}
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
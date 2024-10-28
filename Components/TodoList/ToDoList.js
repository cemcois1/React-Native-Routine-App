//todo item komponentlerini tutan liste
import React from 'react';
import { View, FlatList,StyleSheet,Text } from 'react-native';
import ToDoItem from './ToDoItem';


export const itemDatas = [
    { id: 1, title: 'Yapılacak 1', isDone: false },
    { id: 2, title: 'Yapılacak 2', isDone: false },
    { id: 3, title: 'Yapılacak 3', isDone: false },
];

export default function TodoList() {

    return (
        <View style={styles.viewStyle}>

            {itemDatas.length > 0 ? (
                <FlatList
                    data={itemDatas}
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
    },
    viewStyle: {
        backgroundColor: '#ffff',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'stretch'
    },
});
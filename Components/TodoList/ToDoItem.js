//içerisinde checkbox olan verisine göre  görünür olup olmadığını kontrol eden bir component;
import React from 'react';
import { View, Text,StyleSheet,Image } from 'react-native';
export default function ToDoItem({item, onCheck}) {
    return (
        <View style={styles.container}>
            <Image style={{ width : 20, height: 20, marginRight: 10,
                backgroundColor: item.isDone ? 'green' : 'red' }}/>
            <Text style={styles.text}>{item.title}</Text>
        </View>
    );
}

const styles = StyleSheet.create(
    {
        container: {
            flex: 1,
            height: 50,
            padding: 10,
            width: '100%',
            borderBottomWidth: 1,
            borderBottomColor: '#eee',
            backgroundColor: '#f9f9f9',

            flexDirection: 'row',},
        text: {
            fontSize: 18,
        },
    }
);

import React from 'react';
import { Text, View, StyleSheet, TextInput, Button,KeyboardAvoidingView } from 'react-native';

export default function NewTodoItemPage() {

    return (
        <KeyboardAvoidingView 
        behavior='height'
        style={styles.container}>
            <TextInput style={styles.input} placeholder="Task Name" />
            <Button title="Add Task" onPress={() => alert('Task Added!')}/>
        </KeyboardAvoidingView>
    );

}

const styles = StyleSheet.create(
    {container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    input: {
        width: '80%',
        padding: 10,
        borderWidth: 1,
        borderColor: '#ccc',
        marginBottom: 10,
    },

    



}
);

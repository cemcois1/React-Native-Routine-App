//içerisinde checkbox olan verisine göre  görünür olup olmadığını kontrol eden bir component;
import React, { useRef } from 'react';
import { View, Text,StyleSheet,Image,TouchableOpacity } from 'react-native';
import {Swipeable} from 'react-native-gesture-handler';
export default function ToDoItem({item, onDelete,onEdit,onLongPress}) {

    //swipeable Referance
    const swipeableRef = useRef(null);

    // Silme butonu görünümü
    const renderRightActions = () => (
        <View style={{flexDirection:'row'}} >
            <TouchableOpacity style={styles.editItemsButton} onPress={() => {
                onEdit(item)
                setTimeout(() => {
                    swipeableRef.current.close();
                }, 500);

            }}>
                <Text style={styles.deleteButtonText}>Edit</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.deleteButton} onPress={() => onDelete(item.id)}>
                <Text style={styles.deleteButtonText}>Delete</Text>
            </TouchableOpacity>
        </View>
    );

    return (
        <Swipeable ref={swipeableRef} renderRightActions={renderRightActions}>
            <View style={styles.container}>

                <Image style={{ width : 20, height: 20, marginRight: 10,
                    backgroundColor: item.isDone ? 'green' : 'red' }}/>

                <TouchableOpacity delayLongPress={333} onLongPress={onLongPress} onPress={()=>{swipeableRef.current.openRight();}} style={styles.container}>

                    <Text style={styles.text}>{item.title}</Text>
                </TouchableOpacity>

            </View>
        </Swipeable>

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
        deleteButton: {
            backgroundColor: 'red',
            justifyContent: 'center',
            alignItems: 'center',
            width: 80,
        },
        editItemsButton: {
            backgroundColor: 'blue',
            justifyContent: 'center',
            alignItems: 'center',
            width: 80,
        },
        deleteButtonText: {
            color: 'white',
            fontWeight: 'bold',
            fontSize: 16,
        },
        editButtonText: {
            color: 'white',
            fontWeight: 'bold',
            fontSize: 16,
        },
    }
);
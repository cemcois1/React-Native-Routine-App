//içerisinde checkbox olan verisine göre  görünür olup olmadığını kontrol eden bir component;
import React, { useRef } from 'react';
import { View, Text,StyleSheet,Image,TouchableOpacity } from 'react-native';
import {Swipeable} from 'react-native-gesture-handler';
import BouncyCheckbox from "react-native-bouncy-checkbox";
import { LightHaptic, ResetHaptic } from '../CodeBase/Haptic/HapticHelper';
import { GlobalStyles } from '../CodeBase/Fonts/FontStyles';
export default function ToDoItem({item, onDelete,onEdit,onLongPress,ChangeCheckBox}) {

    //swipeable Referance
    const swipeableRef = useRef(null);


    // Silme butonu görünümü
    const renderRightActions = () => (
        <View style={{flexDirection:'row',padding:2}} >
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
                <BouncyCheckbox
                    style={{ width: 25, height: 25 ,marginRight:10}}
                    size={35}
                    fillColor="green"
                    unfillColor="#FFFFFF"
                    text={item.title}
                    iconStyle={{ borderColor: "green" }}
                    isChecked={item.isDone}
                    onPress={(checked) => {
                        ChangeCheckBox(item.id);
                    }}
                />


                <TouchableOpacity delayLongPress={200} onPressIn={()=>{
                    ResetHaptic();

                }} onLongPress={onLongPress} onPress={()=>{
                    swipeableRef.current.openRight();
                    }} style={styles.container}>

                    <Text style={[styles.text,item.isDone?{textDecorationLine: 'line-through',color:'gray'}:{
                        textDecorationLine: 'none',
                        color: 'black',
                    }]}>{item.title}</Text>
                </TouchableOpacity>

            </View>
        </Swipeable>

    );
}

const styles = StyleSheet.create(
    {
        container: {
            flex: 1,
            height: 75,
            margin: 2,
            padding: 10,
            width: '100%',
            borderBottomWidth: 1,
            borderBottomColor: '#eee',
            backgroundColor: '#f9f9f9',
            alignItems: 'center',

            flexDirection: 'row',},
        text: {
            ...GlobalStyles.headerText,
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
            ...GlobalStyles.primaryBoldText,
            color: 'white',
            fontWeight: 'bold',
            fontSize: 16,
        },
        editButtonText: {
            ...GlobalStyles.primaryBoldText,

            color: 'white',
            fontWeight: 'bold',
            fontSize: 16,
        },
    }
);
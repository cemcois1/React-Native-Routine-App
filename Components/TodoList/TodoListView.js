//todo item komponentlerini tutan liste
import React, { useCallback, useRef } from 'react';
import { View, FlatList,StyleSheet,Text ,LayoutAnimation} from 'react-native';
import ToDoItem from './ToDoItem';
import  { useTodoList } from './TodoListData';
import { useNavigation } from '@react-navigation/native';
import DraggableFlatList from 'react-native-draggable-flatlist'
export default function TodoListView() {

    const {todoList,setTodoList} = useTodoList();
    const navigation = useNavigation();

    const DragableFlatListRef = useRef(null);

    const HandleDelete = useCallback((id) => {
        setTodoList(prevTodoList => prevTodoList.filter(item => item.id !== id)); // Güncel listeye göre silme işlemi
    }, [setTodoList]);

    const HandleEdit = (item) => {
        navigation.navigate('Create New Item', { item }); // item verisini sayfaya gönder
    };

    const ChangeCheckBox = useCallback((id) => {
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut); // Animasyonlu geçiş
        setTodoList((prevTodoList) => {
            const updatedList = prevTodoList.map((item) =>
                item.id === id ? { ...item, isDone: !item.isDone } : item
            );
            // `isDone` durumuna göre listeyi yeniden sıralar
            return updatedList.sort((a, b) => a.isDone - b.isDone);
        });
    }, [setTodoList]);


    //todolistin bütün idlerini yazdırır
    //console.log(todoList.map((item) => item.id));
    return (
        <View style={styles.viewStyle}>

            {todoList.length > 0 ? (
                <DraggableFlatList
                    ref={DragableFlatListRef}
                    data={todoList}
                    renderItem={({item,drag}) => <ToDoItem item={item} ChangeCheckBox={ChangeCheckBox} onDelete={HandleDelete} onEdit={HandleEdit} onLongPress={!item.isDone?drag:drag} 
                    />}
                    keyExtractor={item => item.id.toString()}
                    onDragEnd={({ data }) => {setTodoList(data);

                        
                    }}
                />

            ) : (
                <Text style={styles.contentText}>Henüz Yapılacaklar yok bir tane girin 1</Text>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    contentText: {
        marginTop: 25,
        fontSize: 18,
        color: '#000',
        alignContent: 'center',
        textAlign: 'center',
    },
    viewStyle: {
        backgroundColor: '#ffff',
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'stretch',

    },
});
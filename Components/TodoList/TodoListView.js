//todo item komponentlerini tutan liste
import React, { useCallback, useEffect, useRef } from 'react';
import { View, FlatList,StyleSheet,Text ,LayoutAnimation, ActivityIndicator} from 'react-native';
import ToDoItem from './ToDoItem';
import  { useTodoList } from './TodoListData';

import { useNavigation } from '@react-navigation/native';
import DraggableFlatList from 'react-native-draggable-flatlist'
export default function TodoListView() {

    const {todoList,setTodoList,loadList,saveList} = useTodoList();
    const navigation = useNavigation();
    const [isLoaded, setIsLoaded] = React.useState(false);
    const DragableFlatListRef = useRef(null);

    const HandleDelete = useCallback((id) => {
        setTodoList((prevTodoList) => {
            const updatedList = prevTodoList.filter(item => item.id !== id);
            saveList(updatedList); // Güncellenmiş listeyi kaydetme
            console.log("Silme işlemi gerçekleşti ", updatedList);
            return updatedList;
        });
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
            
            saveList(updatedList); // Güncellenmiş listeyi kaydetme
            console.log("Check işlemi gerçekleşti ", updatedList);
            // `isDone` durumuna göre listeyi yeniden sıralar
            return updatedList.sort((a, b) => a.isDone - b.isDone);
        });
    }, [setTodoList]);

    useEffect(() => {

        loadList().then(
            ()=>{
                console.log("Liste yüklendi")
                setIsLoaded(true);
                }
            ).catch((e)=>{
                console.error('Liste yükleme hatası:', e);
            });
        
    },[]);

    //todolistin bütün idlerini yazdırır
    //console.log(todoList.map((item) => item.id));
    return (
        !isLoaded ? <View style={styles.LoadingViewStyle}>
            <ActivityIndicator size="large" color="#0000ff" />
        </View>
        :
        <View style={styles.viewStyle}>
            
            {todoList.length > 0 ? (
                <DraggableFlatList
                    ref={DragableFlatListRef}
                    data={todoList}
                    renderItem={({item,drag}) => <ToDoItem item={item} ChangeCheckBox={ChangeCheckBox} onDelete={HandleDelete} onEdit={HandleEdit} onLongPress={!item.isDone?drag:null} 
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
    LoadingViewStyle: {
        flex: 1,
        //itemlerin arasında boşluk olacak şekilde düzenle
        //yatayda sırala
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        textsise: 45,
    },
    loadingText: {
        fontSize: 20,
        color: '#000',
    },
});
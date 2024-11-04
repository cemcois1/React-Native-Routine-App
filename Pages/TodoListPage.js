//todo item komponentlerini tutan liste
import React, { useCallback, useEffect, useRef } from 'react';
import { View, FlatList,StyleSheet,Text ,LayoutAnimation, ActivityIndicator} from 'react-native';
import ToDoItem from '../Components/TodoList/ToDoItem';
import  { useTodoList } from '../Components/TodoList/TodoListData';
import {LightHaptic,SuccessHaptic,WarningHaptic} from '../Components/CodeBase/Haptic/HapticHelper';
import { useNavigation, useRoute } from '@react-navigation/native';
import DraggableFlatList,{ScaleDecorator} from 'react-native-draggable-flatlist'
import { GlobalStyles } from '../Components/CodeBase/Fonts/FontStyles';
import AddItemButton from '../Components/TodoList/AddItemButton';
export default function TodoListPage() {
    const route  = useRoute();
    const {openListKeyPrefix}= route.params||{};
    const {todoList,setTodoList,loadList,saveList} = useTodoList();
    const navigation = useNavigation();
    const [isLoaded, setIsLoaded] = React.useState(false);
    const DragableFlatListRef = useRef(null);


    useEffect(() => {
        // headerRight'ı her sayfa yüklendiğinde yeniden tanımlayın
        navigation.setOptions({
            headerRight: () => (
                <AddItemButton onPressed={() => navigation.navigate('Create New Item', { openListKeyPrefix })} />
            ),
        });
    }, [navigation, openListKeyPrefix]);

    const HandleDelete = useCallback((id) => {
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut); // Animasyonlu geçiş
        setTodoList((prevTodoList) => {
            const updatedList = prevTodoList.filter(item => item.id !== id);
            saveList(updatedList,openListKeyPrefix); // Güncellenmiş listeyi kaydetme
            return updatedList;
        });
        LightHaptic();
    }, [setTodoList]);

    const HandleEdit = (item) => {
        navigation.navigate('Create New Item', { item,openListKeyPrefix }); // item verisini sayfaya gönder
        LightHaptic();
    };

    const ChangeCheckBox = useCallback((id) => {
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut); // Animasyonlu geçiş
        setTodoList((prevTodoList) => {
            const updatedList = prevTodoList.map((item) =>
                item.id === id ? { ...item, isDone: !item.isDone } : item
            );

            saveList(updatedList,openListKeyPrefix); // Güncellenmiş listeyi kaydetme
            updatedList.filter((item) => item.id === id)[0].isDone ? SuccessHaptic() : LightHaptic();
            // `isDone` durumuna göre listeyi yeniden sıralar
            return updatedList;
        });
    }, [setTodoList]);

    useEffect(() => {

        loadList(openListKeyPrefix).then(
            ()=>{
                console.log("Liste yüklendi")
                setIsLoaded(true);
                }
            ).catch((e)=>{
                console.error('Liste yükleme hatası:', e);
            });
        
    },[]);

    useEffect(() => {
        //openListKeyPrefix varsa başlığı güncelle
        if(openListKeyPrefix){
            navigation.setOptions({
                title: openListKeyPrefix+" Todos",
            });
        }
    }, [openListKeyPrefix]);

    
    return (
        !isLoaded ? <View style={styles.LoadingViewStyle}>
            <ActivityIndicator size="large" color="#0000ff" />
        </View>
        :
        <View style={styles.viewStyle}>
            
            {todoList.length > 0 ? (
                <DraggableFlatList
                style={{width:'100%',height:'100%'}}
                    ref={DragableFlatListRef}
                    data={todoList}
                    renderItem={({item,drag}) => <ScaleDecorator  activeScale={1.1}><ToDoItem item={item} ChangeCheckBox={ChangeCheckBox} onDelete={HandleDelete} onEdit={HandleEdit} 
                    onLongPress={()=>{
                       if(!item.isDone){
                        drag();
                        LightHaptic();
                        }
                        else{
                            WarningHaptic();
                        }
                        }}
                        />
                    
                    
                    </ScaleDecorator>}
                    keyExtractor={item => item.id.toString()}
                    onDragEnd={({ data }) => {
                        setTodoList(data);
                    }}
                />

            ) : (
                <View style={styles.noTaskContainer}>
                    <Text style={styles.noTaskText}>Hey! You don't have any tasks yet. Add your first one!</Text>
                </View>
            )}
        </View>
        
        
    );
}

const styles = StyleSheet.create({
    contentText: {
        ...GlobalStyles.primaryText,
        fontSize: 18,
        color: '#000',
        alignContent: 'center',
        textAlign: 'center',
    },
    noTaskContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    noTaskText: {
        ...GlobalStyles.primaryText,
        fontSize: 22,
        padding: 45,
        color: '#000',
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
        ...GlobalStyles.primaryText,
        fontSize: 20,
        color: '#000',
    },
});
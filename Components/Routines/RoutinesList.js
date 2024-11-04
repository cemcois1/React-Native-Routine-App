import React, { useEffect, useState } from 'react';
import RoutineItem from './RoutineItem'; // Kendi RoutineItem bileşeninizin yolunu kontrol edin
import { Text, View } from 'react-native';
import { GlobalStyles } from '../CodeBase/Fonts/FontStyles';
import FlatGrid from 'react-native-super-grid';
import { useTodoList } from '../TodoList/TodoListData';
import { useFocusEffect, useNavigation } from '@react-navigation/native';

export default function RoutinesList() {
    const { loadList, saveList } = useTodoList();
    const [percentages, setPercentages] = useState({});
    const navigation = useNavigation();
    const layout = [
        { Name: 'Daily', progressbarColor: '#00e676', }, // Vibrant yeşil
        { Name: 'Weekly', progressbarColor: '#42a5f5' }, // Soft mavi
        { Name: 'Monthly', progressbarColor: '#fdd835' }, // Güneş sarısı
        { Name: 'Special', progressbarColor: '#d32f2f' }, // Şarap kırmızısı
    ];

    useFocusEffect(
        React.useCallback(() => {

            const fetchData = async () => {
                const newPercentages = {};
                for (const item of layout) {
                    const data = await loadList(item.Name);
                    console.log('Data for', item.Name, ':', data.length > 0 ? "Datas Loaded" : 'No data');
                    if (data && data.length > 0) {
                        const completedItems = data.filter((todoItem) => todoItem.isDone).length;
                        newPercentages[item.Name] = (completedItems / data.length) * 100;
                    } else {
                        newPercentages[item.Name] = -1; // No data or empty list, set percentage to 0
                    }
                }
                setPercentages(newPercentages);
            };
            console.log('Fetching data for routines...');
            fetchData();
            // Cleanup için return edilebilir fonksiyon
            return () => {
                console.log('Screen is unfocused');
            };
        }, [navigation])
    );


    return (
        <View style={{ flex: 1 }}>
            <Text style={{ ...GlobalStyles.headerText, fontSize: 34, fontWeight: 'bold', marginTop: 20, textAlign: 'center' }}>Routines</Text>

            <FlatGrid
                itemDimension={130}
                data={layout}
                spacing={10}
                renderItem={({ item }) => {
                    const  percentage = percentages[item.Name] !== undefined ? percentages[item.Name] : -1;
                    return (
                        <RoutineItem
                            Header={item.Name}
                            Rate={percentage}
                            progressbarColor={item.progressbarColor}
                            openListKeyPrefix={item.Name}
                        />
                    );
                }}
            />
        </View>
    );
}

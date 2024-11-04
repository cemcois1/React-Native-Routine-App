import React from 'react';
import RoutineItem from './RoutineItem'; // Kendi RoutineItem bileşeninizin yolunu kontrol edin
import { Text, View } from 'react-native';
import { GlobalStyles } from '../CodeBase/Fonts/FontStyles';
import FlatGrid from 'react-native-super-grid';

export default function RoutinesList() {
    // Rutin bileşenleri için layout tanımlayın
    const layout = [
        { Name: 'Daily', progressbarColor: '#00e676', size: 1, Rate: 47 }, // Vibrant yeşil
        { Name: 'Weekly', progressbarColor: '#42a5f5', size: 1, Rate: 15 }, // Soft mavi
        { Name: 'Monthly', progressbarColor: '#fdd835', size: 1, Rate: 35 }, // Güneş sarısı
        { Name: 'Custom', progressbarColor: '#d32f2f', size: 1, Rate: 25 }, // Şarap kırmızısı
    ];

    return (
        <View style={{ flex: 1 }}>
            <Text style={{ ...GlobalStyles.headerText, fontSize: 24, fontWeight: 'bold', margin: 20 }}>Routines</Text>

            <FlatGrid

                itemDimension={130}
                data={layout}
                spacing={10}
                renderItem={({ item }) => (
                    <RoutineItem Header={item.Name} Rate={item.Rate} openListKeyPrefix={item.Name} progressbarColor={item.progressbarColor} />)}
            />
        </View>
    );
}

import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Animated, TouchableOpacity } from "react-native";
import { GlobalStyles } from '../CodeBase/Fonts/FontStyles';
import { useFocusEffect, useNavigation } from "@react-navigation/native";

export default function RoutineItem({ Header, Rate, progressbarColor, openListKeyPrefix }) {
    const [progress] = useState(new Animated.Value(0));
    const navigation = useNavigation(); // Hook'u burada kullanın

    useFocusEffect(
        React.useCallback(
            () => {
                console.log('RoutineItem Rate :', Rate);

                if (Rate !== -1) {
                    Animated.timing(progress, {
                        toValue: Rate,
                        duration: 1000, // 1 saniyelik animasyon
                        useNativeDriver: false, // Yatay animasyon için `false` olmalı
                    }).start();
                }
            }, [Rate,navigation])
    );

    const progressWidth = progress.interpolate({
        inputRange: [0, 100],
        outputRange: ['0%', '100%'],
    });

    return (
        <TouchableOpacity onPress={() => navigation.navigate('Todos', { openListKeyPrefix })}>
            <View style={styles.container}>
                <Text style={GlobalStyles.headerText}>{Header}</Text>
                {Rate === -1 ? (
                    <Text style={styles.noProgressText}>Create New one!</Text>
                ) : (
                    <View style={styles.progressContainer}>
                        <View style={styles.progressBar}>
                            <Animated.View style={[styles.progressFill, { width: progressWidth, backgroundColor: progressbarColor }]} />
                        </View>
                        <Text style={styles.progressText}>{Math.round(Rate)}%</Text>
                    </View>
                )}
            </View>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    container: {
        paddingVertical: 20,
        paddingHorizontal: 15,
        marginVertical: 15,
        backgroundColor: '#ffffff',
        borderRadius: 15,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 5 },
        shadowOpacity: 0.1,
        shadowRadius: 10,
        elevation: 4,
        height: 150,
        alignItems: 'stretch',
        justifyContent: 'space-evenly',
    },
    headerText: {
        ...GlobalStyles.headerText,
        marginTop: 5, // Başlığı biraz yukarı taşımak için
    },
    progressContainer: {
        position: 'relative',
        marginTop: 15,
    },
    progressBar: {
        height: 15,
        width: '100%',
        backgroundColor: '#dcdcdc',
        borderRadius: 15,
        overflow: 'hidden',
    },
    progressFill: {
        height: '100%',
        backgroundColor: '#76c7c0', // Daha yumuşak ve modern bir renk
        borderRadius: 15,
    },
    progressText: {
        position: 'absolute',
        right: 10,
        top: -20,
        ...GlobalStyles.primaryBoldText,
        color: '#333',
    },
    noProgressText: {
        ...GlobalStyles.secondaryBoldText,
        fontSize: 16,
        color: '#555',
        textAlign: 'center',
        marginTop: 25,
    },
});

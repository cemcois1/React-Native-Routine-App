import React from 'react';
import { View, Button } from 'react-native';
import { triggerErrorHaptic, triggerHeavyHaptic, triggerLightHaptic, triggerMediumHaptic, triggerSuccessHaptic, triggerWarningHaptic } from './HapticHelper';

export default function HapticTest() {
    return (
        <View>
            <Button 
                title="Light Haptic Feedback"
                onPress={() => triggerLightHaptic()} // Hafif titreşim
            />
            <Button 
                title="Medium Haptic Feedback"
                onPress={() => triggerMediumHaptic()} // Orta titreşim
            />
            <Button 
                title="Heavy Haptic Feedback"
                onPress={() => triggerHeavyHaptic()} // Güçlü titreşim
            />
            <Button 
                title="Success Haptic Feedback"
                onPress={() => triggerSuccessHaptic()} // Başarı bildirimi

            />
            <Button
                title="Warning Haptic Feedback"
                onPress={() => triggerWarningHaptic()} // Uyarı bildirimi
            />
            <Button
                title="Error Haptic Feedback"
                onPress={() => triggerErrorHaptic} // Hata bildirimi
            />
                </View>
    );
}

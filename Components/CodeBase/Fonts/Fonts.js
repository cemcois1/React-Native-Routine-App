import * as Font from 'expo-font';

export const loadFonts = async () => {
    await Font.loadAsync({
        'header': require('../Fonts/FontAssets/Lora-Regular.ttf'), // Header font
        'primary': require('../Fonts/FontAssets/Roboto-Regular.ttf') , // Primary font
        'primary-bold': require('../Fonts/FontAssets/Roboto-Bold.ttf'), // Primary bold font
        'secondary': require('../Fonts/FontAssets/OpenSans-Regular.ttf'), // Secondary font
        'secondary-bold': require('../Fonts/FontAssets/OpenSans-Bold.ttf'), // Secondary bold font
    });
};

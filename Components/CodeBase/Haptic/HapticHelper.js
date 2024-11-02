import * as Haptics from 'expo-haptics';

export const triggerLightHaptic = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
};

export const triggerMediumHaptic = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
};

export const triggerHeavyHaptic = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
};

export const triggerSuccessHaptic = () => {
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
};

export const triggerWarningHaptic = () => {
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Warning);
};

export const triggerErrorHaptic = () => {
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
};

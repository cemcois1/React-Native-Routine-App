import * as Haptics from 'expo-haptics';

export const LightHaptic = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
};

export const MediumHaptic = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
};

export const HeavyHaptic = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
};

export const SuccessHaptic = () => {
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
};

export const WarningHaptic = () => {
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Warning);
};

export const ErrorHaptic = () => {
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
};
export const ResetHaptic = () => {
    Haptics.selectionAsync();
}

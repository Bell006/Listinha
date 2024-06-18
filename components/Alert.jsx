import { Alert } from 'react-native';

export const ShowAlert = (title, message, buttons = [{ text: 'Ok' }]) => {
    Alert.alert(
        title,
        message,
        buttons,
        { cancelable: false }
    );
};
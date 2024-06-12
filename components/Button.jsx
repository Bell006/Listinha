import {React} from "react";
import { SafeAreaView, StyleSheet, Pressable, Text} from "react-native";
import Icon from 'react-native-vector-icons/MaterialIcons';

export function MainButton({title, ...rest}) {

    return(
        <SafeAreaView style={styles.container}>
            <Pressable 
                style={styles.button}
                {...rest} 
            >
    
                <Text style={styles.text}>{title}</Text>
            </Pressable>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        width: '80%'
    },

    button: {
        flexDirection: 'row',
        gap: 5,
        alignItems: 'center',
        justifyContent: 'center',
        height: 48,
        paddingVertical: 12,
        paddingHorizontal: 34,
        borderRadius: 8,
        elevation: 3,
        backgroundColor: '#EE6B4D',
    },

    text: {
        color: 'white',
        fontWeight: "bold"
    },

    addedText: {
        fontSize: 20,
        color: '#DFFBFC'
    }
})
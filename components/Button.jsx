import {React} from "react";
import { SafeAreaView, StyleSheet, Pressable, Text} from "react-native";

export function MainButton({title, add, ...rest}) {

    return(
        <SafeAreaView style={[add ? styles.add : styles.container]}>
            <Pressable 
                style={[styles.button, add && styles.addButton]}
                {...rest} 
            >
                <Text style={[styles.text, add && styles.addText]}>{title}</Text>
            </Pressable>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        width: '100%'
    },

    add: {
        alignItems: 'center',
    },

    addButton: {
        backgroundColor: '#FFFDEA',
        marginBottom: 16
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
        marginVertical: 20,
    },

    text: {
        color: 'white',
        fontWeight: "bold"
    },

    addText: {
        color: '#293241',
    },

    addedText: {
        fontSize: 20,
        color: '#DFFBFC'
    },


})
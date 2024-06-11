import {React} from "react";
import { SafeAreaView, StyleSheet, Pressable, Text} from "react-native";
import Icon from 'react-native-vector-icons/MaterialIcons';

export function MainButton({title, add, ...rest}) {

    return(
        <SafeAreaView style={styles.container}>
            <Pressable 
                style={[
                    styles.button,
                    add ? styles.adDbutton : styles.secondaryButton
                ]}
                add={add}
                {...rest} 
            >
                {add && <Icon name="control-point" size={30} color="#DFFBFC" style={styles.icon} />}
                <Text style={[styles.text, add && styles.addedText]}>{title}</Text>
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
        paddingHorizontal: 32,
        borderRadius: 8,
        elevation: 3,
    },

    adDbutton: {
        height: 70,
        width: '65%',
        alignItems: 'center',
        paddingHorizontal: 16,
        justifyContent: 'flex-start',
        background: 'none',
        borderWidth: 2,
        borderColor: '#DFFBFC',
        shadowColor: 'transparent'
    },

    secondaryButton: {
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
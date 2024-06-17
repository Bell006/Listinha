import {React} from "react";
import { SafeAreaView, StyleSheet, Pressable, Text, View} from "react-native";
import Icon from 'react-native-vector-icons/MaterialIcons';

export function MainButton({title, add, color, icon, ...rest}) {

    return(
        <SafeAreaView style={[add ? styles.add : styles.container]}>
            <Pressable 
                style={[
                    styles.button,
                    add && styles.addButton,
                    { backgroundColor: color }
                ]}
                {...rest}
            >
                {icon && (
                    <View style={styles.iconWrapper}>
                        <Icon name={icon} size={20} color="#293241" />
                    </View>
                )}
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
        marginBottom: 16
    },

    button: {
        flexDirection: 'row',
        gap: 5,
        alignItems: 'center',
        justifyContent: 'center',
        alignContent: 'center',
        height: 48,
        paddingVertical: 12,
        paddingHorizontal: 20,
        borderRadius: 8,
        elevation: 3,
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
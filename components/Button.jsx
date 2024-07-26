import { React } from "react";
import { SafeAreaView, StyleSheet, Pressable, Text, View } from "react-native";
import Icon from 'react-native-vector-icons/MaterialIcons';

export function MainButton({ title, add, color, icon, ...rest }) {

    return (
        <SafeAreaView style={styles.container}>
            <Pressable
                style={styles.button}
                {...rest}
            >
                {icon && (
                    <View style={styles.iconWrapper}>
                        <Icon name={icon} size={20} color="#293241" />
                    </View>
                )}
                <Text style={styles.text}>{title}</Text>
            </Pressable>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        width: '10%'
    },

    button: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        alignContent: 'center',
        height: 48,
        paddingVertical: 12,
        maxWidth: 70,
        borderRadius: 8,
        backgroundColor: 'red',
        flexWrap: 'wrap',
    },

    text: {
        color: 'white',
        fontWeight: "bold"
    }
})
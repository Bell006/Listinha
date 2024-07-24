import { React } from "react";
import { StyleSheet, Text, View, Pressable } from "react-native";
import IconTrash from 'react-native-vector-icons/MaterialCommunityIcons';

export function Category({ title, icon, onPress, onDelete, ...rest }) {

    return (
        <View style={styles.container}>
            <Text style={styles.text} {...rest}>
                {title}
            </Text>
            {icon && (
                <Pressable onPress={onDelete}>
                    <IconTrash name="trash-can-outline" size={15} color="#EE6B4D" />
                </Pressable>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        borderBottomWidth: 2,
        borderBottomColor: '#DFFBFC',
        flexDirection: 'row',
        padding: 4,
        marginBottom: 4,
        marginTop: 16,
        justifyContent: 'space-between',
        width: '100%'
    },

    text: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#DFFBFC',
    },
})
import {React} from "react";
import { StyleSheet, Text, View, Pressable} from "react-native";
import IconTrash from 'react-native-vector-icons/MaterialCommunityIcons';

export function Category({title, icon, ...rest}) {

    return(
        <View style={styles.container}>
            <Text style={styles.text} {...rest}>
                {title}
            </Text>
            {icon && (
                <Pressable>
                    <IconTrash name="trash-can-outline" size={28} color="#EE6B4D" />
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
        marginVertical: 4,
        justifyContent: 'space-between',
    },

    text: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#DFFBFC',
    },
})
import {React} from "react";
import { StyleSheet, Text, View, Pressable} from "react-native";
import IconTrash from 'react-native-vector-icons/MaterialCommunityIcons';

export function ListItem({title, checkBox, icon, index, ...rest}) {

    return(
        <View style={[styles.container, index % 2 === 0 ? styles.even : styles.odd]}>
            <Text style={styles.text} {...rest}>
                {title}
            </Text>
            {icon && (
                <Pressable>
                    <IconTrash name="trash-can-outline" size={20} color="#EE6B4D" />
                </Pressable>
            )}
        </View>  
    );
};

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 6,
        marginVertical: 4,
    },

    text: {
        fontSize: 20,
        color: '#DFFBFC',
    },

    even: {
        background: 'none',
    },

    odd: {
        backgroundColor: '#1A2537',
    },
})
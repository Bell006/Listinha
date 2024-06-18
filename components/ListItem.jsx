import { React, useState } from "react";
import BouncyCheckbox from "react-native-bouncy-checkbox";
import { StyleSheet, Text, View, Pressable } from "react-native";
import IconTrash from 'react-native-vector-icons/MaterialCommunityIcons';

export function ListItem({ title, checkBox, icon, index, onPress, ...rest }) {
    const [isChecked, setIsChecked] = useState(false);

    return (
        <View style={[styles.container, index % 2 === 0 ? styles.even : styles.odd]}>
            {checkBox && (
                <BouncyCheckbox
                    isChecked={isChecked}
                    onPress={(checked) => setIsChecked(checked)}
                    text={title}
                    fillColor="#EE6B4D"
                    textStyle={{
                        fontSize: 20,
                        color: '#FFFDEA'
                    }}
                />
            )}
            {icon && (
                <View style={styles.container}>
                    <Text style={styles.text} {...rest}>
                        {title}
                    </Text>
                    <Pressable onPress={onPress}>
                        <IconTrash name="trash-can-outline" size={20} color="#EE6B4D" />
                    </Pressable>
                </View>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        width: '100%',
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

    strikeThrough: {
        textDecorationLine: 'line-through',
        textDecorationStyle: 'solid',
    },
})
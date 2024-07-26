import { React, useState } from "react";
import BouncyCheckbox from "react-native-bouncy-checkbox";
import { TextInput, StyleSheet, View, Pressable } from "react-native";
import IconTrash from 'react-native-vector-icons/MaterialCommunityIcons';

export function ListItem({ title, isEditable, onEndEditing, checkBox, icon, index, onPress, onDelete}) {
    const [isChecked, setIsChecked] = useState(false);
    const [currentTitle, setCurrentTitle] = useState(title);
    const [isEditing, setIsEditing] = useState(isEditable);

    const handleEndEditing = () => {
        if (currentTitle.trim() !== '') {
            setIsEditing(false);
            onEndEditing(currentTitle);
        } else {
            onEndEditing(null);
        }
    };

    return (
        <View style={[styles.container, index % 2 === 0 ? styles.even : styles.odd]}>
            {isEditing ? (
                <TextInput
                    style={styles.input}
                    value={currentTitle}
                    onChangeText={setCurrentTitle}
                    onEndEditing={handleEndEditing}
                    autoFocus
                />
            ) : (
                <>
                    {checkBox && (
                        <BouncyCheckbox
                            isChecked={isChecked}
                            onPress={(checked) => setIsChecked(checked)}
                            text={currentTitle}
                            fillColor="#EE6B4D"
                            width='90%'
                            textStyle={{
                                fontSize: 20,
                                color: '#FFFDEA',
                            }}
                        />
                    )}
                    {icon && (
                        <Pressable onPress={onDelete}>
                            <IconTrash name="trash-can-outline" size={15} color="#EE6B4D" />
                        </Pressable>
                    )}
                </>
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

    input: {
        fontSize: 20,
        color: '#FFFDEA',
        padding: 8
    },

    even: {
        backgroundColor: 'none',
    },

    odd: {
        backgroundColor: '#1A2537',
    },
})
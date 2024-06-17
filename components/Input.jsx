import {React, useState} from "react";
import { Pressable, SafeAreaView, StyleSheet, TextInput } from "react-native";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

export function Input({placeholder, type, icon, ...rest}) {

    const [isFocused, setIsFocused] = useState(false); 
  
    const handleOnFocus = () => { 
        setIsFocused(true); 
    }; 
  
    const handleBlur = () => { 
        setIsFocused(false); 
    }; 
      
    return(
        <SafeAreaView style={styles.container}>
            <TextInput
                style={[
                styles.input,
                isFocused && styles.inputFocused
                ]}
                placeholder={placeholder}
                placeholderTextColor="#B9B9B9"
                onFocus={handleOnFocus}
                onBlur={handleBlur}
                {...rest}
            />
            {icon && (
                <Pressable>
                    <Icon name="check-bold" size={28} color="#4BEB5B" />
                </Pressable>
            )}
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8
    },

    input: {
      height: 48,
      width: '90%',

      borderRadius: 8,

      marginVertical: 12,
      paddingHorizontal: 20,

      backgroundColor: '#0B1321',
      color: "#ffffff"
    },

    inputFocused: {
        borderWidth: 2,
        borderColor: '#DFFBFC',
    }
})
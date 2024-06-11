import {React, useState} from "react";
import { SafeAreaView, StyleSheet, TextInput } from "react-native";

export function Input({placeholder, type, ...rest}) {

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
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        width: '80%'
    },

    input: {
      height: 48,

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
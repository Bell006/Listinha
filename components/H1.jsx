import {React} from "react";
import { StyleSheet, Text} from "react-native";

export function H1({title, ...rest}) {

    return(
        <Text style={styles.text} {...rest}>
            {title}
        </Text>
    );
};

const styles = StyleSheet.create({
    text: {
        width: '100%',
        fontSize: 45,
        fontWeight: 'bold',
        color: '#FFFDEA',
        marginBottom: 20
    },
})
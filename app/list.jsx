import { Text, View, StyleSheet, ScrollView, Pressable, Modal } from "react-native";
import { Link } from "expo-router";
import { Category } from "../components/Category";
import { ListItem } from "../components/ListItem";
import { MainButton } from "../components/Button";
import Icon from 'react-native-vector-icons/MaterialIcons';

export default function list() {
    const items = ['Batata', 'Cenoura', 'Tomate', 'Alface', 'Pepino'];

    return (
        <View
        style={{
            flex: 1,

            backgroundColor: "#293241",
            alignContent: 'center',
            justifyContent: 'center',
            paddingVertical: 40,
            paddingHorizontal: 20
        }}
        >
            <Link href='/' asChild>
                <Pressable>
                <Icon name="arrow-back" size={30} color="#EE6B4D" style={styles.icon}/>
                </Pressable>
            </Link>

            <View style={styles.header}>
                <Text style={styles.textSub}>Listinha</Text>
                <Text style={styles.title}>Mercado Vovô</Text>
                <Text style={styles.textDate}>19/02/24</Text>
            </View>

            <View style={styles.buttons}>
                <MainButton title="Excluir" add color='#EB4B4B' icon="delete"/>
                <MainButton title="Editar" add color='#FFFDEA' icon="edit"/>
            </View>

            <ScrollView style={styles.scroll}>
            <Category title='Frutas e verduras'/>
                {items.map((item, index) => (
                    <ListItem key={index} title={item} index={index} checkBox/>
                ))}
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    header: {
        marginTop: 36,
        marginBottom: 10,
    },

    buttons: {
        flexDirection: 'row',
        gap: 16,
    },

    scroll: {
        marginVertical: 10,
    },

    title: {
        width: '100%',
        fontSize: 45,
        fontWeight: 'bold',
        color: '#FFFDEA',
    },

    textSub: {
        fontSize: 16,
        color: '#DFFBFC',
        fontWeight: '600',
    },

    textDate: {
        width: '100%',
        fontSize: 16,
        color: '#EE6B4D',
        marginBottom: 1,
    },

    textItem: {
        color: '#FFFDEA',
        fontSize: 25,
        fontWeight: 'bold',
    },

});

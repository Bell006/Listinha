import { Text, View, StyleSheet, ScrollView, Pressable } from "react-native";
import { Link, useLocalSearchParams, router, useNavigation } from "expo-router";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useState, useEffect } from "react";
import { ShowAlert } from "../components/Alert";
import { Category } from "../components/Category";
import { ListItem } from "../components/ListItem";
import { MainButton } from "../components/Button";
import Icon from 'react-native-vector-icons/MaterialIcons';

export default function list() {
    const navigation = useNavigation();
    const params = useLocalSearchParams();
    const { listTitle } = params;

    const [listItems, setListItems] = useState([]);

    const handleDelete = () => {
        ShowAlert(
            'Deseja deletar sua lista?',
            '',
            [
                {
                    text: 'Não',
                    onPress: () => {
                        console.log('Cancelado');
                    },
                    style: 'cancel'
                },
                {
                    text: 'Sim',
                    onPress: async () => {
                        try {
                            await AsyncStorage.removeItem(listTitle);
                            navigation.navigate('index');
                            console.log('Lista deletada');
                        } catch (e) {
                            console.error('Falha ao deletar a lista.', e);
                            ShowAlert('Erro', 'Falha ao deletar a lista.');
                        }
                    }
                }
            ]
        );
    };

    const handleEdit = () => {
        navigation.navigate('newList', { listTitle });
    };

    useEffect(() => {
        const fetchListItems = async () => {
            try {
                if (listTitle) {
                    const savedItemsJson = await AsyncStorage.getItem(listTitle);
                    if (savedItemsJson !== null) {
                        setListItems(JSON.parse(savedItemsJson));
                    }
                }
            } catch (e) {
                console.error('Falha ao carregar listas.', e);
                ShowAlert('Erro', 'Falha ao carregar suas listas.');
            }
        };

        fetchListItems();
    }, [listTitle]);


    return (
        <View
            style={{
                flex: 1,

                backgroundColor: "#293241",
                alignContent: 'center',
                justifyContent: 'center',
                paddingTop: 100,
                paddingBottom: 20,
                paddingHorizontal: 20
            }}
        >
            <Link href='/' asChild>
                <Pressable>
                    <Icon name="arrow-back" size={30} color="#EE6B4D" style={styles.icon} />
                </Pressable>
            </Link>

            <View style={styles.header}>
                <Text style={styles.textSub}>Listinha</Text>
                <Text style={styles.title}>{listTitle}</Text>
            </View>

            <View style={styles.buttons}>
                <MainButton title="Excluir" add color='#EB4B4B' icon="delete" onPress={() => handleDelete(listTitle)} />
                <MainButton title="Editar" add color='#FFFDEA' icon="edit" onPress={() => handleEdit(listTitle)} />
            </View>

            <ScrollView style={styles.scroll}>
                {listItems.map((categoryItems, index) => (
                    <View key={index}>
                        <Category title={categoryItems[0]} />
                        {categoryItems.slice(1).map((item, idx) => (
                            <ListItem key={idx} title={item} index={idx} checkBox />
                        ))}
                    </View>
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

    textItem: {
        color: '#FFFDEA',
        fontSize: 25,
        fontWeight: 'bold',
    },

});

import { Text, View, StyleSheet, ScrollView, Pressable, TextInput } from "react-native";
import { Link, useLocalSearchParams, useNavigation } from "expo-router";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useState, useEffect } from "react";
import { ShowAlert } from "../components/Alert";
import { Category } from "../components/Category";
import { SelectInput } from "../components/SelectInput";
import { ListItem } from "../components/ListItem";
import { MainButton } from "../components/Button";
import Icon from 'react-native-vector-icons/MaterialIcons';

export default function list() {
    const navigation = useNavigation();
    const params = useLocalSearchParams();
    const { listTitle: initialListTitle } = params;

    const [listTitle, setListTitle] = useState(initialListTitle || '');
    const [listItems, setListItems] = useState([]);
    const [creationDate, setCreationDate] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('');

    const handleCategoryChange = async (category) => {
        if (listItems.some(item => item[0] === category)) {
            setSelectedCategory('');
            return;
        }

        const newCategory = [category];
        const updatedListItems = [...listItems, newCategory];
        setListItems(updatedListItems);
        setSelectedCategory('');

        try {
            await AsyncStorage.setItem(listTitle, JSON.stringify(updatedListItems));
        } catch (e) {
            console.error('Falha ao salvar a lista.', e);
            ShowAlert('Erro', 'Falha ao salvar a lista.');
        }
    };

    const handleDeleteList = () => {
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

    const handleTitleChange = async (newTitle) => {
        try {
            if (initialListTitle && initialListTitle !== newTitle) {
                const savedItemsJson = await AsyncStorage.getItem(initialListTitle);
                await AsyncStorage.removeItem(initialListTitle);
                await AsyncStorage.setItem(newTitle, savedItemsJson);

            } else if (!initialListTitle) {
                if (newTitle == ''){
                    await AsyncStorage.setItem('Listinha', JSON.stringify(listItems));
                } else {
                    await AsyncStorage.setItem(newTitle, JSON.stringify(listItems));
                }
                await AsyncStorage.setItem(`${newTitle}_date`, new Date().toLocaleDateString());
            }
        } catch (e) {
            console.error('Falha ao atualizar o título da lista.', e);
            ShowAlert('Erro', 'Falha ao atualizar o título da lista.');
        }
    };

    const handleAddItem = (categoryIndex) => {
        const updatedListItems = [...listItems];
        updatedListItems[categoryIndex] = [...updatedListItems[categoryIndex], ''];
        setListItems(updatedListItems);
    };

    const handleItemChange = async (categoryIndex, itemIndex, newItem) => {
        const updatedListItems = [...listItems];
        const categoryItems = updatedListItems[categoryIndex];

        if (newItem === null || categoryItems.includes(newItem)) {
            categoryItems.splice(itemIndex, 1);
            setListItems(updatedListItems);

            try {
                await AsyncStorage.setItem(listTitle, JSON.stringify(updatedListItems));
            } catch (e) {
                console.error('Falha ao atualizar a lista.', e);
                ShowAlert('Erro', 'Falha ao atualizar a lista.');
            }
        } else {
            categoryItems[itemIndex] = newItem;
            setListItems(updatedListItems);

            try {
                await AsyncStorage.setItem(listTitle, JSON.stringify(updatedListItems));
            } catch (e) {
                console.error('Falha ao atualizar a lista.', e);
                ShowAlert('Erro', 'Falha ao atualizar a lista.');
            }
        }
    };

    const handleDelete = async (categoryIndex, itemIndex = null) => {
        const updatedListItems = [...listItems];

        if (itemIndex === null) {
            // Deleting entire category
            updatedListItems.splice(categoryIndex, 1);
        } else {
            // Deleting specific item
            updatedListItems[categoryIndex].splice(itemIndex + 1, 1);
        }

        setListItems(updatedListItems);

        try {
            await AsyncStorage.setItem(listTitle, JSON.stringify(updatedListItems));
        } catch (e) {
            console.error('Falha ao atualizar a lista.', e);
            ShowAlert('Erro', 'Falha ao atualizar a lista.');
        }
    };

    useEffect(() => {
        const fetchListItems = async () => {
            try {
                if (initialListTitle) {
                    const savedItemsJson = await AsyncStorage.getItem(initialListTitle);
                    if (savedItemsJson !== null) {
                        setListItems(JSON.parse(savedItemsJson));
                        const savedDate = await AsyncStorage.getItem(`${initialListTitle}_date`);
                        setCreationDate(savedDate || new Date().toLocaleDateString());
                    }
                }
            } catch (e) {
                console.error('Falha ao carregar a lista.', e);
                ShowAlert('Erro', 'Falha ao carregar a lista.');
            }
        };

        fetchListItems();
    }, [initialListTitle]);

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
            <View style={styles.buttons}>
                <Link href='/' asChild>
                    <Pressable>
                        <Icon name="arrow-back" size={30} color="#EE6B4D" style={styles.icon} />
                    </Pressable>
                </Link>

                <MainButton title="" add color='#EB4B4B' icon="delete" onPress={() => handleDeleteList(listTitle)} />
            </View>

            <View style={styles.header}>
                <Text style={styles.textSub}>Listinha</Text>
                <TextInput
                style={styles.titleInput}
                placeholderTextColor="#B9B9B9"
                placeholder="Defina seu título"
                adjustsFontSizeToFit
                value={listTitle}
                onChangeText={setListTitle}
                onBlur={() => handleTitleChange(listTitle)}
                />
                <Text style={styles.creationDate}>{creationDate}</Text>
            </View>

            <View style={styles.buttons}>
                <SelectInput
                    value={selectedCategory}
                    onChange={handleCategoryChange}
                />
            </View>

            <ScrollView style={styles.scroll}>
                {listItems.map((categoryItems, categoryIndex) => (
                        <View key={categoryIndex}>
                            <Category title={categoryItems[0]} icon onDelete={() => handleDelete(categoryIndex)} />
                            {categoryItems.slice(1).map((item, itemIndex) => (
                                <ListItem
                                    key={itemIndex}
                                    title={item}
                                    checkBox
                                    isEditable={item === ''}
                                    index={itemIndex}
                                    onPress={() => {}}
                                    onEndEditing={(newItem) => handleItemChange(categoryIndex, itemIndex + 1, newItem)}
                                    onDelete={() => handleDelete(categoryIndex, itemIndex)}
                                    icon
                                />
                            ))}
                            <Pressable onPress={() => handleAddItem(categoryIndex)} style={styles.newItemButton}>
                                <Icon name="control-point" size={30} color="#DFFBFC" />
                            </Pressable>
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

    titleInput: {
        width: '100%',
        fontSize: 45,
        fontWeight: 'bold',
        color: '#FFFDEA',
        marginBottom: 4
    },

    buttons: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
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

    creationDate: {
        color: '#EB4B4B'
    },

    textItem: {
        color: '#FFFDEA',
        fontSize: 25,
        fontWeight: 'bold',
    },

    newItemButton: {
        alignItems: 'center',
        paddingVertical: 10
    }

});

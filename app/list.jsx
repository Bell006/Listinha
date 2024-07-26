import { Text, View, StyleSheet, ScrollView, Pressable, TextInput } from "react-native";
import { Link, useLocalSearchParams, useNavigation } from "expo-router";
import { useState, useEffect } from "react";
import { ShowAlert } from "../components/Alert";
import { Category } from "../components/Category";
import { SelectInput } from "../components/SelectInput";
import { ListItem } from "../components/ListItem";
import { MainButton } from "../components/Button";
import { handleUnnamedList } from '../utils/handleUnnamedList';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { List } from '../models/List';

export default function list() {

    const navigation = useNavigation();
    const params = useLocalSearchParams();
    const { listTitle: initialListTitle } = params;

    const [listTitle, setListTitle] = useState(initialListTitle || '');
    const [list, setList] = useState(new List(initialListTitle || ''));
    const [selectedCategory, setSelectedCategory] = useState('');

    const handleCategoryChange = async (category) => {
        if (listTitle === '') {
            const newTitle = await handleUnnamedList();
            setListTitle(newTitle);
            list.title = newTitle;
        }
        list.addCategory(category);
        setList(new List(list.title, list.items, list.date));
        await list.save();
    };

    const handleTitleChange = async (newTitle) => {
        try {
            if (list.title !== newTitle && newTitle !== '') {
                await list.delete();
                list.title = newTitle;
                setListTitle(newTitle);
                await list.save();
            }
        } catch (e) {
            console.error('Falha ao atualizar o título da lista.', e);
            ShowAlert('Erro', 'Falha ao atualizar o título da lista.');
        }
    };

    const handleAddItem = async (categoryIndex) => {
        const category = list.items[categoryIndex][0];
        list.addItem(category, '');
        setList(new List(list.title, list.items, list.date));
        await list.save();
    };

    const handleItemChange = async (categoryIndex, itemIndex, newItem) => {
        const category = list.items[categoryIndex][0];
        if (newItem === null || list.items[categoryIndex].includes(newItem)) {
            list.removeItem(category, list.items[categoryIndex][itemIndex]);
        } else {
            list.items[categoryIndex][itemIndex] = newItem;
        }
        setList(new List(list.title, list.items, list.date));
        await list.save();
    };

    const handleDelete = async (categoryIndex, itemIndex = null) => {
        if (itemIndex === null) {
            const category = list.items[categoryIndex][0];
            list.removeCategory(category);
        } else {
            const category = list.items[categoryIndex][0];
            list.removeItem(category, list.items[categoryIndex][itemIndex + 1]);
        }
        setList(new List(list.title, list.items, list.date));
        await list.save();
    };

    const handleDeleteList = () => {
        ShowAlert(
            'Deseja deletar sua lista?',
            '',
            [
                {
                    text: 'Não',
                    onPress: () => console.log('Cancelado'),
                    style: 'cancel'
                },
                {
                    text: 'Sim',
                    onPress: async () => {
                        await list.delete();
                        navigation.navigate('index');
                    }
                }
            ]
        );
    };

    useEffect(() => {
        const fetchListItems = async () => {
            try {
                if (initialListTitle != '') {
                    const loadedList = await List.load(initialListTitle);
                    if (loadedList) {
                        setList(loadedList);
                        setListTitle(loadedList.title);
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

                <MainButton title="" add color='#EB4B4B' icon="delete" onPress={handleDeleteList} />
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
                <Text style={styles.creationDate}>{list.date}</Text>
            </View>

            <View style={styles.buttons}>
                <SelectInput
                    value={selectedCategory}
                    onChange={handleCategoryChange}
                />
            </View>

            <ScrollView style={styles.scroll}>
                {list.items.map((categoryItems, categoryIndex) => (
                    <View key={categoryIndex}>
                        <Category title={categoryItems[0]} icon onDelete={() => handleDelete(categoryIndex)} />
                        {categoryItems.slice(1).map((item, itemIndex) => (
                            <ListItem
                                key={itemIndex}
                                title={item}
                                checkBox
                                isEditable={item === ''}
                                index={itemIndex}
                                onPress={() => { }}
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
        fontSize: 36,
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

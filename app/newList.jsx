import { Text, View, StyleSheet, Pressable, ScrollView } from "react-native";
import { Link, router, useLocalSearchParams, useNavigation } from "expo-router";
import { useState, useEffect } from "react";
import { ShowAlert } from "../components/Alert";
import { H1 } from "../components/H1";
import { MainButton } from "../components/Button";
import { ListItem } from "../components/ListItem";
import { Category } from "../components/Category";
import { SelectInput } from "../components/SelectInput";
import { Input } from "../components/Input";
import IconTrash from 'react-native-vector-icons/MaterialCommunityIcons';
import Icon from 'react-native-vector-icons/MaterialIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function newList() {
  const navigation = useNavigation();
  const params = useLocalSearchParams();
  const { listTitle: listTitleEdit } = params;

  const [tempItems, setTempItems] = useState([]);
  const [tempCategory, setTempCategory] = useState('');
  const [inputText, setInputText] = useState('');
  const [savedItems, setSavedItems] = useState([]);
  const [listTitle, setListTitle] = useState('');

  const handleAddItem = () => {
    if (inputText.trim()) {
      setTempItems([...tempItems, inputText]);
      setInputText('');
    }
  };

  const handleSelectCategory = (selectedCategory) => {
    setTempCategory(selectedCategory);
  };

  const handleAdd = () => {
    if (tempCategory && tempItems.length > 0) {
      const categoryIndex = savedItems.findIndex(entry => entry[0] === tempCategory);
      if (categoryIndex !== -1) {
        // Existing category
        const updatedItems = [...savedItems];
        updatedItems[categoryIndex] = [...updatedItems[categoryIndex], ...tempItems];
        setSavedItems(updatedItems);
      } else {
        // New category
        const newEntry = [tempCategory, ...tempItems];
        setSavedItems([...savedItems, newEntry]);
      }
      setTempItems([]);
      setTempCategory('');
    }
  };

  const handleRemoveItem = (entryIndex, itemIndex, isTemp = false) => {
    if (isTemp) {
      const newTempItems = [...tempItems];
      newTempItems.splice(itemIndex, 1);
      setTempItems(newTempItems);
    } else {
      const newSavedItems = [...savedItems];
      newSavedItems[entryIndex].splice(itemIndex + 1, 1);
      if (newSavedItems[entryIndex].length === 1) {
        newSavedItems.splice(entryIndex, 1);
      }
      setSavedItems(newSavedItems);
    }
  };

  const handleRemoveCategory = (entryIndex) => {
    const newSavedItems = savedItems.filter((_, index) => index !== entryIndex);
    setSavedItems(newSavedItems);
  };

  const handleTitleChange = async () => {
    try {
      if (listTitleEdit && listTitle !== listTitleEdit) {
        await AsyncStorage.removeItem(listTitleEdit);
      }
      setListTitle(listTitle);
    } catch (e) {
      console.error('Falha ao atualizar o título da lista.', e);
      ShowAlert('Erro', 'Falha ao atualizar o título da lista.');
    }
  };

  const mergeItems = (existingItems, newItems) => {
    newItems.forEach(newEntry => {
      const category = newEntry[0];
      const items = newEntry.slice(1);

      const index = existingItems.findIndex(entry => entry[0] === category);
      if (index !== -1) {
        existingItems[index] = [category, ...items];
      } else {
        existingItems.push(newEntry);
      }
    });

    return existingItems;
  };

  const handleSave = async () => {
    if (listTitle.trim()) {
      try {
        if (!Array.isArray(savedItems)) {
          throw new Error('savedItems não é um array válido');
        }

        let existingItems = [];

        // Verify if title already exists
        const savedItemsJson = await AsyncStorage.getItem(listTitle);
        if (savedItemsJson !== null) {
          // if so, update
          existingItems = JSON.parse(savedItemsJson);
        }

        const updatedItems = mergeItems(existingItems, savedItems);

        // Saving updated items
        await AsyncStorage.setItem(listTitle, JSON.stringify(updatedItems));

        ShowAlert('Sucesso', 'Lista salva com sucesso!');

        navigation.navigate('list', { listTitle });
      } catch (e) {
        console.error('Falha ao salvar a lista.', e);
        ShowAlert('Erro', 'Falha ao salvar a lista. Tente novamente.');
      }
    } else {
      ShowAlert('Aviso', 'Por favor, forneça um título para a lista.');
    }
  };

  useEffect(() => {
    const fetchListItems = async () => {
      try {
        if (listTitleEdit) {
          const savedItemsJson = await AsyncStorage.getItem(listTitleEdit);
          if (savedItemsJson !== null) {
            setSavedItems(JSON.parse(savedItemsJson));
          }
        }
      } catch (e) {
        console.error('Falha ao carregar listas.', e);
        ShowAlert('Erro', 'Falha ao carregar suas listas.');
      }
    };

    fetchListItems();
  }, [listTitleEdit]);

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "#293241",
        alignContent: 'center',
        paddingVertical: 40,
        paddingHorizontal: 20
      }}
    >
      <Link href='/' asChild>
        <Pressable>
          <Icon name="arrow-back" size={30} color="#EE6B4D" style={styles.icon} />
        </Pressable>
      </Link>
      <H1 title={'O que vai ser hoje?'} />

      <ScrollView>
        <Text style={styles.labelText}>
          Dê um nome para sua listinha:
        </Text>
        <Input placeholder={listTitleEdit ? listTitleEdit : "Ex: Mercado"}
          value={listTitle}
          onChangeText={setListTitle}
          onBlur={handleTitleChange}
        />

        <Text style={styles.labelText}>
          Categoria:
        </Text>
        <SelectInput value={tempCategory} onChange={handleSelectCategory} />

        <Text style={styles.labelText}>
          Itens:
        </Text>
        <Input icon placeholder="Ex: Leite"
          value={inputText}
          onChangeText={setInputText}
          onPress={handleAddItem}
        />

        <View style={styles.badgeWrapper}>
          {tempItems.map((item, index) => (
            <View style={styles.badge} key={index}>
              <Text>{item}</Text>
              <Pressable onPress={() => handleRemoveItem(null, index, true)}>
                <IconTrash name="trash-can-outline" size={20} color="#EE6B4D" />
              </Pressable>
            </View>
          ))}
        </View>

        <MainButton add title='Adicionar' color='#FFFDEA' onPress={handleAdd} />


        {savedItems.length === 0 ? (
          <Text style={styles.emptyText}>Escolha uma categoria e adicione itens para começar!</Text>
        ) : (
          savedItems.map((entry, entryIndex) => (
            <View key={entryIndex} style={styles.categoryWrapper}>
              <Category title={entry[0]} icon onPress={() => handleRemoveCategory(entryIndex)} />
              {entry.slice(1).map((item, itemIndex) => (
                <ListItem key={itemIndex} title={item} icon onPress={() => handleRemoveItem(entryIndex, itemIndex)} />
              ))}
            </View>
          ))
        )}

        <MainButton title='Salvar' color='#EE6B4D' onPress={handleSave} />
      </ScrollView>

    </View>
  );
};

const styles = StyleSheet.create({
  icon: {
    marginBottom: 20
  },

  labelText: {
    fontSize: 20,
    color: '#FFFDEA',
    marginBottom: 2,
    marginTop: 15,
  },

  badge: {
    padding: 8,
    fontSize: 16,
    fontWeight: 'bold',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    backgroundColor: '#DFFBFC',
    borderRadius: 5,
    alignSelf: 'flex-start',
    marginRight: 10,
    marginVertical: 8,
  },

  badgeWrapper: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginVertical: 8
  },

  emptyText: {
    borderLeftWidth: 5,
    borderLeftColor: '#FFFDEA',
    marginVertical: 16,
    width: '90%',
    padding: 20,
    fontSize: 20,
    color: '#DFFBFC'
  }
});

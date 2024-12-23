import { Text, View, StyleSheet, ScrollView, Pressable } from "react-native";
import { useNavigation } from "expo-router";
import { useState, useEffect } from "react";
import { ShowAlert } from "../components/Alert";
import { H1 } from "../components/H1";
import Icon from 'react-native-vector-icons/MaterialIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Index() {
  const navigation = useNavigation();

  const [savedListsTitles, setSavedListsTitles] = useState([]);

  const handleListNavigation = (listTitle) => {
    try {
      navigation.navigate('list', { listTitle });
    } catch (e) {
      console.error('Erro ao navegar para a lista.', e);
      ShowAlert('Erro', 'Erro ao navegar para a lista.');
    }
  };
  
  useEffect(() => {
    const fetchSavedListsTitles = async () => {
      try {
        const allKeys = await AsyncStorage.getAllKeys();
        const filteredKeys = allKeys.filter(key => !key.endsWith('_date'));
        setSavedListsTitles(filteredKeys);
      } catch (e) {
        console.error('Falha ao carregar listas.', e);
        ShowAlert('Erro', 'Falha ao carregar suas listas.');
      }
    };

    fetchSavedListsTitles();
  }, [savedListsTitles]);

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
      <H1 title={'Bora ali, fazer umas compras?'} />
      <Pressable style={styles.addButton} onPress={() => handleListNavigation('')}>
        <Icon name="control-point" size={30} color="#DFFBFC" />
        <Text style={styles.addText} adjustsFontSizeToFit>Nova listinha</Text>
      </Pressable>

      <View style={styles.scrollViewContainer}>
        <ScrollView style={styles.scroll}>
          {savedListsTitles.length === 0 ? (
            <Text style={styles.textItemNone} adjustsFontSizeToFit numberOfLines={2}>Por enquanto você não possui nenhuma listinha :(</Text>
          ) : (
            savedListsTitles.map((listTitle, index) => (
              <Pressable
                style={styles.item}
                key={index}
                onPress={() => handleListNavigation(listTitle)}
              >
                <Text style={styles.textItem}>{listTitle}</Text>
              </Pressable>
            ))
          )}
        </ScrollView>
      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  addButton: {
    flexDirection: 'row',
    gap: 5,
    height: 70,
    width: '65%',
    alignItems: 'center',
    paddingHorizontal: 10,
    justifyContent: 'flex-start',
    borderWidth: 4,
    borderColor: '#DFFBFC',
    paddingVertical: 12,
    borderRadius: 8,
  },

  addText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#DFFBFC',
  },

  textDate: {
    width: '100%',
    fontSize: 16,
    color: '#EE6B4D',
    marginBottom: 1,
  },

  scrollViewContainer: {
    textAlign: 'center',
    maxHeight: '60%',
    flexWrap: 'wrap',
    marginTop: 10,
  },

  scroll: {
    borderLeftWidth: 5,
    borderLeftColor: '#FFFDEA',
    width: '90%',
    marginVertical: 40,
  },

  item: {
    flexDirection: 'column',
    justifyContent: 'flex-start',
    minHeight: 64,
    paddingVertical: 12,
    paddingHorizontal: 20,
    marginHorizontal: 20,
    marginVertical: 4,
    borderRadius: 8,
    backgroundColor: '#0B1321',
  },

  textItem: {
    color: '#FFFDEA',
    fontSize: 25,
    fontWeight: 'bold',
  },

  textItemNone: {
    borderLeftWidth: 1,
    borderLeftColor: '#FFFDEA',
    width: '95%',
    padding: 20,
    fontSize: 20,
    color: '#DFFBFC'
  }

});

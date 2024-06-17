import { Text, View, StyleSheet, Pressable, ScrollView } from "react-native";
import { Link } from "expo-router";
import { H1 } from "../components/H1";
import { MainButton } from "../components/Button";
import { ListItem } from "../components/ListItem";
import { Category } from "../components/Category";
import { SelectInput } from "../components/SelectInput";
import { Input } from "../components/Input";
import IconTrash from 'react-native-vector-icons/MaterialCommunityIcons';
import Icon from 'react-native-vector-icons/MaterialIcons';

export default function newList() {
  const items = ['Batata', 'Cenoura', 'Tomate', 'Alface', 'Pepino'];

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
          <Icon name="arrow-back" size={30} color="#EE6B4D" style={styles.icon}/>
        </Pressable>
      </Link>
      <H1 title={'O que vai ser hoje?'}/>

      <ScrollView>
        <Text style={styles.labelText}>
            Categoria:
        </Text>
        <SelectInput/>
        <Text style={styles.labelText}>
              Itens:
        </Text>

        <Input icon placeholder="Ex: Leite"/>
        <View style={styles.badgeWrapper}>
          <View style={styles.badge}>
            <Text>Batata</Text>
            <IconTrash name="trash-can-outline" size={20} color="#EE6B4D" />
          </View>
          <View style={styles.badge}>
            <Text>Batata</Text>
            <IconTrash name="trash-can-outline" size={20} color="#EE6B4D" />
          </View>
          <View style={styles.badge}>
            <Text>Batata</Text>
            <IconTrash name="trash-can-outline" size={20} color="#EE6B4D" />
          </View>
          <View style={styles.badge}>
            <Text>Batata</Text>
            <IconTrash name="trash-can-outline" size={20} color="#EE6B4D" />
          </View>
          <View style={styles.badge}>
            <Text>Batata</Text>
            <IconTrash name="trash-can-outline" size={20} color="#EE6B4D" />
          </View>
        </View>

        <MainButton title='Adicionar' add color='#FFFDEA'/>

        <Category title='Frutas e verduras' icon/>
        {items.map((item, index) => (
          <ListItem key={index} title={item} icon index={index} />
        ))}

      <MainButton title='Salvar' color='#EE6B4D'/>
      </ScrollView>

    </View>
  );
}

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
  }
});

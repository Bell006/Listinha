import { Text, View, StyleSheet, ScrollView, Pressable } from "react-native";
import { Link } from "expo-router";
import { H1 } from "../components/H1";
import Icon from 'react-native-vector-icons/MaterialIcons';

export default function Index() {
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
      <H1 title={'Bora ali, fazer umas compras?'}/>
      <Link href="/newList" asChild>
        <Pressable style={styles.addButton}>
          <Icon name="control-point" size={30} color="#DFFBFC"/>
          <Text style={styles.addText}>Nova listinha</Text>
        </Pressable>
      </Link>

      <View style={styles.scrollViewContainer}>
        <ScrollView style={styles.scroll}>
          <Pressable style={styles.item}>
            <Text style={styles.textDate}>19/02/24</Text>
            <Text style={styles.textItem}>Lista vovô</Text>
          </Pressable>
          <Pressable style={styles.item}>
            <Text style={styles.textDate}>19/02/24</Text>
            <Text style={styles.textItem}>Lista vovô</Text>
          </Pressable>
          <Pressable style={styles.item}>
            <Text style={styles.textDate}>19/02/24</Text>
            <Text style={styles.textItem}>Lista vovô</Text>
          </Pressable>
          <Pressable style={styles.item}>
            <Text style={styles.textDate}>19/02/24</Text>
            <Text style={styles.textItem}>Lista vovô</Text>
          </Pressable>
        </ScrollView>

        <Text style={styles.textItemNone}>Por enquanto você não possui nenhuma listinha :(</Text>
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
    flex: 1,
    maxHeight: 450,
    minHeight: 30,
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
    marginBottom: 20,
    borderRadius: 8,
    backgroundColor: '#0B1321',
  },

  textItem: {
    color: '#FFFDEA',
    fontSize: 25,
    fontWeight: 'bold',
  },

  textItemNone: {
    borderLeftWidth: 5,
    borderLeftColor: '#FFFDEA',
    width: '90%',
    padding: 20,
    fontSize: 20,
    color: '#DFFBFC'
  }

});

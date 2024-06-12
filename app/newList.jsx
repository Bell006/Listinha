import { Text, View, StyleSheet, ScrollView, Pressable } from "react-native";
import { Link } from "expo-router";
import { MainButton } from "../components/Button";

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

    </View>
  );
}

const styles = StyleSheet.create({
  text: {
      width: '100%',
      fontSize: 45,
      fontWeight: 'bold',
      color: '#FFFDEA',
      marginBottom: 20
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

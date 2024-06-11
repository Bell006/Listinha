import {React, useState} from "react";
import {SafeAreaView, StyleSheet} from "react-native";
import DropdownSelect from 'react-native-input-select';

export function SelectInput({placeholder, type, ...rest}) {

    const [categories, setCategories] = useState();
  
    return (
        <SafeAreaView style={styles.container}>
            <DropdownSelect
                placeholder="Selecione a categoria"
                dropdownStyle={styles.dropdownStyle}
                placeholderStyle={{
                    color: "#B9B9B9"
                }}
                selectedItemStyle={{
                    color: 'white'
                }}
                modalControls={{
                    modalOptionsContainerStyle: {
                        padding: 15,
                        backgroundColor: '#0B1321',
                    }
                }}
                checkboxControls={{
                    checkboxStyle: {
                      backgroundColor: '#EE6B4D',
                      borderColor: '#DFFBFC',
                    },
                    checkboxLabelStyle: { color: '#DFFBFC', fontSize: 20 }
                }}

                options={[
                    { label: 'Laticínios', value: 'LA' },
                    { label: 'Frutas e verduras', value: 'FV' },
                    { label: 'Frios', value: 'RE' },
                    { label: 'Proteínas', value: 'CA' },
                    { label: 'Bebidas', value: 'BE' },
                    { label: 'Produtos de limpeza', value: 'PL' },
                    { label: 'Higiene Pessoal', value: 'HP' },
                    { label: 'Pets', value: 'PE' },
                    { label: 'Embalagens', value: 'EM' },
                    { label: 'Panificação', value: 'PA' },
                    { label: 'Doces e guloseimas', value: 'DG' },
                    { label: 'Farinhas e grãos', value: 'FG' },
                    { label: 'Utensílios de casa', value: 'UT' }
                ]}
                selectedValue={categories}
                onValueChange={(value) => setCategories(value)}
            />
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        width: '80%'
    },

    dropdownStyle: {
        backgroundColor: '#0B1321',
        height: 48,
        marginVertical: 12,
        borderRadius: 8,
    }

})
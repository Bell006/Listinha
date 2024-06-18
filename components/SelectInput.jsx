import { React } from "react";
import { SafeAreaView, StyleSheet } from "react-native";
import DropdownSelect from 'react-native-input-select';

export function SelectInput({ placeholder, type, value, onChange, ...rest }) {

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
                    { label: 'Bebidas', value: 'Bebidas' },
                    { label: 'Condimentos', value: 'Condimentos' },
                    { label: 'Doces e guloseimas', value: 'Doces e guloseimas' },
                    { label: 'Enlatados', value: 'Enlatados' },
                    { label: 'Farinhas e grãos', value: 'Farinhas e grãos' },
                    { label: 'Frutas e verduras', value: 'Frutas e verduras' },
                    { label: 'Frios', value: 'Frios' },
                    { label: 'Higiene Pessoal', value: 'Higiene Pessoal' },
                    { label: 'Industrializados', value: 'Industrializados' },
                    { label: 'Laticínios', value: 'Laticínios' },
                    { label: 'Outros', value: 'Outros' },
                    { label: 'Panificação', value: 'Panificação' },
                    { label: 'Pets', value: 'Pets' },
                    { label: 'Limpeza', value: 'Limpeza' },
                    { label: 'Proteínas', value: 'Proteínas' },
                    { label: 'Utensílios', value: 'Utensílios' }
                ]}
                selectedValue={value}
                onValueChange={(itemValue) => onChange(itemValue)}
            />
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        width: '100%'
    },

    dropdownStyle: {
        backgroundColor: '#0B1321',
        height: 48,
        marginVertical: 12,
        borderRadius: 8,
    },

})
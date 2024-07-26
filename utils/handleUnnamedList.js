import AsyncStorage from '@react-native-async-storage/async-storage';

export const handleUnnamedList = async () => {
    try {
        const allKeys = await AsyncStorage.getAllKeys();

        let baseTitle = 'Listinha';
        let indexes = []

        for (let i = 0; i < allKeys.length; i++) {
            const key = allKeys[i];
            const match = key.match(/Listinha (\d+)$/);
            if (match) {
                indexes.push(Number(match[1]));
            }
        }

        const maxIndex = indexes.length > 0 ? Math.max(...indexes) : 0;
        const newTitle = `${baseTitle} ${maxIndex + 1}`;
        
        return newTitle

    } catch (e) {
    console.error('Falha ao carregar listas.', e);
    ShowAlert('Erro', 'Falha ao carregar suas listas.');
    }
} 
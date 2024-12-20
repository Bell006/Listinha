import AsyncStorage from '@react-native-async-storage/async-storage';

export class UnnamedListManager {
    static async generateTitle() {
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
            return `${baseTitle} ${maxIndex + 1}`;

        } catch (e) {
            console.error('Falha ao carregar listas.', e);
            ShowAlert('Erro', 'Falha ao carregar suas listas.');
        }
    }
}

export class CheckedItemsManager {
    static async save(listTitle, checkedItems) {
        try {
            await AsyncStorage.setItem(`${listTitle}_checked`, JSON.stringify(checkedItems));
        } catch (e) {
            console.error('Failed to save checked items', e);
        }
    }

    static async load(listTitle) {
        try {
            const checkedItemsJson = await AsyncStorage.getItem(`${listTitle}_checked`);
            return checkedItemsJson ? JSON.parse(checkedItemsJson) : {};
        } catch (e) {
            console.error('Failed to load checked items', e);
            return {};
        }
    }

    static async delete(listTitle) {
        try {
            await AsyncStorage.removeItem(`${listTitle}_checked`);
        } catch (e) {
            console.error('Failed to delete checked items', e);
        }
    }
}
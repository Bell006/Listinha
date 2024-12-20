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
    static getStorageKey(listTitle) {
        return `__checked__${listTitle}`;
    }

    static async save(listTitle, checkedItems) {
        try {
            const key = this.getStorageKey(listTitle);
            await AsyncStorage.setItem(key, JSON.stringify(checkedItems));
        } catch (e) {
            console.error('Failed to save checked items', e);
        }
    }

    static async load(listTitle) {
        try {
            const key = this.getStorageKey(listTitle);
            const checkedItemsJson = await AsyncStorage.getItem(key);
            return checkedItemsJson ? JSON.parse(checkedItemsJson) : {};
        } catch (e) {
            console.error('Failed to load checked items', e);
            return {};
        }
    }

    static async delete(listTitle) {
        try {
            const key = this.getStorageKey(listTitle);
            await AsyncStorage.removeItem(key);
        } catch (e) {
            console.error('Failed to delete checked items', e);
        }
    }

    static isItemChecked(checkedItems, category, item) {
        return checkedItems[category]?.[item] || false;
    }

    static toggleItemCheck(checkedItems, category, item, checked) {
        if (!checkedItems[category]) {
            checkedItems[category] = {};
        }
        checkedItems[category][item] = checked;
    }
}
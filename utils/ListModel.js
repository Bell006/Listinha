import AsyncStorage from '@react-native-async-storage/async-storage';
import CheckedItemsManager  from 'ListManager.js';

export class List {
    constructor(title, items=[], date = new Date().toLocaleDateString(), checkedItems={}) {
        this.title = title;
        this.items = items;
        this.date = date;
        this.checkedItems = checkedItems;
        this.checkedItemsManager = new CheckedItemsManager();
    }

    async save() {
        try {
            const data = {
                items: this.items,
                date: this.date
            };
            await AsyncStorage.setItem(this.title, JSON.stringify(data));
            await this.checkedItemsManager.saveCheckedItems(this.title, this.checkedItems);
        } catch (e) {
            console.error('Falha ao salvar a lista.', e);
        }
    }

    static async load(title) {
        try {
            const data = await AsyncStorage.getItem(title);
            const checkedItems = await this.checkedItemsManager.loadCheckedItems(title);
            console.log(data)
            if (data) {
                const parsedData = JSON.parse(data);
                return new List(title, parsedData.items || [], parsedData.date, checkedItems);
            }
            return null;
        } catch (e) {
            console.error('Falha ao carregar a lista.', e);
            return null;
        }
    }

    async delete() {
        try {
            await AsyncStorage.removeItem(this.title);
            await this.checkedItemsManager.eleteCheckedItems(this.title);
        } catch (e) {
            console.error('Falha ao deletar a lista.', e);
        }
    }

    addCategory(category) {
        if (!this.items.some(item => item[0] === category)) {
            const newItems = JSON.parse(JSON.stringify(this.items));
            newItems.push([category]);
            this.items = newItems;
        }
    }

    addItem(category, item) {
        const categoryIndex = this.items.findIndex(cat => cat[0] === category);
        if (categoryIndex !== -1) {
            const newItems = JSON.parse(JSON.stringify(this.items));
            newItems[categoryIndex].push(item);
            this.items = newItems;
        }
    }

    removeItem(category, item) {
        const categoryIndex = this.items.findIndex(cat => cat[0] === category);
        
        if (categoryIndex !== -1) {
            const newItems = JSON.parse(JSON.stringify(this.items));
            newItems[categoryIndex] = newItems[categoryIndex].filter(it => it !== item);
            this.items = newItems;
        }
    }

    removeCategory(category) {
        const newItems = JSON.parse(JSON.stringify(this.items));
        this.items = newItems.filter(item => item[0] !== category);
    }
}


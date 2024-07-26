import AsyncStorage from '@react-native-async-storage/async-storage';

export class List {
    constructor(title, items=[], date = new Date().toLocaleDateString()) {
        this.title = title;
        this.items = items;
        this.date = date 
    }

    async save() {
        try {
            await AsyncStorage.setItem(this.title, JSON.stringify(this.items));
            await AsyncStorage.setItem(`${this.title}_date`, this.date);
        } catch (e) {
            console.error('Falha ao salvar a lista.', e);
        }
    }

    static async load(title) {
        try {
            const itemsJson = await AsyncStorage.getItem(title);
            const date = await AsyncStorage.getItem(`${title}_date`);
            const items = itemsJson ? JSON.parse(itemsJson) : [];
            return new List(title, items, date);
        } catch (e) {
            console.error('Falha ao carregar a lista.', e);
            return null;
        }
    }

    async delete() {
        try {
            await AsyncStorage.removeItem(this.title);
            await AsyncStorage.removeItem(`${this.title}_date`);
        } catch (e) {
            console.error('Falha ao deletar a lista.', e);
        }
    }

    addCategory(category) {
        if (!this.items.some(item => item[0] === category)) {
            this.items.push([category]);
        }
    }

    addItem(category, item) {
        const categoryIndex = this.items.findIndex(cat => cat[0] === category);
        if (categoryIndex !== -1) {
            this.items[categoryIndex].push(item);
        }
    }

    removeItem(category, item) {
        const categoryIndex = this.items.findIndex(cat => cat[0] === category);
        if (categoryIndex !== -1) {
            this.items[categoryIndex] = this.items[categoryIndex].filter(it => it !== item);
        }
    }

    removeCategory(category) {
        this.items = this.items.filter(item => item[0] !== category);
    }
}


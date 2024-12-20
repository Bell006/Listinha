import AsyncStorage from '@react-native-async-storage/async-storage';
export class List {
    constructor(title, items=[], date = new Date().toLocaleDateString(), checkedItems={}) {
        this.title = title;
        this.items = items;
        this.date = date || new Date().toLocaleDateString();
        this.checkedItems = checkedItems;
    }

    async save() {
        try {
            const data = {
                title: this.title,
                items: this.items,
                date: this.date,
                checkedItems: this.checkedItems
            };
            await AsyncStorage.setItem(this.title, JSON.stringify(data));
        } catch (e) {
            console.error('Falha ao salvar a lista.', e);
        }
    }

    static async load(title) {
        try {
            const data = await AsyncStorage.getItem(title);
            if (data) {
                const parsedData = JSON.parse(data);
                return new List(
                    title, 
                    parsedData.items || [], 
                    parsedData.date,
                    parsedData.checkedItems || {}
                );
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


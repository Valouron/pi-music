import { action } from 'mobx';
import { store } from '../store';

export const updateText = action((value: string, volume = 10) => {
    store.notes.splice(0, store.notes.length);
    for (let i = 0; i < value.length; ++i) {
        const digit = value.charCodeAt(i) - 48;
        if (digit >= 0 && digit < 10) {
            store.notes.push(store.mapping[digit]);
        }
    }
});
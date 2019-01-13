import { action } from 'mobx';
import { store } from '../store';

export const updateText = action((value: string, volume = 10) => {
    store.notes.splice(0, store.notes.length);
    for (let i = 0; i < value.length; ++i) {
        const digit = value.charCodeAt(i);
        if (digit >= 48 && digit < 58) {
            store.notes.push(store.mapping[digit-48]);
        } else if (digit >= "a".charCodeAt(0) && digit < "c".charCodeAt(0)) {
            store.notes.push(store.mapping[digit-87])
        }
    }
});
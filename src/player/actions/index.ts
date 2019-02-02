import { action } from 'mobx';
import { store } from '../store';
import * as bigint from 'big-integer';


export const updateBase = action((newBase: number) => {
    const base = store.base;
    const value = store.inputText;
    const newValue = bigint.fromArray(
        value.split("").map(v => parseInt(v, base)),
        base
    ).toString(newBase);
    store.base = newBase;
    store.inputText = newValue;
});

export const updateText = action((value: string) => {
    store.inputText = value;
});

export const updateBpm = action((newBpm: number) => {
    store.bpm = newBpm;
});

export const updatePlaying = action((newPlaying: boolean) => {
    store.playing = newPlaying;
});
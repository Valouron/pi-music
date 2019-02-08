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

export const updateGamme = action((newGamme: string) => {
    store.gamme = newGamme;
    if ( newGamme == "DoMajeur" ) {
        store.mapping = {
            0: {
                note: "C4",
                digit: 0,
                duration: 0.5,
                volume: 0.5,
            },
            1: {
                note: "D4",
                digit: 1,
                duration: 0.5,
                volume: 0.5,
            },
            2: {
                note: "E4",
                digit: 2,
                duration: 0.5,
                volume: 0.5,
            },
            3: {
                note: "F4",
                digit: 3,
                duration: 0.5,
                volume: 0.5,
            },
            4: {
                note: "G4",
                digit: 4,
                duration: 0.5,
                volume: 0.5,
            },
            5: {
                note: "A4",
                digit: 5,
                duration: 0.5,
                volume: 0.5,
            },
            6: {
                note: "B4",
                digit: 6,
                duration: 0.5,
                volume: 0.5,
            },
            7: {
                note: "C5",
                digit: 7,
                duration: 0.5,
                volume: 0.5,
            },
            8: {
                note: "D5",
                digit: 8,
                duration: 0.5,
                volume: 0.5,
            },
            9: {
                note: "E5",
                digit: 9,
                duration: 0.5,
                volume: 0.5,
            },
            10: {
                note: "F5",
                digit: "a",
                duration: 0.5,
                volume: 0.5,
            },
            11: {
                note: "G5",
                digit: "b",
                duration: 0.5,
                volume: 0.5,
            },
        };
    } else if ( newGamme == "DoMineur" ) {
        store.mapping = {
            0: {
                note: "C4",
                digit: 0,
                duration: 0.5,
                volume: 0.5,
            },
            1: {
                note: "D4",
                digit: 1,
                duration: 0.5,
                volume: 0.5,
            },
            2: {
                note: "Eb4",
                digit: 2,
                duration: 0.5,
                volume: 0.5,
            },
            3: {
                note: "F4",
                digit: 3,
                duration: 0.5,
                volume: 0.5,
            },
            4: {
                note: "G4",
                digit: 4,
                duration: 0.5,
                volume: 0.5,
            },
            5: {
                note: "Ab4",
                digit: 5,
                duration: 0.5,
                volume: 0.5,
            },
            6: {
                note: "B4",
                digit: 6,
                duration: 0.5,
                volume: 0.5,
            },
            7: {
                note: "C5",
                digit: 7,
                duration: 0.5,
                volume: 0.5,
            },
            8: {
                note: "D5",
                digit: 8,
                duration: 0.5,
                volume: 0.5,
            },
            9: {
                note: "Eb5",
                digit: 9,
                duration: 0.5,
                volume: 0.5,
            },
            10: {
                note: "F5",
                digit: "a",
                duration: 0.5,
                volume: 0.5,
            },
            11: {
                note: "G5",
                digit: "b",
                duration: 0.5,
                volume: 0.5,
            },
        };
    } else if ( newGamme == "Rand" ) {
        store.mapping = {
            0: {
                note: (200+1500*Math.random()).toString(),
                digit: 0,
                duration: 0.5,
                volume: 0.5,
            },
            1: {
                note: (200+1500*Math.random()).toString(),
                digit: 1,
                duration: 0.5,
                volume: 0.5,
            },
            2: {
                note: (200+1500*Math.random()).toString(),
                digit: 2,
                duration: 0.5,
                volume: 0.5,
            },
            3: {
                note: (200+1500*Math.random()).toString(),
                digit: 3,
                duration: 0.5,
                volume: 0.5,
            },
            4: {
                note: (200+1500*Math.random()).toString(),
                digit: 4,
                duration: 0.5,
                volume: 0.5,
            },
            5: {
                note: (200+1500*Math.random()).toString(),
                digit: 5,
                duration: 0.5,
                volume: 0.5,
            },
            6: {
                note: (200+1500*Math.random()).toString(),
                digit: 6,
                duration: 0.5,
                volume: 0.5,
            },
            7: {
                note: (200+1500*Math.random()).toString(),
                digit: 7,
                duration: 0.5,
                volume: 0.5,
            },
            8: {
                note: (200+1500*Math.random()).toString(),
                digit: 8,
                duration: 0.5,
                volume: 0.5,
            },
            9: {
                note: (200+1500*Math.random()).toString(),
                digit: 9,
                duration: 0.5,
                volume: 0.5,
            },
            10: {
                note: (200+1500*Math.random()).toString(),
                digit: "a",
                duration: 0.5,
                volume: 0.5,
            },
            11: {
                note: (200+1500*Math.random()).toString(),
                digit: "b",
                duration: 0.5,
                volume: 0.5,
            },
        };
    }
});
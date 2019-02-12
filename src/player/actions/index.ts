import { action } from 'mobx';
import { store } from '../store';
import * as bigint from 'big-integer';
import * as Tone from 'tone';
(window as any).Tone = Tone;

function randomNote() {
    return (Math.floor(150+1150*Math.random())).toString()
}

export const sortNotes = action(() => {
    const dict = store.mapping;
    const base = store.base;
    const list = [];
    for(const digit in dict) {
        if( Number(digit) < base ) {
            const value = dict[Number(digit)].note;
            list.push(value);
        }
    }
    const newList = list.sort((a, b) => Tone.Frequency(a) - Tone.Frequency(b));
    for(const digit in dict) {
        if( Number(digit) < base ) {
            dict[Number(digit)].note = newList[Number(digit)];
        }
    }
});

export const updateMapping = action((digit: string, newValue: string) => {
    store.mapping[Number(digit)].note = newValue;
    store.gamme = "";
});

export const updateBase = action((newBase: number) => {
    const base = store.base;
    const value = store.inputText;
    const newValue = bigint.fromArray(
        value.split("").map(v => parseInt(v, base)),
        base
    ).toString(newBase).toUpperCase();
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
                digit: "A",
                duration: 0.5,
                volume: 0.5,
            },
            11: {
                note: "G5",
                digit: "B",
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
                digit: "A",
                duration: 0.5,
                volume: 0.5,
            },
            11: {
                note: "G5",
                digit: "B",
                duration: 0.5,
                volume: 0.5,
            },
        };
    } else if ( newGamme == "DoPenta" ) {
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
                note: "G4",
                digit: 3,
                duration: 0.5,
                volume: 0.5,
            },
            4: {
                note: "A4",
                digit: 4,
                duration: 0.5,
                volume: 0.5,
            },
            5: {
                note: "C5",
                digit: 5,
                duration: 0.5,
                volume: 0.5,
            },
            6: {
                note: "D5",
                digit: 6,
                duration: 0.5,
                volume: 0.5,
            },
            7: {
                note: "E5",
                digit: 7,
                duration: 0.5,
                volume: 0.5,
            },
            8: {
                note: "G5",
                digit: 8,
                duration: 0.5,
                volume: 0.5,
            },
            9: {
                note: "A5",
                digit: 9,
                duration: 0.5,
                volume: 0.5,
            },
            10: {
                note: "C6",
                digit: "A",
                duration: 0.5,
                volume: 0.5,
            },
            11: {
                note: "D6",
                digit: "B",
                duration: 0.5,
                volume: 0.5,
            },
        };
    }  else if ( newGamme == "DoChroma" ) {
        store.mapping = {
            0: {
                note: "C4",
                digit: 0,
                duration: 0.5,
                volume: 0.5,
            },
            1: {
                note: "Db4",
                digit: 1,
                duration: 0.5,
                volume: 0.5,
            },
            2: {
                note: "D4",
                digit: 2,
                duration: 0.5,
                volume: 0.5,
            },
            3: {
                note: "Eb4",
                digit: 3,
                duration: 0.5,
                volume: 0.5,
            },
            4: {
                note: "E4",
                digit: 4,
                duration: 0.5,
                volume: 0.5,
            },
            5: {
                note: "F4",
                digit: 5,
                duration: 0.5,
                volume: 0.5,
            },
            6: {
                note: "Gb4",
                digit: 6,
                duration: 0.5,
                volume: 0.5,
            },
            7: {
                note: "G4",
                digit: 7,
                duration: 0.5,
                volume: 0.5,
            },
            8: {
                note: "Ab4",
                digit: 8,
                duration: 0.5,
                volume: 0.5,
            },
            9: {
                note: "A4",
                digit: 9,
                duration: 0.5,
                volume: 0.5,
            },
            10: {
                note: "Bb4",
                digit: "A",
                duration: 0.5,
                volume: 0.5,
            },
            11: {
                note: "B4",
                digit: "B",
                duration: 0.5,
                volume: 0.5,
            },
        };
    } else if ( newGamme == "Rand" ) {
        store.mapping = {
            0: {
                note: randomNote(),
                digit: 0,
                duration: 0.5,
                volume: 0.5,
            },
            1: {
                note: randomNote(),
                digit: 1,
                duration: 0.5,
                volume: 0.5,
            },
            2: {
                note: randomNote(),
                digit: 2,
                duration: 0.5,
                volume: 0.5,
            },
            3: {
                note: randomNote(),
                digit: 3,
                duration: 0.5,
                volume: 0.5,
            },
            4: {
                note: randomNote(),
                digit: 4,
                duration: 0.5,
                volume: 0.5,
            },
            5: {
                note: randomNote(),
                digit: 5,
                duration: 0.5,
                volume: 0.5,
            },
            6: {
                note: randomNote(),
                digit: 6,
                duration: 0.5,
                volume: 0.5,
            },
            7: {
                note: randomNote(),
                digit: 7,
                duration: 0.5,
                volume: 0.5,
            },
            8: {
                note: randomNote(),
                digit: 8,
                duration: 0.5,
                volume: 0.5,
            },
            9: {
                note: randomNote(),
                digit: 9,
                duration: 0.5,
                volume: 0.5,
            },
            10: {
                note: randomNote(),
                digit: "A",
                duration: 0.5,
                volume: 0.5,
            },
            11: {
                note: randomNote(),
                digit: "B",
                duration: 0.5,
                volume: 0.5,
            },
        };
    }
});
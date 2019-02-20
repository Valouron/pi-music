import { action } from 'mobx';
import { store , instruments } from '../store';
import * as bigint from 'big-integer';
import * as Tone from 'tone';
(window as any).Tone = Tone;

function randomNote() {
    return (Math.floor(80+550*Math.random())).toString()
}

function randomDuration(mini: number, maxi: number) {
    return mini + (maxi - mini) * Math.random()
}

//function randomVolume(mini: number, maxi: number) {
//   return mini + (maxi - mini) * Math.random()
//}

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

export const sortDurations= action(() => {
    const dict = store.mapping;
    const base = store.base;
    const list = [];
    for(const digit in dict) {
        if( Number(digit) < base ) {
            const value = dict[Number(digit)].duration;
            list.push(value);
        }
    }
    const newList = list.sort((a, b) => a - b);
    for(const digit in dict) {
        if( Number(digit) < base ) {
            dict[Number(digit)].duration = newList[Number(digit)];
        }
    }
});

export const sortVolumes= action(() => {
    const dict = store.mapping;
    const base = store.base;
    const list = [];
    for(const digit in dict) {
        if( Number(digit) < base ) {
            const value = dict[Number(digit)].volume;
            list.push(value);
        }
    }
    const newList = list.sort((a, b) => a - b);
    for(const digit in dict) {
        if( Number(digit) < base ) {
            dict[Number(digit)].volume = newList[Number(digit)];
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
        store.mapping[0].note = "C4";
        store.mapping[1].note = "D4";
        store.mapping[2].note = "E4";
        store.mapping[3].note = "F4";
        store.mapping[4].note = "G4";
        store.mapping[5].note = "A4";
        store.mapping[6].note = "B4";
        store.mapping[7].note = "C5";
        store.mapping[8].note = "D5";
        store.mapping[9].note = "E5";
        store.mapping[10].note = "F5";
        store.mapping[11].note = "G5";
    } else if ( newGamme == "DoMineur" ) {
        store.mapping[0].note = "C4";
        store.mapping[1].note = "D4";
        store.mapping[2].note = "Eb4";
        store.mapping[3].note = "F4";
        store.mapping[4].note = "G4";
        store.mapping[5].note = "Ab4";
        store.mapping[6].note = "B4";
        store.mapping[7].note = "C5";
        store.mapping[8].note = "D5";
        store.mapping[9].note = "Eb5";
        store.mapping[10].note = "F5";
        store.mapping[11].note = "G5";
    } else if ( newGamme == "DoPenta" ) {
        store.mapping[0].note = "C4";
        store.mapping[1].note = "D4";
        store.mapping[2].note = "E4";
        store.mapping[3].note = "G4";
        store.mapping[4].note = "A4";
        store.mapping[5].note = "C5";
        store.mapping[6].note = "D5";
        store.mapping[7].note = "E5";
        store.mapping[8].note = "G5";
        store.mapping[9].note = "A5";
        store.mapping[10].note = "C6";
        store.mapping[11].note = "D6";
    }  else if ( newGamme == "DoChroma" ) {
        store.mapping[0].note = "C4";
        store.mapping[1].note = "Db4";
        store.mapping[2].note = "D4";
        store.mapping[3].note = "Eb4";
        store.mapping[4].note = "E4";
        store.mapping[5].note = "F4";
        store.mapping[6].note = "Gb4";
        store.mapping[7].note = "G4";
        store.mapping[8].note = "Ab4";
        store.mapping[9].note = "A4";
        store.mapping[10].note = "Bb4";
        store.mapping[11].note = "B4";
    } else if ( newGamme == "Rand" ) {
        store.mapping[0].note = randomNote();
        store.mapping[1].note = randomNote();
        store.mapping[2].note = randomNote();
        store.mapping[3].note = randomNote();
        store.mapping[4].note = randomNote();
        store.mapping[5].note = randomNote();
        store.mapping[6].note = randomNote();
        store.mapping[7].note = randomNote();
        store.mapping[8].note = randomNote();
        store.mapping[9].note = randomNote();
        store.mapping[10].note = randomNote();
        store.mapping[11].note = randomNote();
    }
});

export const updateDuration = action((digit: string, newDuration: number) => {
    store.mapping[Number(digit)].duration = newDuration;
});

export const randDurations = action((mini: number, maxi: number) => {
    const base = store.base;
    for (let i = 0; i < base; ++i) {
        store.mapping[i].duration = randomDuration(mini, maxi);
    }
});

export const updateVolume = action((digit: string, newVolume: number) => {
    store.mapping[Number(digit)].volume = newVolume;
});

export const randVolumes = action(() => {
    const base = store.base;
    for (let i = 0; i < base; ++i) {
        store.mapping[i].volume = Math.random();
    }
});

export const randInstruments = action(() => {
    const list = [];
    for (const key in instruments) {
        list.push(key)
    }
    const base = store.base;
    for (let i = 0; i < base; ++i) {
        const randNumber = Math.floor(Math.random()*list.length);
        store.mapping[i].instru = list[randNumber];
    }
});

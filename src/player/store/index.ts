import { observable } from 'mobx';
//import * as Tone from 'tone';

export interface Store {
    notes: Note[]
    playing: boolean
    fourpack: boolean
    advanced: boolean
    loop: boolean
    gamme: string
    mapping: { [value: number]: Note }
    // The input value
    inputText: string
    base: number
    bpm: number
    mini: number
    maxi: number
}

export interface Note {
    volume: number
    note: string
    duration: number
    digit: number | string
    instru: string
}

export const store = observable<Store>({
    playing: false,
    fourpack: false,
    advanced: false,
    loop: false,
    gamme: "",
    //inputText: '3141592653589793238462643383279502884197169399375105820974944592307816406286208998628034825342117067982148086513282306647093844609550582231725359408128481117450284102701938521105559644622948954930381964428810975665933446128475648233786783165271201909145648566923460348610454326648213393607260249141273724587006606315588174881520920962829254091715364367892590360011330530548820466521384146951941511609433057270365759591953092186117381932611793105118548074462379962749567351885752724891227938183011949129833673362440656643086021394946395224737190702179860943702770539217176293176752384674818467669405132000568127145263560827785771342757789609173637178721468440901224953430146549585371050792279689258923542019956112129021960864034418159813629774771309960518707211349999998372978',
    inputText: '0123456789',
    base: 10,
    bpm: 120,
    mini: 0.05,
    maxi: 3,
    mapping: {
        0: {
            note: "C4",
            digit: 0,
            duration: 1,
            volume: 0.5,
            instru: "",
        },
        1: {
            note: "D4",
            digit: 1,
            duration: 1,
            volume: 0.5,
            instru: "",
        },
        2: {
            note: "E4",
            digit: 2,
            duration: 1,
            volume: 0.5,
            instru: "",
        },
        3: {
            note: "F4",
            digit: 3,
            duration: 1,
            volume: 0.5,
            instru: "",
        },
        4: {
            note: "G4",
            digit: 4,
            duration: 1,
            volume: 0.5,
            instru: "",
        },
        5: {
            note: "A4",
            digit: 5,
            duration: 1,
            volume: 0.5,
            instru: "",
        },
        6: {
            note: "B4",
            digit: 6,
            duration: 1,
            volume: 0.5,
            instru: "",
        },
        7: {
            note: "C5",
            digit: 7,
            duration: 1,
            volume: 0.5,
            instru: "",
        },
        8: {
            note: "D5",
            digit: 8,
            duration: 1,
            volume: 0.5,
            instru: "",
        },
        9: {
            note: "E5",
            digit: 9,
            duration: 1,
            volume: 0.5,
            instru: "",
        },
        10: {
            note: "F5",
            digit: "A",
            duration: 1,
            volume: 0.5,
            instru: "",
        },
        11: {
            note: "G5",
            digit: "B",
            duration: 1,
            volume: 0.5,
            instru: "",
        },
    },
    get notes() {
        const value = this.inputText;
        const notes: Note[] = [];
        for (let i = 0; i < value.length; ++i) {
            const digit = value.charCodeAt(i);
            if (digit >= 48 && digit < 58) {
                notes.push(store.mapping[digit-48]);
            } else if (digit >= "A".charCodeAt(0) && digit < "C".charCodeAt(0)) {
                notes.push(store.mapping[digit-55])
            }
        }
        return notes;
    }
});

export const instruments: { [key: string]: any } = {
    //with Tone.Synth
    "alien" : {
        "oscillator": {
            "type": "fatsine4",
            "spread" : 60,
            "count" : 10
        },
        "envelope": {
            "attack": 0.4,
            "decay": 0.01,
            "sustain": 1,
            "attackCurve" : "sine",
            "releaseCurve" : "sine",
            "release": 0.4
        }
    },
    "wind" : {
        //"portamento" : 0.0,
        "oscillator": {
            "type": "square4"
        },
        "envelope": {
            //"attack": 2,
            "attack": 0.1,
            //"decay": 0.2,
            "decay": 0.1,
            "sustain": 0.2,
            "release": 0.05
        }
    },
    "pulse" : {
        "oscillator": {
            "type": "pulse",
            //"width" : 0.8
            "width" : 0.1
        },
        "envelope": {
            "attack": 0.01,
            "decay": 0.05,
            "sustain": 0.2,
            //"releaseCurve" : "bounce",
            "release": 0.4
        }
    },
    "lectric" : {
        "portamento" : 0.2,
        "oscillator": {
            "type": "sawtooth"
        },
        "envelope": {
            "attack": 0.03,
            "decay": 0.1,
            "sustain": 0.2,
            "release": 0.02
        }
    },
    "marimba" : {
        "oscillator": {
            "partials": [
                1,
                0,
                2,
                0,
                3
            ]
        },
        "envelope": {
            "attack": 0.001,
            "decay": 1.2,
            "sustain": 0,
            "release": 1.2
        }
    },
    "steelpan" : {
        "oscillator": {
            "type": "fatcustom",
              "partials" : [0.2, 1, 0, 0.5, 0.1],
              "spread" : 40,
              "count" : 3
        },
        "envelope": {
            "attack": 0.001,
            "decay": 1.6,
            "sustain": 0,
            "release": 1.6
        }
    },
    "supersaw" : {
        "oscillator" : {
            "type" : "fatsawtooth",
            "count" : 3,
            "spread" : 30
        },
        "envelope": {
            "attack": 0.01,
            "decay": 0.1,
            "sustain": 0.5,
            "release": 0.4,
            "attackCurve" : "exponential"
        }
    },
    "treetrunk" : {
        "oscillator": {
            "type": "sine"
        },
        "envelope": {
            "attack": 0.001,
            "decay": 0.1,
            "sustain": 0.1,
            "release": 1.2
        }
    }
}


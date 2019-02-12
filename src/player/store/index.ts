import { observable } from 'mobx';
import * as Tone from 'tone';

export interface Store {
    notes: Note[]
    playing: boolean
    gamme: string
    mapping: { [value: number]: Note }
    // Notes per second
    speed: number
    // The input value
    inputText: string
    base: number
    bpm: number
}

export interface Note {
    volume: number
    note: string
    duration: number
    digit: number | string
}

export const store = observable<Store>({
    playing: false,
    gamme: "",
    //inputText: '3141592653589793238462643383279502884197169399375105820974944592307816406286208998628034825342117067982148086513282306647093844609550582231725359408128481117450284102701938521105559644622948954930381964428810975665933446128475648233786783165271201909145648566923460348610454326648213393607260249141273724587006606315588174881520920962829254091715364367892590360011330530548820466521384146951941511609433057270365759591953092186117381932611793105118548074462379962749567351885752724891227938183011949129833673362440656643086021394946395224737190702179860943702770539217176293176752384674818467669405132000568127145263560827785771342757789609173637178721468440901224953430146549585371050792279689258923542019956112129021960864034418159813629774771309960518707211349999998372978',
    inputText: '0123456789',
    base: 10,
    bpm: Tone.Transport.bpm.value,
    mapping: {
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
    },
    speed: 0.5,
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
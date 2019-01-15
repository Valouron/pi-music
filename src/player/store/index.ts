import { observable } from 'mobx';

export interface Store {
    notes: Note[]
    playing: boolean
    mapping: { [value: number]: Note }
    // Notes per second
    speed: number
}

export interface Note {
    volume: number
    note: string
    duration: number
    digit: number | string
}

export const store = observable<Store>({
    notes: [],
    playing: false,
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
    },
    speed: 0.1,
});
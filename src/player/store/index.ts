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
    digit: number
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
            note: "E4",
            digit: 1,
            duration: 0.5,
            volume: 0.5,
        },
        2: {
            note: "G4",
            digit: 2,
            duration: 0.5,
            volume: 0.5,
        },
        3: {
            note: "B4",
            digit: 3,
            duration: 0.5,
            volume: 0.5,
        },
        4: {
            note: "D#2",
            digit: 4,
            duration: 0.5,
            volume: 0.5,
        },
        5: {
            note: "C2",
            digit: 5,
            duration: 0.5,
            volume: 0.5,
        },
        6: {
            note: "C1",
            digit: 6,
            duration: 0.5,
            volume: 0.5,
        },
        7: {
            note: "B1",
            digit: 7,
            duration: 0.5,
            volume: 0.5,
        },
        8: {
            note: "E1",
            digit: 8,
            duration: 0.5,
            volume: 0.5,
        },
        9: {
            note: "E3",
            digit: 9,
            duration: 0.5,
            volume: 0.5,
        }
    },
    speed: 1,
});
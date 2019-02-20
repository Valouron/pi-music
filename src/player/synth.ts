import * as Tone from 'tone';
(window as any).Tone = Tone;
import { autorun, observable, action } from 'mobx';
import { store, instruments } from './store';


export const noteIndex = observable.box(-1);
// Tone.Transport.loopEnd = '1m'
// Tone.Transport.loop = true

let synth: any = new Tone.FMSynth().toMaster();
let timeoutId: number = 0;

//synth.oscillator.type = 'fmsquare';
//synth.oscillator.type = 'sine';

autorun(() => {
    const bpm = store.bpm;
    Tone.Transport.bpm.value = bpm;
});

autorun(() => {
    const notes = store.notes;
    const isplaying = store.playing;

    // Stop current track
    Tone.Transport.stop();
    Tone.Transport.cancel();

    // Stop eventual last animation transition
    clearTimeout(timeoutId);

    // Reset index
    setNoteIndex(-1);

    // If we are not playing we stop here.
    if (!isplaying) {
        return;
    }

    // Prepare the track we are about to play

    const length = notes.length;
    let clock: number = 0;
    for (let i = 0; i < length; ++i) {
        const { note, duration, volume, instru } = notes[i];
        Tone.Transport.schedule((time: number) => {
            synth = Tone.FMSynth(instruments[instru]).toMaster();
            synth.volume.value = 20 * (-1 + volume);
            synth.triggerAttackRelease(note, 0.9*duration, time);
            noteIndex.set(i);
            if (i == length - 1) {
                timeoutId = setTimeout(() => setNoteIndex(length), duration);
            }
        }, clock);
        clock = clock + duration;

    }
    Tone.Transport.start('+0.1');
});

function setNoteIndex(newIndex: number) {
    action(() => noteIndex.set(newIndex))();
}
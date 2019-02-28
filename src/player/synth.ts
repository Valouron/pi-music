import * as Tone from 'tone';
(window as any).Tone = Tone;
import { autorun, observable, action } from 'mobx';
import { store, instruments } from './store';


export const noteIndex = observable.box(-1);
// Tone.Transport.loopEnd = '1m'
// Tone.Transport.loop = true

let synth: any = new Tone.Synth().toMaster();
//let osc: any = new Tone.OmniOscillator();


let timeoutId: number = 0;

//synth.oscillator.type = 'fmsquare';
//synth.oscillator.type = 'sine';

const defaultBpm = Tone.Transport.bpm.value;

autorun(() => {
    //console.log("a");

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
    let clock: number = Tone.now();
    for (let i = 0; i < length; ++i) {
        const { note, duration, volume, instru } = notes[i];
        //synth.set(instruments[instru]);
        Tone.Transport.schedule((time: number) => {
            synth = new Tone.Synth(instruments[instru]).toMaster();
            //synth.set(instruments[instru]);
            synth.volume.value = 20 * (-1 + volume);
            synth.triggerAttackRelease(note, 0.5*duration, time);
            noteIndex.set(i);
            if (i == length - 1) {
                timeoutId = setTimeout(() => setNoteIndex(length), duration);
            }
        }, clock);
        clock = clock + duration;
    }
    Tone.Transport.bpm.value = defaultBpm;
    Tone.Transport.start('+0.1');
});

let timeoutId2 = 0;

autorun(() => {
    clearTimeout(timeoutId2);
    console.log("b");
    store.playing;
    const bpm = store.bpm;
    //console.log(bpm);
    //Tone.Transport.bpm.value = bpm;
    timeoutId2 = setTimeout(() => {
        Tone.Transport.bpm.value = bpm;
        console.log("setbpm", bpm);
        }
        , 3000);
});

function setNoteIndex(newIndex: number) {
    action(() => noteIndex.set(newIndex))();
}
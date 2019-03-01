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

//const defaultBpm = Tone.Transport.bpm.value;


autorun(() => {
    //console.log("a");
    //Tone.Transport.bpm.value = store.bpm;
    //console.log("setbpm", store.bpm)

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
    const bpm = store.bpm;
    const length = notes.length;

    const isfourpack = store.fourpack;

    let clock: number = 0;
    if (!isfourpack || (length % 4 != 0)) {
        for (let i = 0; i < length; ++i) {
            const { note, duration, volume, instru } = notes[i];
            Tone.Transport.schedule((time: number) => {
                synth = new Tone.Synth(instruments[instru]).toMaster();
                //synth.set(instruments[instru]);
                synth.volume.value = 20 * (-1 + volume);
                synth.triggerAttackRelease(note, 0.5*duration*60/bpm, time);
                noteIndex.set(i);
                if (i == length - 1) {
                    timeoutId = setTimeout(() => setNoteIndex(length), duration*60/bpm);
                }
            }, clock*60/bpm);
            clock = clock + duration;
        }
    } else {
        for (let i = 0; i < length/4; ++i) {
            //const { note, duration, volume, instru } = notes[i];
            const note = notes[4*i].note;
            const duration = notes[4*i+1].duration;
            const volume = notes[4*i+2].volume;
            const instru = notes[4*i+3].instru;
            Tone.Transport.schedule((time: number) => {
                synth = new Tone.Synth(instruments[instru]).toMaster();
                //synth.set(instruments[instru]);
                synth.volume.value = 20 * (-1 + volume);
                synth.triggerAttackRelease(note, 0.5*duration*60/bpm, time);
                noteIndex.set(4*i);
                if (i == length - 1) {
                    timeoutId = setTimeout(() => setNoteIndex(length), duration*60/bpm);
                }
            }, clock*60/bpm);
            clock = clock + duration;
        }
    }

    //Tone.Transport.bpm.value = 100;
    //let bp = store.bpm;
    Tone.Transport.start('+0.1');
    //Tone.Transport.bpm.rampTo(bp, 0.5);
    //console.log(Tone.Transport.bpm.value);



});

//let timeoutId2 = 0;

//autorun(() => {
//    clearTimeout(timeoutId2);
//    console.log("b");
//    store.playing;
//    const bpm = store.bpm;
//    //console.log(bpm);
//    //Tone.Transport.bpm.value = bpm;
//    timeoutId2 = setTimeout(() => {
//        Tone.Transport.bpm.value = bpm;
//        console.log("setbpm", bpm);
//        }
//        , 3000);
//});

function setNoteIndex(newIndex: number) {
    action(() => noteIndex.set(newIndex))();
}
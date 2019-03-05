import { action } from 'mobx';
import { store , instruments } from '../store';
import * as bigint from 'big-integer';
//import * as bignum from 'bignumber';
//import * as big from 'big';
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
        let randNumber = Math.floor(Math.random()*list.length);
        store.mapping[i].instru = list[randNumber];
    }
});

export const resetDurations = action(() => {
    for (let i = 0; i < 12; ++i) {
        store.mapping[i].duration = 1;
    }
});

export const resetVolumes = action(() => {
    for (let i = 0; i < 12; ++i) {
        store.mapping[i].volume = 0.5;
    }
});

export const resetInstruments = action(() => {
    for (let i = 0; i < 12; ++i) {
        store.mapping[i].instru = "";
    }
});

export const updateNumber = action((newNumber: string) => {
    let newText: string = "";
    if ( newNumber == "pi" ) {
        newText = "3.141592653589793238462643383279502884197169399375105820974944592307816406286208998628034825342117067982148086513282306647093844609550582231725359408128481117450284102701938521105559644622948954930381964428810975665933446128475648233786783165271201909145648566923460348610454326648213393607260249141273724587006606315588174881520920962829254091715364367892590360011330530548820466521384146951941511609433057270365759591953092186117381932611793105118548074462379962749567351885752724891227938183011949129833673362440656643086021394946395224737190702179860943702770539217176293176752384674818467669405132000568127145263560827785771342757789609173637178721468440901224953430146549585371050792279689258923542019956112129021960864034418159813629774771309960518707211349999998372978";
    } else if ( newNumber == "e" ) {
        newText = "2.71828182845904523536028747135266249775724709369995957496696762772407663035354759457138217852516642742746639193200305992181741359662904357290033429526059563073813232862794349076323382988075319525101901157383418793070215408914993488416750924476146066808226480016847741185374234544243710753907774499206955170276183860626133138458300075204493382656029760673711320070932870912744374704723069697720931014169283681902551510865746377211125238978442505695369677078544996996794686445490598793163688923009879312773617821542499922957635148220826989519366803318252886939849646510582093923982948879332036250944311730123819706841614039701983767932068328237646480429531180232878250981945581530175671736133206981125099618188159304169035159888851934580727386673858942287922849989208680582574";
    } else if ( newNumber == "phi" ) {
        newText = "1.61803398874989484820458683436563811772030917980576286213544862270526046281890244970720720418939113748475408807538689175212663386222353693179318006076672635443338908659593958290563832266131992829026788067520876689250171169620703222104321626954862629631361443814975870122034080588795445474924618569536486444924104432077134494704956584678850987433944221254487706647809158846074998871240076521705751797883416625624940758906970400028121042762177111777805315317141011704666599146697987317613560067087480710131795236894275219484353056783002287856997829778347845878228911097625003026961561700250464338243776486102838312683303724292675263116533924731671112115881863851331620384005222165791286675294654906811317159934323597349498509040947621322298101726107059611645629909816290555208";
    } else if ( newNumber == "sqrt2" ) {
        newText = "1.41421356237309504880168872420969807856967187537694807317667973799073247846210703885038753432764157273501384623091229702492483605585073721264412149709993583141322266592750559275579995050115278206057147010955997160597027453459686201472851741864088919860955232923048430871432145083976260362799525140798968725339654633180882964062061525835239505474575028775996172983557522033753185701135437460340849884716038689997069900481503054402779031645424782306849293691862158057846311159666871301301561856898723723528850926486124949771542183342042856860601468247207714358548741556570696776537202264854470158588016207584749226572260020855844665214583988939443709265918003113882464681570826301005948587040031864803421948972782906410450726368813137398552561173220402450912277002269411275736";
    } else if ( newNumber == "septieme" ) {
        newText = "0.14285714285714285714285714285714285714285714285714285714285714285714285714285714285714285714285714285714285714285714285714285714285714285714285714285714285714285714285714285714285714285714285714285714285714285714285714285714285714285714285714285714285714285714285714285714285714285714285714285714285714285714285714285714285714285714285714285714285714285714285714285714285714285714285714285714285714285714285714285714285714285714285714285714285714285714285714285714285714285714285714285714285714285714285714285714285714285714285714285714285714285714285714285714285714285714285714285714285714285714285714285714285714285714285714285714285714285714285714285714285714285714285714285714285714285714285714285714285714285714285714285714285714285714285714285714285714285714285714285";
    } else if ( newNumber == "onzieme" ) {
        newText = "0.09090909090909090909090909090909090909090909090909090909090909090909090909090909090909090909090909090909090909090909090909090909090909090909090909090909090909090909090909090909090909090909090909090909090909090909090909090909090909090909090909090909090909090909090909090909090909090909090909090909090909090909090909090909090909090909090909090909090909090909090909090909090909090909090909090909090909090909090909090909090909090909090909090909090909090909090909090909090909090909090909090909090909090909090909090909090909090909090909090909090909090909090909090909090909090909090909090909090909090909090909090909090909090909090909090909090909090909090909090909090909090909090909090909090909090909090909090909090909090909090909090909090909090909090909090909090909090909090909090";
    } else if ( newNumber == "rand" ) {
        newText = bigint.randBetween("0", "1e760").toString();
    }
    //let test = 0.1;
    //console.log(bignum(test).toString(5));
    store.base = 10;
    updateText(newText);
});

export const updateFour = action((newFour: boolean) => {
    store.fourpack = newFour;
});

export const updateOption = action((newOption: boolean) => {
    store.advanced = newOption;
});

export const bonus1Text = action (() => {
    resetDurations();
    resetVolumes();
    resetInstruments();
    store.bpm = 120;
    store.base = 5;
    updateText("013324");
    store.mapping[0].note = "C4";
    store.mapping[1].note = "Gb4";
    store.mapping[2].note = "Ab4";
    store.mapping[3].note = "A4";
    store.mapping[4].note = "B4";
});

export const bonus1Complete = action (() => {
    bonus1Text();
    store.mapping[0].volume = -1;
    store.mapping[0].duration = 0.3;
    store.mapping[1].duration = 0.7;
    store.mapping[2].duration = 0.5;
    store.mapping[3].duration = 0.7;
    store.mapping[4].duration = 0.5;
});

export const updateLoop = action ((newLoop: boolean) => {
    store.loop = newLoop;
    Tone.Transport.loop = store.loop;
    if (newLoop) {
        Tone.Transport.loopEnd = '1m';
    } else {
        Tone.dispose();
    }
});

export const bonus2Text = action (() => {
    resetDurations();
    resetVolumes();
    resetInstruments();
    store.bpm = 120;
    store.base = 7;
    updateText("5430000003333231111113333452222225555664");
    store.mapping[0].note = "Gb4";
    store.mapping[1].note = "G4";
    store.mapping[2].note = "A4";
    store.mapping[3].note = "B4";
    store.mapping[4].note = "Db5";
    store.mapping[5].note = "D5";
    store.mapping[6].note = "E5";
});

export const bonus2Complete = action (() => {
    bonus2Text();
    store.mapping[0].volume = -1;
    store.mapping[0].duration = 0.3;
    store.mapping[1].duration = 0.6;
    store.mapping[2].duration = 0.9;
    store.mapping[3].duration = 1.2;
    updateText("5310 4310 3110 0110 0010 0010 0010 0010 0010 3010 3010 3010 3110 2010 3110 1210 1010 1010 1010 1010 1010 3010 3010 3010 3110 4010 5110 2210 2010 2010 2010 2010 2010 5010 5010 5010 5110 6010 6110 4210");
});
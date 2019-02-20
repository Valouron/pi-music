import * as React from 'react';
import { Component } from 'react';
import { observer } from 'mobx-react';
import {
    updateText, updateBase, updateBpm, updatePlaying, updateGamme, updateMapping, updateDuration, updateVolume,
    sortNotes, sortDurations, sortVolumes,
    randDurations, randVolumes, randInstruments
} from '../../actions';
import { Button, TextField, Select, MenuItem, Grid, Typography } from '@material-ui/core';
import { Slider } from '@material-ui/lab'
import { store } from '../../store';
import { SelectNote } from './SelectNote';
//import { Mapping } from './Mapping';
import * as Tone from 'tone';
(window as any).Tone = Tone;



@observer
export class Controls extends Component {

    inputChanged(value: string) {
        updateText(value);
    }

    selectChanged(newbase: string) {
        const base = parseInt(newbase, 10);
        updateBase(base);
    }

    gammeChanged(gamme: string) {
        updateGamme(gamme);
    }

    mappingChanged(digit: string, newValue: string) {
        updateMapping(digit, newValue);
    }

    bpmChanged(value: number) {
        updateBpm(value);
    }

    noteSorted() {
        sortNotes();
    }

    durationSorted() {
        sortDurations();
    }

    durationRandomized(mini: number, maxi: number) {
        randDurations(mini, maxi);
    }

    volumeSorted() {
        sortVolumes();
    }

    volumeRandomized() {
        randVolumes();
    }

    instrumentRandomized() {
        randInstruments();
    }

    render() {
        const { base, inputText, gamme, bpm, mini, maxi} = store;

        const noteControls = [];
        for (const digit in store.mapping) {
            const mapping = store.mapping[digit];
            const ton = Math.floor(Tone.Frequency(mapping.note));
            if (Number(digit) < base) {
                noteControls.push(
                <div>
                {mapping.digit} : <SelectNote key={digit} value={mapping.note} onValueChanged={(newValue) => updateMapping(digit, newValue) } />
                <TextField onChange={(ev) => this.mappingChanged(digit, ev.target.value)} value={ton} ></TextField> Hz
                <Slider value={mapping.duration} max={maxi} min={mini} onChange={(_, value) => updateDuration(digit, value)}></Slider>
                <Slider value={mapping.volume} max={1} min={0} onChange={(_, value) => updateVolume(digit, value)}></Slider>
                </div>
            );
            }
        }

        return <>
            <Grid item xs={12}>
                <Button variant="contained" color="primary" onClick={() => updatePlaying(!store.playing) }>{store.playing ? 'Restart': 'Play'}</Button>
                <TextField fullWidth={true} onChange={(ev) => this.inputChanged(ev.target.value)} value={inputText}></TextField>
            </Grid>
            <Grid item xs={2}>
                <Typography variant="subtitle1">Gamme</Typography>
                <Grid item container>
                    <Select value={gamme} onChange={(ev) => this.gammeChanged(ev.target.value)} >
                    <MenuItem value="DoMajeur">Do Majeur</MenuItem>
                    <MenuItem value="DoMineur">Do Mineur Harmonique</MenuItem>
                    <MenuItem value="DoPenta">Do Pentatonique</MenuItem>
                    <MenuItem value="DoChroma">Do Chromatique</MenuItem>
                    <MenuItem value="Rand">Aléatoire</MenuItem>
                    </Select>
                </Grid>
                <Grid item>
                <Button variant="contained" color="secondary" onClick={() => this.gammeChanged("Rand")}> Aléa </Button>
                </Grid>
                <Grid item>
                <Button variant="contained" color="default" onClick={() => this.noteSorted()}> Trier </Button>
                </Grid>
            </Grid>
            <Grid item xs={4}>
                <Grid item container>
                    {noteControls}
                </Grid>
            </Grid>
            <Grid item xs={2}>
            </Grid>
            <Grid item xs={3}>
                <Grid item container direction="column">
                    <Grid item>
                        <Typography variant="subtitle1">Tempo</Typography>
                    </Grid>
                    <Grid item>
                        <Slider value={bpm} max={600} min={20} onChange={(_, value) => this.bpmChanged(value)}></Slider>
                    </Grid>
                    <Grid item>
                        <Typography variant="subtitle1">Options</Typography>
                    </Grid>
                    <Grid item>
                        <Typography variant="subtitle1">Durées</Typography>
                    </Grid>
                    <Grid item>
                        <Button variant="contained" color="secondary" onClick={() => this.durationRandomized(mini,maxi)}> Aléa </Button>
                    </Grid>
                    <Grid item>
                        <Button variant="contained" color="default" onClick={() => this.durationSorted()}> Trier </Button>
                    </Grid>
                    <Grid item>
                        <Typography variant="subtitle1">Volumes</Typography>
                    </Grid>
                    <Grid item>
                        <Button variant="contained" color="secondary" onClick={() => this.volumeRandomized()}> Aléa </Button>
                    </Grid>
                    <Grid item>
                        <Button variant="contained" color="default" onClick={() => this.volumeSorted()}> Trier </Button>
                    </Grid>
                    <Grid item>
                        <Typography variant="subtitle1">Instruments</Typography>
                    </Grid>
                    <Grid item>
                        <Button variant="contained" color="secondary" onClick={() => this.instrumentRandomized()}> Aléa </Button>
                    </Grid>
                </Grid>
            </Grid>
            <Grid item xs= {1}>
                <Grid item container>
                    <Select value={base} onChange={(ev) => this.selectChanged(ev.target.value)} >
                        <MenuItem value="2">Base 2</MenuItem>
                        <MenuItem value="3">Base 3</MenuItem>
                        <MenuItem value="4">Base 4</MenuItem>
                        <MenuItem value="5">Base 5</MenuItem>
                        <MenuItem value="6">Base 6</MenuItem>
                        <MenuItem value="7">Base 7</MenuItem>
                        <MenuItem value="8">Base 8</MenuItem>
                        <MenuItem value="9">Base 9</MenuItem>
                        <MenuItem value="10">Base 10</MenuItem>
                        <MenuItem value="11">Base 11</MenuItem>
                        <MenuItem value="12">Base 12</MenuItem>
                    </Select>
                </Grid>
            </Grid>
        </>;
    }
}
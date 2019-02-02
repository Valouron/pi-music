import * as React from 'react';
import { Component } from 'react';
import { observer } from 'mobx-react';
import { updateText, updateBase, updateBpm, updatePlaying } from '../../actions';
import { Button, TextField, Select, MenuItem, Grid, Typography } from '@material-ui/core';
import { Slider } from '@material-ui/lab'
import { store } from '../../store';

@observer
export class Controls extends Component {

    inputChanged(value: string) {
        updateText(value);
    }

    selectChanged(newbase: string) {
        const base = parseInt(newbase, 10);
        updateBase(base);
    }

    render() {
        const { base, inputText } = store;
        return <>
            <Grid item xs={12}>
                <Button variant="contained" color="primary" onClick={() => updatePlaying(!store.playing) }>{store.playing ? 'Restart': 'Play'}</Button>
                <TextField onChange={(ev) => this.inputChanged(ev.target.value)} value={inputText}></TextField>
            </Grid>
            <Grid item xs={6}>
                <Typography variant="subtitle1">Gamme</Typography>
            </Grid>
            <Grid item xs={6}>
                <Grid item container direction="column">
                    <Grid item>
                        <Typography variant="subtitle1">Tempo</Typography>
                    </Grid>
                    <Grid item>
                        <Slider value={store.bpm} max={240} min={60} onChange={(_, value) => updateBpm(value)}></Slider>
                    </Grid>
                    <Grid item>
                        <Typography variant="subtitle1">Options</Typography>
                    </Grid>
                    <Grid item container>
                        <Select value={base} onChange={(ev) => this.selectChanged(ev.target.value)} >
                            <MenuItem value="2">Base 2</MenuItem>
                            <MenuItem value="5">Base 5</MenuItem>
                            <MenuItem value="10">Base 10</MenuItem>
                            <MenuItem value="12">Base 12</MenuItem>
                        </Select>
                    </Grid>
                </Grid>
            </Grid>
        </>;
    }
}
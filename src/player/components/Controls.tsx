import * as React from 'react';
import * as bigint from 'big-integer';
import { Component } from 'react';
import { observer } from 'mobx-react';
import { updateText } from '../actions';
import { Button, TextField, Select, MenuItem } from '@material-ui/core';
import { store } from '../store';

@observer
export class Controls extends Component<{}, { value: string, base: number}> {

    constructor(props: any) {
        super(props);
        this.state = {
            value: '314159265358979323846264338327',
            base: 10
        };
        updateText(this.state.value);
    }

    inputChanged(value: string) {
        this.setState({ value });
        updateText(value);
    }

    selectChanged(newbase: string) {
        const base = parseInt(newbase, 10);
        const value = bigint.fromArray(
            this.state.value.split("").map(v => parseInt(v, this.state.base)),
            this.state.base
        ).toString(base);
        this.setState({
            base,
            value,
        });
        updateText(value);
    }

    render() {
        return <div>
            <Button variant="contained" onClick={() => store.playing = !store.playing}>{store.playing ? 'Pause': 'Play'}</Button>
            <TextField onChange={(ev) => this.inputChanged(ev.target.value)} value={this.state.value}></TextField>
            <Select value={this.state.base} onChange={(ev) => this.selectChanged(ev.target.value)} >
                <MenuItem value="2">Base 2</MenuItem>
                <MenuItem value="5">Base 5</MenuItem>
                <MenuItem value="10">Base 10</MenuItem>
                <MenuItem value="12">Base 12</MenuItem>
            </Select>
        </div>;
    }
}
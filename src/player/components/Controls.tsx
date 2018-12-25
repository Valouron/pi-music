import * as React from 'react';
import { Component } from 'react';
import { observer } from 'mobx-react';
import { updateText } from '../actions';
import { Button, TextField } from '@material-ui/core';
import { store } from '../store';

@observer
export class Controls extends Component<{}, { value: string }> {

    constructor(props: any) {
        super(props);
        this.state = {
            value: '3.14159265358979323846264338327',
        };
        updateText(this.state.value);
    }

    inputChanged(value: string) {
        this.setState({ value });
        updateText(value);
    };

    render() {
        return <div>
            <Button variant="contained" onClick={() => store.playing = !store.playing}>{store.playing ? 'Pause': 'Play'}</Button>
            <TextField onChange={(ev) => this.inputChanged(ev.target.value)} value={this.state.value}></TextField>
        </div>;
    }
}
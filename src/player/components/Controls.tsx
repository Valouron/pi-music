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
            value: '3141592653589793238462643383279502884197169399375105820974944592307816406286208998628034825342117067982148086513282306647093844609550582231725359408128481117450284102701938521105559644622948954930381964428810975665933446128475648233786783165271201909145648566923460348610454326648213393607260249141273724587006606315588174881520920962829254091715364367892590360011330530548820466521384146951941511609433057270365759591953092186117381932611793105118548074462379962749567351885752724891227938183011949129833673362440656643086021394946395224737190702179860943702770539217176293176752384674818467669405132000568127145263560827785771342757789609173637178721468440901224953430146549585371050792279689258923542019956112129021960864034418159813629774771309960518707211349999998372978',
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
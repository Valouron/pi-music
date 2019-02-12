import * as React from 'react';
import { Select, MenuItem } from '@material-ui/core';


interface Props {
    value: string
    onValueChanged: (newValue: string) => void
}

export const SelectNote: React.SFC<Props> = ({ value, onValueChanged }) => {

    return <Select value={value} onChange={ev => onValueChanged(ev.target.value)}>
        <MenuItem value="A3">La 3</MenuItem>
        <MenuItem value="Bb3">Sib 3</MenuItem>
        <MenuItem value="B3">Si 3</MenuItem>
        <MenuItem value="C4">Do 4</MenuItem>
        <MenuItem value="Db4">Réb 4</MenuItem>
        <MenuItem value="D4">Ré 4</MenuItem>
        <MenuItem value="Eb4">Mib 4</MenuItem>
        <MenuItem value="E4">Mi 4</MenuItem>
        <MenuItem value="F4">Fa 4</MenuItem>
        <MenuItem value="Gb4">Solb 4</MenuItem>
        <MenuItem value="G4">Sol 4</MenuItem>
        <MenuItem value="Ab4">Lab 4</MenuItem>
        <MenuItem value="A4">La 4</MenuItem>
        <MenuItem value="Bb4">Si b 4</MenuItem>
        <MenuItem value="B4">Si 4</MenuItem>
        <MenuItem value="C5">Do 5</MenuItem>
        <MenuItem value="Db5">Réb 5</MenuItem>
        <MenuItem value="D5">Ré 5</MenuItem>
        <MenuItem value="Eb5">Mib 5</MenuItem>
        <MenuItem value="E5">Mi 5</MenuItem>
        <MenuItem value="F5">Fa 5</MenuItem>
        <MenuItem value="Gb5">Solb 5</MenuItem>
        <MenuItem value="G5">Sol 5</MenuItem>
        <MenuItem value="Ab5">Lab 5</MenuItem>
        <MenuItem value="A5">La 5</MenuItem>
        <MenuItem value="Bb5">Sib 5</MenuItem>
        <MenuItem value="B5">Si 5</MenuItem>
        <MenuItem value="C6">Do 6</MenuItem>
        <MenuItem value="Db6">Réb 6</MenuItem>
        <MenuItem value="D6">Ré 6</MenuItem>
        <MenuItem value="Eb6">Mib 6</MenuItem>
        <MenuItem value="E6">Mi 6</MenuItem>
    </Select>
};
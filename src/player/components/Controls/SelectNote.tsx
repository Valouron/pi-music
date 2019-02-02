import * as React from 'react';
import { Select, MenuItem } from '@material-ui/core';


interface Props {
    value: string
    onValueChanged: (newValue: string) => void
}

export const SelectNote: React.SFC<Props> = ({ value, onValueChanged }) => {

    return <Select value={value} onChange={ev => onValueChanged(ev.target.value)}>
        <MenuItem value="C2">Fa #</MenuItem>
        <MenuItem value=""></MenuItem>
        <MenuItem value=""></MenuItem>
        <MenuItem value=""></MenuItem>
        <MenuItem value=""></MenuItem>
    </Select>
};
import * as React from 'react';
import { render } from 'react-dom';
import { MuiThemeProvider, Grid } from '@material-ui/core';
import './player.scss';
import { theme } from './theme';
import { Controls } from './components/Controls';
import { Player } from './components/Player';


render(
    <MuiThemeProvider theme={theme}>
    <Grid container spacing={24}>
        <Grid item xs={12}>
            <Player/>
        </Grid>
        <Controls />
    </Grid>
    </MuiThemeProvider>,
    document.getElementById('player'),
);
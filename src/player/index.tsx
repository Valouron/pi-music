import * as React from 'react';
import { render } from 'react-dom';
import { observer } from 'mobx';
import * as Tone from 'tone';


@observer
class Player extends React.Component {

    render() {
        return <div>
            Hello world!
        </div>
    }
}


render(
    <Player />,
    document.getElementById('player'),
);
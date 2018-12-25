import * as React from 'react';
import { render } from 'react-dom';
import { observer } from 'mobx-react';
import { Controls } from './components/Controls';
import './player.scss';
import { noteIndex } from './synth';
import { store } from './store';

@observer
class Player extends React.Component {

    render() {
        const currentIndex = noteIndex.get();
        const digits = store.notes.map((n, i) =>
            <span key={i} className={
                i < currentIndex ? 'note read':
                i == currentIndex ? 'note active':
                'note'
            }>{n.digit}</span>
        );
        const size = digits.length;
        // Note: Keep in sync with player.scss -> .note -> width: 25px
        const offset = (size / 2 - currentIndex) * 25;
        return <div className="group">
            <div className="digits"
                style={{ transform: `translateX(${offset}px)` }}>
                {digits}
            </div>
            <div className="play">
                <Controls />
            </div>
        </div>
    }
}


render(
    <Player/>,
    document.getElementById('player'),
);
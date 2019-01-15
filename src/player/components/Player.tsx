import * as React from 'react';
import { observer } from 'mobx-react';
import { noteIndex } from '../synth';
import { store } from '../store';


@observer
export class Player extends React.Component {

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
        </div>
    }
}
import React from 'react';
import { faPause, faPlay } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import '../stylesheets/MusicPlayer.css';

const MediaControls = ({ audio, setAudio }) => (
    <div className="media-controls">
        <button type="button" className="search-btn" onClick={() => setAudio({ ...audio, playing: !audio.playing })}>
            { !!audio.playing
                ? <FontAwesomeIcon icon={faPause} />
                : <FontAwesomeIcon icon={faPlay} />
            }
        </button>
    </div>
);


export {
    MediaControls
};

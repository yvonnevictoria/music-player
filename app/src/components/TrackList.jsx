import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ReactHowler from 'react-howler'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPause, faPlay } from '@fortawesome/free-solid-svg-icons'

import '../stylesheets/MusicPlayer.css';

const TrackList = () => {
    const [tracks, setTracks] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [audio, setAudio] = useState({ playing: false, url: 'https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview118/v4/57/93/94/57939483-f16a-3fee-dd39-de7df73e8413/mzaf_5320784781866992253.plus.aac.p.m4a' });
    const [songPlaying, setSongPlaying] = useState(0);
    const [errors, setErrors] = useState([]);

    const getTracks = ({ chosenSearchTerm }) => {
        const cleanedSearchTerm = chosenSearchTerm.replace(/\s/g, '+');

        // Would usually use a reducer and saga here to manage state setting.
        axios.get(`http://localhost:4000/music?searchTerm=${cleanedSearchTerm}`)
            .then(function (response) {
                const { data } = response;
               setTracks(data);
            })
            .catch(function (error) {
              setErrors(error);
            });
    };

    const toMinutes = ({ ms }) => {
        let minutes = Math.floor(ms / 60000);
        let seconds = ((ms % 60000) / 1000).toFixed(0);
        return minutes + ":" + (seconds < 10 ? '0' : '') + seconds;
    }

    const changeAudio = ({ url, trackId }) => {
        // Stop current audio and clear selection. TODO YVO: Does React Howler provide something here?
        setAudio({ url: '', playing: false });
        setAudio({ url, playing: true });
        setSongPlaying(trackId)
    }


    useEffect(() => {
        getTracks({ chosenSearchTerm: 'jack+johnson' });
    }, []);

    return (
        <div className="track-list">
            <div className="search">
                <label htmlFor="search-bar">Search music:</label>
                <input
                    type="text"
                    id="search-bar"
                    name="search-bar"
                    className="control-input"
                    value={searchTerm}
                    onChange={({ target: { value } }) => {setSearchTerm(value); getTracks({ chosenSearchTerm: searchTerm });}}
                />
                <button type="button" className="search-btn" onClick={() => getTracks({ chosenSearchTerm: searchTerm })}>
                    Search
                </button>
            </div>

            { !!errors.length && `${errors}` }

            {
                // Using list item for screen reader compatibility (link in readme)
            }
            <ol className="tracks">
            {
                Object.entries(tracks).map((track, i) => {
                    const { artistName, trackName, trackTimeMillis, collectionName, trackId, previewUrl, artworkUrl60 } = track[1];
                    return (
                        <li role="button" className="track" onClick={() => changeAudio({ url: previewUrl, trackId })} key={trackId}>
                            <img className="album-art" src={artworkUrl60} alt='Album artwork' />
                            <div className="track-info">
                                <span>{trackName}</span>
                                <span>{artistName} | {toMinutes({ ms: trackTimeMillis })}</span>
                                <span className="album-name">{collectionName}</span>
                            </div>
                        </li>
                    );
                })
            }
            </ol>
            <ReactHowler src={audio.url} playing={audio.playing} />

            {
                songPlaying > 0 && (
                    <div className="media-controls">
                        <button type="button" className="search-btn" onClick={() => setAudio({ ...audio, playing: !audio.playing })}>
                            { !!audio.playing
                                ? <FontAwesomeIcon icon={faPause} />
                                : <FontAwesomeIcon icon={faPlay} />
                            }
                        </button>
                    </div>
                )
            }
        </div>
    );
};

export {
    TrackList
};

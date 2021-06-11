import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ReactHowler from 'react-howler'
import { MediaControls } from './MediaControls';
import { SearchBar } from './SearchBar';

import '../stylesheets/TrackList.css';

const TrackList = ({ songPlaying, setSongPlaying, audio, setAudio }) => {
    const [tracks, setTracks] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [errors, setErrors] = useState([]);

    const getTracks = ({ chosenSearchTerm }) => {
        const cleanedSearchTerm = chosenSearchTerm.replace(/\s/g, '+');

        // Would usually use a reducer and saga here to manage state setting.
        axios.get(`http://localhost:4000/music?searchTerm=${cleanedSearchTerm}`)
            .then(function (response) {
                const { data } = response;
                console.log(data);
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

    const changeAudio = ({ url, trackId, collectionId }) => {
        // Stop current audio and clear selection. TODO YVO: Does React Howler provide something here?
        setAudio({ url: '', playing: false });
        setAudio({ url, playing: true });
        setSongPlaying({ trackId, collectionId })
    }


    useEffect(() => {
        getTracks({ chosenSearchTerm: 'jack+johnson' });
    }, []);

    return (
        <div className="track-list">
            <SearchBar
                searchTerm={searchTerm}
                onChange={({ target: { value } }) => {setSearchTerm(value); getTracks({ chosenSearchTerm: searchTerm });}}
                onSearch={() => getTracks({ chosenSearchTerm: searchTerm })}
            />

            { !!errors.length && `${errors}` }

            {
                // Using list item for screen reader compatibility (link in readme)
            }
            <ol className="tracks">
            {
                Object.entries(tracks).map((track, i) => {
                    const { artistName, trackName, trackTimeMillis, collectionName, collectionId, trackId, previewUrl, artworkUrl60 } = track[1];
                    return (
                        <li role="button" className={`track ${songPlaying === trackId && 'active-song'}`} onClick={() => changeAudio({ url: previewUrl, trackId, collectionId })} key={trackId}>
                            <img className="album-art" src={artworkUrl60} alt='Album artwork' />
                            <div className="track-info">
                                <span>{trackName}</span>
                                <span>{artistName} | {toMinutes({ ms: trackTimeMillis })}</span>
                                <span>{collectionName}</span>
                            </div>
                        </li>
                    );
                })
            }
            </ol>
            <ReactHowler src={audio.url} playing={audio.playing} />

            {
                songPlaying.trackId > 0 && (
                    <MediaControls audio={audio} setAudio={setAudio} />
                )
            }
        </div>
    );
};

export {
    TrackList
};

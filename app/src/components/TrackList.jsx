import React, { Fragment, useEffect, useState } from 'react';
import axios from 'axios';
import '../stylesheets/MusicPlayer.css';

const TrackList = () => {
    const [tracks, setTracks] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [errors, setErrors] = useState([]);

    const getTracks = ({ chosenSearchTerm }) => {
        // Would usually use a reducer and saga here to manage state setting.
        axios.get(`http://localhost:4000/music?searchTerm=${chosenSearchTerm}`)
            .then(function (response) {
                const { data } = response;
                console.log(data);
               setTracks(data);
            })
            .catch(function (error) {
              console.log(error);
              setErrors(error);
            });
    };

    const toMinutes = ({ ms }) => {
        let minutes = Math.floor(ms / 60000);
        let seconds = ((ms % 60000) / 1000).toFixed(0);
        return minutes + ":" + (seconds < 10 ? '0' : '') + seconds;
    }

    useEffect(() => {
        getTracks({ chosenSearchTerm: 'jack+johnson' });
    }, []);

    return (
        <Fragment>
            <div className="search">
                <label htmlFor="search-bar">Search music:</label>
                <input
                    type="text"
                    id="search-bar"
                    name="search-bar"
                    className="control-input"
                    value={searchTerm}
                    onChange={({ target: { value } }) => setSearchTerm(value)}
                />
                <button type="button" className="search-btn" onClick={() => getTracks({ chosenSearchTerm: searchTerm })}>
                    Search
                </button>
            </div>
            {
                // Using list item for screen reader compatibility (link in readme)
            }
            <ol className="tracks">
            {
                Object.entries(tracks).map((track, i) => {
                    const { artistName, trackName, trackTimeMillis, collectionName, trackId, previewUrl } = track[1];
                    return (
                        <li role="button" className="track" onClick={() => {}} key={trackId}>
                            <span>{trackName}</span>
                            <span>{artistName} | {toMinutes({ ms: trackTimeMillis })}</span>
                            <span className="album-name">{collectionName}</span>
                        </li>
                    );
                })
            }
            </ol>

            { !!errors.length && `${errors}` }
        </Fragment>
    );
};

export {
    TrackList
};

/*
{
    Object.entries(tracks).map(({ artistName, trackName, trackTimeMillis, collectionName, trackId, previewUrl }) => (
        <li role="button" className="track-item" onClick={() => {console.log(artistName)}} key={trackId}>
            {artistName}
        </li>
    ))
}
*/

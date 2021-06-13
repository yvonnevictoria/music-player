import React, { useState } from 'react';
import axios from 'axios';
import { TrackList } from './TrackList';
import { AlbumList } from './AlbumList';

import '../stylesheets/MusicPlayer.css';

const MusicPlayer = () => {
    const [songPlaying, setSongPlaying] = useState({ trackId: 0, collectionId: 0 });
    // Howler needs valid url when initialised. This url won't be used.
    const [audio, setAudio] = useState({ playing: false, url: 'https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview115/v4/a2/d3/b3/a2d3b33f-e6b3-cbd8-6efb-fa9ecb9c668a/mzaf_16013347745276122340.plus.aac.p.m4a' });
    const [album, setAlbum] = useState({ name: '', artwork: '', tracks: []});
    const [errors, setErrors] = useState('');

    const changeAudio = ({ url, trackId, collectionId }) => {
        // Stop current audio and clear selection. Howler was being a bit buggy so I made it
        // stop and then start the audio to ensure it's been cleared.
        setAudio({ url: '', playing: false });
        setAudio({ url, playing: true });
        setSongPlaying({ trackId, collectionId });
        resetAlbum({ albumId: collectionId});
    };

    const getAlbum = ({ albumId }) => {
        // Would usually use a reducer and saga here to manage state setting.
        // As a result of not using redux, the parent component (music player) is managing state
        // that it should not be (should be in AlbumList). A saga calling actionCreators would be a much
        // better option
        axios.get(`http://localhost:4000/album/${albumId}`)
            .then(function (response) {
                const { data: { collectionName, artworkUrl100, album } } = response;
                setAlbum({ name: collectionName, artwork: artworkUrl100, tracks: album});
            })
            .catch(function (error) {
                setErrors(error);
            });
    };

    const resetAlbum = ({ albumId }) => {
        getAlbum({ albumId });
    };

    return (
        <div className={`container ${songPlaying.trackId > 0 && 'music-player-with-album'}`}>
            { !!errors.length && `${errors}` }

            <TrackList
                songPlaying={songPlaying}
                setSongPlaying={setSongPlaying}
                audio={audio}
                setAudio={setAudio}
                changeAudio={changeAudio}
            />

            {
                songPlaying.collectionId > 0 && (
                    <AlbumList
                        songPlaying={songPlaying}
                        getAlbum={getAlbum}
                        album={album}
                    />
                )
            }
        </div>
    );
};


export {
    MusicPlayer
};

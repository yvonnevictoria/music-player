import React, { useState } from 'react';
import { TrackList } from './TrackList';
import { AlbumList } from './AlbumList';

import '../stylesheets/MusicPlayer.css';

const MusicPlayer = () => {
    const [songPlaying, setSongPlaying] = useState({ trackId: 0, collectionId: 0 });
    const [audio, setAudio] = useState({ playing: false, url: 'https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview118/v4/57/93/94/57939483-f16a-3fee-dd39-de7df73e8413/mzaf_5320784781866992253.plus.aac.p.m4a' });

    return (
        <div className="music-player">
            <TrackList
                songPlaying={songPlaying}
                setSongPlaying={setSongPlaying}
                audio={audio}
                setAudio={setAudio}
            />
            {
                songPlaying.collectionId > 0 && (
                    <AlbumList
                        songPlaying={songPlaying}
                        setSongPlaying={setSongPlaying}
                    />
                )
            }
        </div>
    );
};


export {
    MusicPlayer
};

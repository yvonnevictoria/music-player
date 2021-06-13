import React, { useEffect } from 'react';
import '../stylesheets/AlbumList.css';

const AlbumList = ({ songPlaying, getAlbum, album }) => {
    useEffect(() => {
        getAlbum({ albumId: songPlaying.collectionId });
    }, []);

    return (
        <div className="album-list">
            <img className="album-art-100" src={album.artwork} alt='Album artwork' />
            <span className="album-name">{album.name}</span>
            {
                Object.entries(album.tracks).map((track, i) => {
                    // Track item contains two array items, track information available in second array item i.e. "track[1]"
                    const { artistName, trackName, trackId } = track[1];
                    return (
                        <li className="album-track" key={trackId}>
                            <span>{trackName} | {artistName}</span>
                        </li>
                    );
                })
            }
        </div>
    );
}

export {
    AlbumList
};

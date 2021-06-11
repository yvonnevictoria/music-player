import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../stylesheets/AlbumList.css';

const AlbumList = ({ songPlaying, setSongPlaying }) => {
    const [album, setAlbum] = useState([]);
    const [errors, setErrors] = useState([]);

    useEffect(() => {
        getAlbum({ albumId: songPlaying.collectionId });
    }, []);

    const getAlbum = ({ albumId }) => {
        // Would usually use a reducer and saga here to manage state setting.
        axios.get(`http://localhost:4000/album/${albumId}`)
            .then(function (response) {
                const { data } = response;
                console.log(data);
                setAlbum(data);
            })
            .catch(function (error) {
                console.log(error);
                setErrors(error);
            });
    };

    return (
        <div>
            { !!errors.length && `${errors}` }
            {
                // <img className="album-art-100" src={album[0].artworkUrl100} alt='Album artwork' />
                // TODO YVO: filter first
                // li remove pointer
                Object.entries(album).map((track, i) => {
                    const { artistName, trackName, trackId } = track[1];
                    return (
                        <li className={`track ${songPlaying === trackId && 'active-song'}`} key={trackId}>
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
